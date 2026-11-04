'use strict';

const CACHE_NAME = 'skh-v2-0-1';
const APP_SHELL = ['./','./index.html','./manifest.json','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{const keep=new Set([CACHE_NAME]);event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('skh-v2-')&&!keep.has(key)).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url),scopeUrl=new URL(self.registration.scope);if(url.origin!==scopeUrl.origin||!url.pathname.startsWith(scopeUrl.pathname))return;const isShellAsset=APP_SHELL.some(path=>new URL(path,scopeUrl).href===url.href);if(!isShellAsset)return;event.respondWith((async()=>{const cache=await caches.open(CACHE_NAME),cached=await cache.match(request);if(cached)return cached;try{const response=await fetch(request);if(response&&response.ok)await cache.put(request,response.clone());return response}catch(error){if(request.mode==='navigate')return(await cache.match('./index.html'))||Response.error();return Response.error()}})())});
