# Sakila Inventory — Frontend Prototype

Prototype antarmuka Sistem Informasi Manajemen Persediaan Barang Kerudung Toko Hijab Sakila. Dibangun dengan React + Vite + Tailwind CSS, memakai data dummy dan belum terhubung ke backend Laravel/database.

## Menjalankan proyek

Persyaratan: Node.js 18+ dan npm.

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (biasanya `http://localhost:5173`). Untuk build:

```bash
npm run build
npm run preview
```

## Fitur demo
- Dashboard ringkasan stok, tren barang masuk/keluar, dan daftar stok kritis.
- Katalog produk/varian dengan pencarian, filter, tambah produk lokal di state, dan ekspor CSV demo.
- Form simulasi barang masuk dan keluar yang memperbarui stok di state browser.
- Stock opname dengan perhitungan selisih sementara.
- Daftar rekomendasi restock berdasarkan safety stock.
- Direktori pemasok dummy, mutasi stok contoh, laporan visual, dan gambaran role pengguna.
- Layout responsif untuk desktop dan mobile.

## Batasan prototype
Data akan kembali ke kondisi awal saat halaman dimuat ulang. Belum ada autentikasi nyata, persistensi database, barcode scanner, scheduler, WhatsApp/email gateway, persetujuan restock tersimpan, atau ekspor PDF/XLSX. Tombol yang belum terhubung memberi umpan balik demo agar tidak memberi kesan transaksi sungguhan.

## Dokumen sumber
Lihat `docs/SOT.md`, `docs/UI-GUIDELINE.md`, `docs/IMPLEMENTATION_PLAN.md`, `AGENTS.md`, dan `EXECUTION_PROMPT.md`.
