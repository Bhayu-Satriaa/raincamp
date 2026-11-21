# Project Memory: Raincamp (Next.js 16+ & Tailwind CSS)

Dokumen memori ini mencatat profil pengembang, arsitektur proyek, riwayat pengerjaan, dan preferensi teknis untuk referensi sesi berikutnya.

---

## 1. Profil Pengembang
* **Nama:** Bhayu Satria Sugara
* **Peran:** Junior Programmer
* **Pendidikan:** D4 Teknik Rekayasa Perangkat Lunak (Politeknik Pertanian Negeri Samarinda), Alumni SMK Negeri 7 Samarinda (2025)
* **Email:** bhayuusatriaa@gmail.com
* **GitHub:** [https://github.com/Bhayu-Satriaa/raincamp](https://github.com/Bhayu-Satriaa/raincamp)
* **Latar Belakang Keahlian:** Berpengalaman dengan sintaks PHP dan framework Laravel. Sedang mendalami ekosistem JavaScript modern (React 19, Next.js 16 App Router, dan Tailwind CSS).

---

## 2. Jembatan Konsep (Mental Model: Laravel vs Next.js)
* **Routing:** Bukan di `routes/web.php`, melainkan berbasis struktur folder (*App Router* di folder `app/`).
* **Halaman Web:** Didefinisikan lewat fungsi komponen yang diekspor sebagai `export default` di dalam file `page.js`.
* **JSX vs Blade:** 
  * Atribut `class` menjadi `className`.
  * Atribut `for` pada `<label>` menjadi `htmlFor` (karena `for` adalah keyword JavaScript).
  * Kurung kurawal `{}` dipakai untuk menyisipkan nilai JavaScript asli (angka, boolean, variabel, fungsi) seperti halnya `{{ $variabel }}` di Blade.
* **Arsitektur Aplikasi (MVC vs Component-Based & Fullstack Hybrid):**
  * Di Laravel, kode dipisah berdasarkan peran teknis (Model di `app/Models`, View di `resources/views`, Controller di `app/Http/Controllers`).
  * Di Next.js, pendekatan yang dipakai adalah *Co-location* (arsitektur komponen): Tampilan (JSX), gaya (Tailwind), dan interaksi dibungkus dalam komponen mandiri yang bisa dipakai ulang.
  * *Server Component* (default) berjalan di Node.js server (mengambil data langsung mirip Controller + Model), sedangkan *Client Component* (`'use client'`) menangani interaksi pengguna di peramban.
* **ES Module (`export` vs `import`):**
  * Setiap file JS adalah modul terisolasi (*private*).
  * `export`: Memberi izin/memajang fungsi/data ke etalase publik agar bisa dipinjam oleh file lain.
  * `import`: Mengambil barang yang diekspor dari file sumber. Tanpa `export`, modul target akan menghasilkan error `... doesn't exist in target module`.
* **Path Alias (`@/`) vs Jalur Relatif (`../`):**
  * `@/` adalah shortcut menuju akar proyek (`raincamp/`), dibaca oleh compiler Next.js dari `jsconfig.json` untuk mencegah *relative path hell*.
  * Ketika file dijalankan langsung via Node.js terminal (`node ...`), gunakan jalur relatif (`../lib/...`) karena Node.js murni tidak membaca alias Next.js.
* **Konvensi Pemisahan Folder:**
  * `data/`: Khusus data mentah (*raw data* seperti JSON/CSV) tanpa logika komputasi.
  * `lib/`: Kumpulan pustaka fungsi, helper, dan logika utilitas murni (*pure & reusable code*).
  * `public/`: Aset statis non-kode yang disajikan langsung ke browser (gambar, video, font).
* **Next.js 16 Turbopack & Partial Prerendering (PPR):**
  * Proyek mengaktifkan `cacheComponents: true` dan `partialPrefetching: true`.
  * Komponen halaman yang membaca `searchParams` (runtime data) tidak kompatibel dengan `export const dynamic = "force-dynamic"`.
  * Solusi modern: Bungkus komponen pengakses `searchParams` di dalam boundary `<Suspense fallback={...}>` sehingga *shell* halaman tetap ter-prerender statis (`◐ Partial Prerender`) sementara bagian tabel di-*stream* secara dinamis.

---

## 3. Struktur Rute & Halaman yang Telah Dibuat

| Rute URL | File Sumber | Deskripsi & Fitur Utama |
| :--- | :--- | :--- |
| `/` | `app/page.js` | Halaman landing bawaan Next.js. |
| `/daftar` | `app/daftar/page.js` | **Modul A2 & A3 (P1)**: Form pendaftaran pelatihan bergaya Tailwind dengan reusable class (`kelasLabel`, `kelasInput`) dan efek focus ring. |
| `/produk-mini` | `app/produk-mini/page.js` | **Modul A4 & A5 (P1)**: Katalog TokoKita dengan navbar Flexbox, grid kartu responsif (1 kolom di HP $\rightarrow$ 2 kolom di tablet $\rightarrow$ 3 kolom di desktop), Dark Mode, serta ikon paus DeepSeek di atas teks DeepSeek pada setiap kartu. |
| `/cv` | `app/cv/page.js` | **Modul B1 (P1)**: Curriculum Vitae semantik lengkap (`<header>`, `<nav>`, `<figure>`, `<table>`, `<ul>` nested, `<article>`, `<video>`, `<form>` grid 2-kolom, `<footer>`). Mendukung mode gelap (*Dark Mode*). |
| `/landing` | `app/landing/page.js` | **Modul B2 (P1)**: Landing page produk KasirKu (Header, Hero section responsif, 3 Kartu Fitur, Paket Harga, dan Footer). |
| `/format` | `app/format/page.js` | **Modul A2 & A5 (P2)**: Uji coba pustaka format (`formatRupiah`, `formatTanggal`, `singkat`) dan render data JSON dari `data/barang.json`. |
| `/mahasiswa` | `app/mahasiswa/page.js` | **Modul B (P2 - Sprint)**: Dashboard analitik 20 mahasiswa (4 kartu statistik responsif, 3 panel analitik: Top 3, Distribusi Huruf, Rata-rata per Prodi, serta tabel nilai dengan status kelulusan visual & filter URL `?prodi=...` berbasis Next.js 16 Partial Prerendering). |
| `/evaluasi` | `app/evaluasi/page.js` | **Modul C3 (P2 - Evaluasi)**: Visualisasi web interaktif 11 soal tebak output JavaScript modern lengkap dengan kode sumber, badge output, dan penjelasan konsep. |

---

## 4. Modul Pertemuan 2: JavaScript Modern, ES6+, & Manipulasi Data
* **Panduan Sumber:** `modul/2-praktik.docx` (ditambahkan 21 November 2026).
* **Data Mentah (`data/`):**
  * `data/barang.json`: Data mentah JSON berisi 3 barang pertama dari `lib/barang.js` (validasi kutip ganda, no trailing comma).
* **Modul Library (`lib/`):**
  * `lib/format.js`: Pustaka helper format mata uang IDR (`Intl.NumberFormat`), tanggal lokal Indonesia (`Date.toLocaleDateString`), dan pemotong string teks (`singkat` dengan elipsis).
  * `lib/barang.js`: Master data array of objects barang dummy (id, nama, kategori, harga, stok).
  * `lib/nilai.js`: Master data 20 mahasiswa (`daftarMahasiswa`) dan konstanta `BOBOT = { tugas: 0.3, uts: 0.3, uas: 0.4 }`.
  * `lib/hitung.js`: Pustaka 14 fungsi komputasi murni (*pure & immutable*): `nilaiAkhir`, `hurufMutu`, `lulus`, `lengkapiNilai`, `jumlah`, `rataRata`, `tertinggi`, `terendah`, `ambilKolom`, `cariNim`, `filterProdi`, `urutkan`, `peringkat`, `distribusiHuruf`, dan `statistik`.
* **Latihan Terminal Node.js (`latihan/`):**
  * `latihan/dasar.mjs`: Variabel (`const` vs `let`), ternary operator, arrow function, loop `for...of`, serta perbedaan krusial `||` (falsy check) vs `??` (nullish check).
  * `latihan/array.mjs`: Method array modern (`.map()`, `.filter()`, `.find()`, `.some()`, `.reduce()`, `.sort()`).
  * `latihan/salin.mjs`: Destructuring array & object, default value, rest parameter, serta operasi copy immutable (`[...daftar]`).
  * `latihan/uji-hitung.mjs`: Pengujian pustaka `lib/hitung.js` terhadap data 20 mahasiswa di `lib/nilai.js`, 100% presisi sesuai kunci modul:
    * Rata-rata kelas: `74.14`, Tertinggi: `95.2`, Terendah: `44.5`, Lulus: `14 (70%)`.
    * Peringkat 3 Teratas: Maya Anggraini (95.2), Citra Dewi (92), Joko Susilo (89.3).
    * Distribusi Huruf: `{ A: 5, B: 5, C: 4, D: 5, E: 1 }`.
    * Rata-rata per Prodi: Informatika `69.05`, Sistem Informasi `80.38`.
  * `latihan/tebak-output.mjs`: Script pengujian 11 soal evaluasi tebak output konsep ES6+ (C3).
  * `latihan/tambahan.js`: Script latihan 4 topik diagnostik (C4: typeof data, FizzBuzz 1–30, concise arrow functions, dan template literal mapping).

---

## 5. Aset Statis & Dokumentasi
* **Folder `public/`**:
  * `foto.jpg`: Foto profil kandidat (digunakan pada `/cv`).
  * `deepseek-icon.svg`: Ikon paus DeepSeek vektor resolusi tajam (`#4D6BFE`).
  * `deepseek.svg`: Logo DeepSeek utuh (ikon + teks).
  * `perkenalan.mp4`: File video pendukung komponen video CV.
* **Dokumentasi PDF & Laporan Praktik:**
  * `Penjelasan-Halaman-CV.pdf`: Laporan dokumentasi resmi 5 halaman A4 mengenai kode sumber `app/cv/page.js` lengkap dengan analisis semantik dan screenshot tampilan web (P1).
  * `Laporan-Praktik-Pertemuan-2.pdf`: Laporan resmi praktikum Pertemuan 2 (Arsitektur Reusable Library, Sprint B Mahasiswa, dan placeholder screenshot C3 & C4).
  * `laporan-p2.html`: File sumber template HTML A4 berstandar cetak presisi untuk konversi ke PDF via Microsoft Edge headless.
  * `screenshot-desktop.png` & `screenshot-mobile.png`: Tangkapan layar tampilan web portofolio.

---

## 6. Konfigurasi Git & Riwayat Milestone
* **Branch Utama:** `main`.
* **Remote Repository:** `https://github.com/Bhayu-Satriaa/raincamp`
* **File `.gitignore`:** Mengabaikan `html-practice/` dan folder latihan internal `belajar-js/`.
* **Riwayat Commit Utama:**
  * `c76d082`: Milestone Pertemuan 1 (Form, Katalog TokoKita, CV Semantik, Landing KasirKu, dan Laporan PDF).
  * `87e0dfc`: `feat(day2): implementasi modul pertemuan 2 - javascript modern es6+, lib nilai & hitung, dashboard mahasiswa, evaluasi c3-c4, serta laporan pdf`.
* **Workflow Push:** Setiap ada perubahan fungsional atau dokumentasi, lakukan build check (`npm run build`), commit dengan format semantik (`feat:`, `docs:`), dan push ke `origin main`.
* **Pembuatan PDF:** Menggunakan Microsoft Edge headless via PowerShell:
  `Start-Process msedge -ArgumentList '--headless=new', '--print-to-pdf="<output.pdf>"', '--no-pdf-header-footer', '<file.html>' -Wait`
