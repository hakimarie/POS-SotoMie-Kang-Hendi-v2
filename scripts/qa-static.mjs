import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const html=fs.readFileSync('index.html','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.json','utf8'));
const sw=fs.readFileSync('sw.js','utf8');
const checks=[
['PWA standalone',manifest.display==='standalone'],
['v2 manifest identity',manifest.name.includes('2')&&manifest.short_name.includes('2')],
['isolated v2 storage',html.includes("var LS_KEY='skh_v2';")],
['dashboard summary UI',html.includes('v2-hero')],
['local persistence',html.includes('localStorage')],
['cash and QRIS',/cash/i.test(html)&&/qris/i.test(html)],
['void and backup/restore',/void/i.test(html)&&/backup/i.test(html)&&/restore/i.test(html)],
['PIN hashing and verify',html.includes('async function hashPin(')&&html.includes('async function verifyPin(')],
['v2 service worker cache',sw.includes('skh-v2-')&&sw.includes('APP_SHELL')]
];
let fail=false;
for(const [name,ok] of checks){console.log((ok?'PASS: ':'FAIL: ')+name);if(!ok)fail=true;}
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());
for(let i=0;i<scripts.length;i++){const p='.qa-inline-'+i+'.js';fs.writeFileSync(p,scripts[i]);const r=spawnSync(process.execPath,['--check',p],{encoding:'utf8'});fs.unlinkSync(p);if(r.status!==0){console.error(r.stderr);fail=true}else console.log('PASS: inline JS syntax');}
const r=spawnSync(process.execPath,['--check','sw.js'],{encoding:'utf8'});if(r.status!==0){console.error(r.stderr);fail=true}else console.log('PASS: service worker syntax');
if(fail)process.exit(1);console.log('Static QA passed. Device/browser testing remains required.');
