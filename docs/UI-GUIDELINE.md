# UI Guideline — Sakila Inventory

## Prinsip
- Modern SaaS, bersih, ringan, berorientasi kerja operasional.
- White-first, kontras teks memadai, aksen hijau teal untuk tindakan utama dan kondisi positif.
- Data padat ditampilkan dalam tabel yang mudah dipindai; status selalu memakai label teks, bukan warna saja.
- Desktop memakai sidebar tetap; layar kecil memakai navigasi drawer.
- Gunakan bahasa Indonesia yang jelas, konsisten, dan singkat.

## Brand palette
| Token | HEX | Penggunaan |
|---|---|---|
| Ink | `#203330` | Heading dan teks utama |
| Brand / Teal | `#167D72` | CTA utama, link, ikon aktif |
| Brand dark | `#116B61` | Hover CTA |
| Mint surface | `#E8F5F1` | Navigasi aktif, highlight positif |
| Canvas | `#F7F9F8` | Latar aplikasi |
| Surface | `#FFFFFF` | Panel, kartu, modal |
| Border | `#E8EEEB` | Border, pemisah tabel |
| Muted | `#879792` | Teks sekunder |
| Warning | `#BF7B31` | Stok rendah dan perlu tindakan |
| Danger | `#CF7954` | Selisih negatif/validasi |
| Info | `#6689C6` | Informasi sekunder |
| Purple | `#8E77C2` | Statistik nilai stok |

## Tipografi
- Display/heading: Manrope, 700–800.
- UI/body: DM Sans, 400–700.
- Heading halaman sekitar 25 px desktop; body 11–13 px pada dashboard padat; jangan mengorbankan keterbacaan di mobile.
- SKU dan referensi transaksi memakai monospace.

## Layout & komponen
- Sidebar desktop sekitar 248 px; topbar sekitar 70 px.
- Canvas `#F7F9F8`, panel putih, radius panel 12–13 px, border tipis, shadow sangat ringan.
- Spacing utama 8/12/16/20/24/32 px.
- Tombol utama solid teal; secondary putih dengan border; aksi destruktif kelak perlu konfirmasi.
- Status: hijau = aman/aktif, amber = stok menipis/perlu tindakan, merah lembut = negatif/masalah, abu = draft/netral. Sertakan label tekstual.
- Tabel: header uppercase kecil, row separator tipis, horizontal scroll pada layar kecil.
- Form: label terlihat, placeholder hanya contoh, validasi inline, tombol konfirmasi jelas.
- Empty/error/loading state perlu ditambahkan ketika API dibuat.

## Responsif
- Desktop: sidebar tetap, dashboard dua kolom.
- Tablet: sidebar drawer dan dashboard satu kolom jika ruang sempit.
- Mobile: kartu statistik dua kolom, form satu kolom, tabel horizontal scroll, tombol utama lebar penuh bila sesuai.

## Aksesibilitas
- Semua tombol punya label yang jelas; ikon dekoratif tidak menggantikan nama tindakan.
- Fokus keyboard terlihat, input memakai label, status tidak bergantung pada warna saja.
- Target kontras teks normal minimal WCAG AA saat final QA.

## Batasan visual prototype
Produk divisualisasikan dengan swatch abstrak, bukan foto produk asli. Angka, grafik, kontak, supplier, dan riwayat transaksi merupakan data dummy. Tidak menyiratkan integrasi barcode/gateway/backend sudah aktif.
