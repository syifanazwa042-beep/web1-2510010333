# Sasirangan Banua — Katalog Kain & Produk Sasirangan

Proyek praktikum Pemrograman Web 1 (Modul 1–4) Program Studi Teknik Informatika, Fakultas Teknologi Informasi, Universitas Islam Kalimantan (UNISKA) Muhammad Arsyad Al Banjari Banjarmasin.

## Identitas Mahasiswa
- Nama: Nazwa Syifa Az-Zahra
- NPM:2510010333
- Kelas: 3D Reguler Banjarmasin
- URL GitHub Pages: https://syifanazwa042-beep.github.io/web1-2510010333/

## Fitur Utama Website
1. Katalog Produk Dinamis (`data/katalog.json` & `js/katalog.js`):** Menampilkan 11 produk kain, pakaian, dan aksesoris Sasirangan yang dimuat secara asinkron menggunakan `fetch()` dan `async/await` lengkap dengan indikator status *loading* serta tombol muat ulang saat galat.
2. Pencarian & Filter Kategori:Penyaringan produk secara langsung berdasarkan kata kunci nama/deskripsi maupun kategori (`Semua`, `Kain`, `Pakaian`, `Aksesoris`).
3. Widget Jadwal Salat Banjarmasin (`js/jadwal-salat.js`):** Mengambil data waktu salat harian Kota Banjarmasin (`ID_KOTA = 2113`) dari API publik MyQuran (Kementerian Agama RI).
4. Formulir Pemesanan (`kontak.html`):** Validasi input pemesanan pelanggan secara interaktif.

## Teknologi yang Digunakan
- HTML5 Semantik & CSS3 Responsif (CSS Custom Properties, Flexbox, CSS Grid)
- JavaScript ES6+ (`fetch`, `async/await`, `DOM Manipulation`, `Intl.NumberFormat`)
- API Publik Jadwal Salat MyQuran v2
- Git, GitHub, dan GitHub Pages