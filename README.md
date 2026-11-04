# Kasir Soto Mie Kang Hendi 2 — v2.0.1

POS PWA satu perangkat dengan penyegaran UI dari versi pertama. Aplikasi tetap berjalan offline dan tidak menggunakan backend.

## Fitur
- Kasir makan di tempat / bawa pulang, catatan item, tunai dan QRIS manual
- Struk, riwayat, pembatalan transaksi, laporan, ekspor CSV
- Backup / restore JSON dan PIN kasir
- PWA standalone dengan app-shell offline

## Perbedaan v2
- UI diperbarui dengan ringkasan penjualan harian, tampilan menu dan kontrol yang lebih modern
- Penyimpanan lokal menggunakan namespace terpisah `skh_v2` agar data v1 tidak tertimpa
- Cache service worker dan identitas PWA v2 dipisahkan

## Batasan operasional
Data transaksi tersimpan di browser/perangkat yang digunakan. Tidak ada sinkronisasi antarperangkat atau verifikasi QRIS otomatis. Ekspor backup secara rutin.

## QA
Jalankan `node --check scripts/qa-static.mjs` dan `node scripts/qa-static.mjs`.
