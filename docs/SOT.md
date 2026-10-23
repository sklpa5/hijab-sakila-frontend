# Source of Truth (SOT)

**Proyek:** Sistem Informasi Manajemen Persediaan Barang Kerudung Berbasis Web dengan Notifikasi Peringatan Restock Menggunakan Framework Laravel dan Metode Agile Scrum pada Toko Hijab Sakila Kabupaten Bogor  
**Versi:** 0.1.0 · **Status:** baseline disepakati untuk prototype frontend  
**Sumber kebenaran:** dokumen ini menjadi acuan ruang lingkup, istilah domain, dan batasan produk.

## 1. Tujuan
Membantu Toko Hijab Sakila mencatat persediaan kerudung per varian, memantau mutasi stok, mendeteksi stok rendah, dan menyiapkan rekomendasi restock serta laporan operasional. Tahap saat ini hanya membangun prototype frontend React-Vite dengan data dummy. Laravel adalah target backend tahap berikutnya, bukan bagian dari implementasi saat ini.

## 2. Pengguna dan hak akses target
- **Owner:** melihat dashboard dan laporan, mengatur safety stock, meninjau rekomendasi serta menyetujui restock.
- **Admin/Staf Gudang:** mengelola master produk, pemasok, barang masuk/keluar, dan stock opname.
- Prototype menampilkan simulasi role; autentikasi dan pembatasan akses belum nyata.

## 3. Modul dalam ruang lingkup
1. Dashboard ringkasan inventaris dan alert.
2. Data master produk/varian, kategori, pemasok, SKU/barcode, harga, dan batas minimum.
3. Barang masuk: jumlah, pemasok, referensi faktur/surat jalan, waktu, petugas.
4. Barang keluar: penjualan/retur cacat, jumlah, alasan/referensi, waktu, petugas.
5. Stock opname: stok sistem, hitung fisik, selisih, alasan, dan log adjustment.
6. Peringatan restock: status stok rendah, rekomendasi kuantitas, pemasok, prioritas, dan status pengajuan.
7. Mutasi stok kronologis.
8. Laporan stok, mutasi, dan kebutuhan restock dengan target ekspor PDF/XLSX.
9. Pengguna dan peran.

## 4. Aturan domain
- Satu **varian** adalah kombinasi produk/model, bahan, warna atau motif, dan ukuran yang dapat dilacak terpisah.
- Setiap varian mempunyai SKU unik. Barcode menjadi representasi identifikasi SKU; pemindaian fisik nyata berada di tahap integrasi berikutnya.
- `stock_on_hand` tidak boleh negatif.
- `safety_stock` disimpan per varian dan bernilai nol atau lebih.
- Alert stok rendah aktif saat `stock_on_hand <= safety_stock`. Alert harus dihitung kembali setelah transaksi keluar atau adjustment; perubahan safety stock juga mengevaluasi ulang alert.
- Barang masuk menambah stok setelah transaksi dikonfirmasi; barang keluar mengurangi stok setelah validasi ketersediaan.
- Stock opname mencatat stok sistem, stok fisik, selisih, alasan, petugas, dan waktu. Penyesuaian harus terlacak, tidak menghapus sejarah.
- Rekomendasi jumlah restock pada prototype memakai estimasi sederhana `max(2 × safety_stock − stock_on_hand, safety_stock)`. Rumus final perlu divalidasi dengan owner sebelum backend.
- Data dummy, angka dashboard, dan transaksi contoh bukan data operasional nyata.

## 5. Entitas konseptual
- `users`: nama, email, password hash, role, status.
- `categories`: nama kategori, deskripsi, status.
- `suppliers`: nama, kontak, email, alamat, status.
- `products`: nama produk, kategori, deskripsi.
- `product_variants`: product_id, SKU, barcode, bahan, model, warna/motif, ukuran, harga, safety_stock, status.
- `stock_transactions`: jenis, referensi, supplier bila relevan, status, petugas, waktu, catatan.
- `stock_transaction_items`: transaksi, varian, kuantitas, harga bila diperlukan.
- `stock_opnames`: waktu, petugas, status, catatan.
- `stock_opname_items`: varian, stok sistem, stok fisik, selisih, alasan.
- `restock_requests`: varian, jumlah rekomendasi, supplier, status persetujuan, approver, waktu.
- `notifications`: varian, kanal, pesan, status kirim, waktu.

Skema ini konseptual, bukan migrasi database yang sudah disetujui.

## 6. Status inti yang disarankan
- Transaksi stok: `draft`, `confirmed`, `cancelled`.
- Restock: `suggested`, `pending_approval`, `approved`, `ordered`, `received`, `rejected`.
- Notifikasi: `pending`, `sent`, `failed`, `read`.
- Status alert dihitung dari stok dan safety stock; hindari menyimpan status turunan jika bisa dihitung konsisten.

## 7. Kanal notifikasi
- In-app: wajib pada rancangan.
- Email dan WhatsApp Gateway: target integrasi setelah pemilihan penyedia, konfigurasi kredensial, persetujuan owner, dan mekanisme retry disepakati. Jangan mengirim pesan nyata dari prototype.

## 8. Kebutuhan laporan
- Stok saat ini per SKU/varian dan status safety stock.
- Mutasi stok berdasarkan periode, jenis transaksi, varian, dan petugas.
- Daftar kebutuhan restock, rekomendasi kuantitas, supplier, dan status persetujuan.
- Periode target: harian, mingguan, bulanan. Ekspor PDF/XLSX adalah target backend; CSV hanya demo frontend.

## 9. Batasan tahap ini
**Dikerjakan:** React, Vite, Tailwind CSS, navigasi, komponen UI, responsive layout, data dummy, interaksi lokal yang aman, preview tiap halaman.

**Tidak dikerjakan sekarang:** Laravel API, database, login sungguhan, policy/role enforcement, barcode hardware, integrasi gateway WhatsApp/email, scheduler, data produksi, transaksi persisten, ekspor PDF/XLSX nyata, deployment, atau fitur di luar konsep.

## 10. Kriteria penerimaan prototype
- Aplikasi bisa dijalankan melalui `npm install` dan `npm run dev`.
- Semua modul dalam ruang lingkup dapat dibuka dari navigasi.
- Tampilan konsisten dengan UI guideline dan responsif di desktop/mobile.
- Data dummy diberi label yang jelas.
- Interaksi lokal tidak mengklaim transaksi nyata atau persistensi.
- Penambahan fitur baru di luar ruang lingkup harus melalui persetujuan eksplisit sebelum implementasi.

## 11. Keputusan yang masih perlu disahkan
1. Apakah stok kritis memakai `<= safety_stock` (rekomendasi baseline) atau `< safety_stock`.
2. Rumus final rekomendasi jumlah restock dan apakah perlu mempertimbangkan lead time/penjualan.
3. Supplier wajib untuk tiap varian atau cukup di transaksi restock.
4. Aturan approval restock, pembatalan transaksi, dan adjustment.
5. Provider WhatsApp/email dan batas biaya pengiriman.
6. Kebutuhan barcode: cetak label, scan kamera, atau scanner eksternal.
7. Format dan kolom final laporan PDF/XLSX.
