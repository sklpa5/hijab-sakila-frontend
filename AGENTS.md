# AGENTS.md — Kontrak Kerja Agen

## Misi
Membangun aplikasi Sistem Informasi Manajemen Persediaan Barang Kerudung Toko Hijab Sakila sesuai `docs/SOT.md`, dengan UI konsisten pada `docs/UI-GUIDELINE.md` dan tahapan pada `docs/IMPLEMENTATION_PLAN.md`.

## Source of Truth
1. `docs/SOT.md` menentukan tujuan, batasan, istilah domain, dan aturan.
2. `docs/UI-GUIDELINE.md` menentukan warna, tipografi, komponen, dan perilaku responsif.
3. `docs/IMPLEMENTATION_PLAN.md` menentukan urutan pekerjaan dan approval gate.
4. Jika instruksi baru bertentangan dengan SOT, hentikan perubahan terkait dan minta persetujuan; jangan diam-diam memperluas scope.

## Kontrak teknologi
- Frontend: React + Vite + Tailwind CSS.
- Backend target masa depan: Laravel, tetapi jangan implementasikan backend kecuali diminta eksplisit dan diberi approval.
- Gunakan JavaScript/JSX pada baseline ini; hindari menambah dependency tanpa alasan dan persetujuan.
- Data prototype bersifat dummy dan in-memory.

## Aturan eksekusi
- Kerjakan satu sprint/fase pada satu waktu.
- Sebelum memulai fase baru, tampilkan ringkasan tujuan, file yang akan diubah, dan acceptance criteria.
- Tunggu persetujuan eksplisit pengguna sebelum menjalankan fase tersebut.
- Setelah selesai, laporkan perubahan, cara uji, hasil build, keterbatasan, dan keputusan yang diperlukan.
- Jangan mengklaim tindakan berhasil jika hanya placeholder.
- Jangan mengirim email/WhatsApp, membuat transaksi nyata, atau mengakses data produksi.
- Jangan mengganti stack, aturan domain, brand palette, atau pola navigasi tanpa persetujuan.

## Kualitas
- Pertahankan UI responsif, konsistensi label Bahasa Indonesia, fokus keyboard, status yang tidak bergantung pada warna saja, dan empty states yang jelas.
- Validasi input dan hindari stok negatif pada simulasi.
- Jangan menyimpan secret, token, atau kredensial dalam repo.
- Jangan menambahkan fitur di luar SOT.
- Jalankan `npm run build` sebelum menyatakan fase frontend siap.

## Selesai jika
Acceptance criteria pada fase terkait terpenuhi, build lolos, batasan diketahui, dan pengguna menyetujui hasil sebelum fase berikutnya.
