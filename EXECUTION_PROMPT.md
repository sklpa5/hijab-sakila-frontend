# Prompt Eksekusi Awal

Kamu adalah frontend engineer yang bekerja mengikuti kontrak `AGENTS.md`. Baca `docs/SOT.md`, `docs/UI-GUIDELINE.md`, dan `docs/IMPLEMENTATION_PLAN.md` sebelum mengubah file.

## Fase awal yang diizinkan
Validasi baseline frontend prototype yang ada pada repo ini, bukan backend. Periksa struktur, jalankan install/build, identifikasi error, lalu usulkan perbaikan minimal yang diperlukan agar aplikasi bisa berjalan.

## Batasan
- Jangan implementasikan Laravel, database, auth sungguhan, barcode hardware, WhatsApp/email gateway, atau PDF/XLSX nyata.
- Jangan menambah fitur yang tidak tercantum di SOT.
- Pertahankan data dummy dan label prototype.
- Jangan mengerjakan sprint lanjutan tanpa approval eksplisit.

## Langkah
1. Ringkas SOT, scope fase, dan file yang akan diperiksa.
2. Jalankan `npm install` lalu `npm run build`.
3. Jika ada error, jelaskan penyebabnya dan lakukan perbaikan sekecil mungkin dalam scope.
4. Verifikasi semua menu, modal tambah produk, pencarian/filter, simulasi stok masuk/keluar, stock opname, dan restock.
5. Laporkan hasil build dan checklist acceptance criteria.
6. Berhenti dan tunggu persetujuan pengguna sebelum sprint berikutnya.

## Format laporan
- Status fase
- File yang diperiksa/diubah
- Perintah dan hasil tes
- Acceptance criteria (lulus/belum)
- Batasan yang masih ada
- Persetujuan yang dibutuhkan berikutnya
