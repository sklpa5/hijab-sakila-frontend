# Implementation Plan — Agile Scrum

## Tujuan tahap awal
Menghasilkan frontend prototype yang dapat dijalankan lokal untuk validasi alur dan UI/UX sebelum backend Laravel dibuat.

## Sprint 0 — Baseline dan fondasi
**Cakupan:** konfirmasi SOT, struktur Vite, Tailwind, token visual, shell aplikasi, navigasi, responsive layout.  
**Kriteria selesai:** app berjalan, lintasan halaman utama tersedia, dokumen SOT dan guideline jadi acuan.

## Sprint 1 — Dashboard dan master data
**Cakupan:** dashboard dummy, katalog produk/varian, pencarian, filter, modal tambah produk lokal.  
**Kriteria selesai:** data mudah dibaca; pencarian/filter bekerja; penambahan produk terlihat selama sesi aktif; tidak ada klaim penyimpanan server.

## Sprint 2 — Transaksi inventaris
**Cakupan:** barang masuk, barang keluar, stock opname, mutasi stok.  
**Kriteria selesai:** validasi jumlah pada simulasi; stok tidak menjadi negatif; selisih stock opname dihitung; riwayat diberi label dummy.

## Sprint 3 — Restock, pemasok, laporan, role view
**Cakupan:** alert stok rendah, rekomendasi restock, direktori pemasok, laporan chart, tampilan role.  
**Kriteria selesai:** alert konsisten dengan safety stock; tombol integrasi yang belum tersedia menjelaskan batasannya.

## Sprint 4 — Validasi prototype
**Cakupan:** uji navigasi, responsive, empty state, keyboard/focus, pengecekan build, dan revisi berdasarkan persetujuan pengguna.  
**Kriteria selesai:** `npm run build` berhasil; semua menu dapat dibuka; tidak ada dead-end yang mengklaim tindakan server nyata.

## Gate persetujuan
Setelah tiap sprint, tampilkan hasil dan catatan perubahan. **Jangan lanjut ke sprint berikutnya tanpa persetujuan pengguna.** Pekerjaan awal dalam ZIP ini adalah baseline frontend prototype dan dokumen kontrak; tidak mencakup backend.

## Tahap backend berikutnya (belum termasuk)
Setelah frontend disetujui: desain API dan ERD, Laravel auth/policy, database/migrations, transaksi atomik dan audit log, scheduler notifikasi, adapter email/WhatsApp, ekspor PDF/XLSX, pengujian, deployment. Setiap bagian membutuhkan persetujuan ruang lingkup tersendiri.

## Risiko dan mitigasi
- Aturan restock belum final → tandai rumus sebagai baseline sementara dan validasi dengan owner.
- Stok ganda/negatif → backend wajib transaksi database atomik dan validasi stok.
- Pengiriman notifikasi berulang → deduplikasi alert, status kirim, retry, dan log.
- Perbedaan hak akses → Laravel Policies/middleware; tampilan frontend bukan pengaman.
- Data contoh dianggap nyata → beri label demo di semua halaman dan jangan gunakan kontak riil.
