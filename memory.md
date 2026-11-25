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
| `/produk-api` | `app/produk-api/page.js` | **Modul B2 (P3 - Sprint)**: Katalog produk live dari DummyJSON (Server Component async, form pencarian `?q=`, skeleton loading `loading.js`, konversi kurs IDR 16.000, penanda stok merah, format waktu `dayjs` Indonesia, serta penanganan 3 keadaan UI: Berhasil, Kosong, Gagal `role="alert"`). |

---

## 4. Struktur Modul & Referensi Pelatihan (`modul/`)

Struktur modul pelatihan sertifikasi Junior Programmer telah dikelompokkan rapi per pertemuan:

* **`modul/P01/` — Pertemuan 1: Next.js, JSX, HTML Semantik, dan Tailwind**
  * **Unit SKKNI:** `J.620100.010.01` (Menggunakan Spesifikasi Bahasa Pemrograman) & `J.620100.019.02` (Menerapkan Perintah Eksekusi Bahasa Pemrograman Berbasis Teks, Grafik, dan Multimedia).
  * **File:** `2-praktik.pdf` (Kuis Diagnostik & Panduan Praktik Form/Katalog/CV) dan `3-slide.pdf` (Slide presentasi).
* **`modul/P02/` — Pertemuan 2: JavaScript Modern untuk React**
  * **Unit SKKNI:** `J.620100.004.02` (Menggunakan Library atau Komponen Pre-Existing), `J.620100.014.01` (Menerapkan Kode Program), dan `J.620100.017.02` (Mengimplementasikan Struktur Data).
  * **File:** `1-materi.pdf` (Konsep ES6+, modularisasi, method array, immutability), `2-praktik.docx` & `2-praktik.pdf` (Panduan praktik library nilai, hitung, & dashboard mahasiswa), serta `3-slide.pdf` (Slide presentasi).
* **`modul/P03/` — Pertemuan 3: Algoritma, Async, dan Debugging**
  * **Unit SKKNI:** `J.620100.022.02` (Mengimplementasikan Algoritma Pemrograman), `J.620100.004.02` (Menggunakan Library atau Komponen Pre-Existing), dan `J.620100.025.02` (Melakukan Debugging).
  * **File:** `1-materi.pdf` (Konsep Algoritma, Searching & Sorting + Big-O, Async/Await fetch, Dayjs, Debugging), `2-praktik.pdf` (Panduan praktik B1 pustaka algoritma, B2 halaman produk-api, Sesi 4 debugging bug.mjs), dan `3-slide.pdf` (Slide presentasi).
* **`modul/P04/` — Pertemuan 4: Komponen, Props, dan Rendering (Proyek Inventaris Toko)**
  * **Unit SKKNI:** `J.620100.010.01` (Menerapkan Perintah Eksekusi Bahasa Pemrograman Berbasis Teks, Grafik, dan Multimedia) & `J.620100.019.02` (Menggunakan Library atau Komponen Pre-Existing).
  * **File:** `1-materi.pdf` (Cara kerja React, komponen, props, children, dekomposisi hierarki), `2-praktik.pdf` (Panduan proyek baru inventaris-toko, Tombol, KartuBarang, LabelStok, Navbar, Footer, TabelData, Bagian, KartuStatistik, Kuis C4), serta `3-slide.pdf` (Slide presentasi 26 slide).
* **`modul/P05/` — Pertemuan 5: State, Event, Controlled Form, dan Lifting State Up**
  * **Unit SKKNI:** `J.620100.017.02` (Mengimplementasikan Pemrograman Terstruktur) & `J.620100.014.01` (Menerapkan Metode dan Praktik Penggunaan Kembali / Reusable Subrutin).
  * **File:** `1-materi.pdf` (`useState`, `"use client"`, event handler, snapshot vs updater, immutability, controlled form, validasi regex, lifting state up, React DevTools), `2-praktik.pdf` (Praktik terpandu A1–A5, Sprint B manajemen barang di memori, 6 skenario uji C3, kuis C4), serta `3-slide.pdf` (Slide presentasi).

---

## 5. Implementasi Pertemuan 2: JavaScript Modern, ES6+, & Manipulasi Data
* **Panduan Sumber:** `modul/P02/2-praktik.pdf` & `modul/P02/2-praktik.docx`.
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

## 6. Implementasi Pertemuan 3: Algoritma, Async, Fetch, & Web API
* **Panduan Sumber:** `modul/P03/1-materi.pdf`, `modul/P03/2-praktik.pdf`, & `modul/P03/3-slide.pdf`.
* **Pustaka Algoritma Murni (`lib/algoritma.js` — Sprint B1):**
  * `linearSearch(arr, target)`: Pencarian sekuensial ($O(n)$) $\rightarrow$ `{ indeks, langkah }`.
  * `binarySearch(arr, target)`: Pencarian biner ($O(\log n)$) $\rightarrow$ `{ indeks, langkah }`.
  * `bubbleSort(arr)`: Pengurutan gelembung ($O(n^2)$) dengan optimasi flag `adaTukar` $\rightarrow$ `{ hasil, perbandingan }`.
  * `selectionSort(arr)`: Pengurutan seleksi ($O(n^2)$) berbasis pencarian elemen minimum `iMin` $\rightarrow$ `{ hasil, perbandingan }`.
  * `insertionSort(arr)`: Pengurutan penyisipan ($O(n^2)$) kartu $\rightarrow$ `{ hasil, perbandingan }`.
  * `urutkanBerdasarkan(daftar, properti, arah)`: Fungsi murni pengurutan objek (*immutable*).
* **Pustaka Data API (`lib/api.js` — Sprint B2):**
  * `ambilProduk(kata = "")`: Panggilan aman (*resilient*) ke DummyJSON dengan handling `encodeURIComponent`, simulasi `tunda(800)` untuk loading, dan selalu mengembalikan `{ data, total, error }`.
* **Diagram Alir Algoritma (`docs/flowchart/`):**
  * `linear-search.mmd`, `binary-search.mmd`, dan `bubble-sort.mmd`.
* **Latihan Terminal Node.js (`latihan/`):**
  * `latihan/async.mjs`: Event Loop (Sync $\rightarrow$ Microtask Promise $\rightarrow$ Macrotask Timer), `cekStok` manual, async/await, try/catch/finally, dan `Promise.all`.
  * `latihan/fetch.mjs`: Pengujian fetch ke DummyJSON, ekstraksi `res.json()`, `console.table`, dan satpam `if (!res.ok)`.
  * `latihan/tanggal.mjs`: Integrasi library eksternal npm `dayjs`, locale Indonesia (`id`), dan kalkulasi tanggal relatif.
  * `latihan/uji-algoritma.mjs`: Pengujian benchmark 5 algoritma, 100% presisi sesuai kunci modul:
    * Bubble Sort `[29, 10, 14, 37, 13]`: `10` perbandingan.
    * Selection Sort: `10` perbandingan.
    * Insertion Sort: `8` perbandingan.
    * Binary Search cari 85: `4` langkah (indeks 10).
    * Linear Search cari 85: `11` langkah (indeks 10).
  * `latihan/bubble-sort/`: Eksperimen mandiri perulangan bubble sort descending dan display proses log.
* **Halaman Web Next.js (`app/produk-api/`):**
  * `page.js`: Server Component async membaca `await searchParams`, form pencarian `?q=`, katalog responsif kurs IDR 16.000, stok merah, format tanggal `dayjs`, serta 3 penanganan keadaan UI (Memuat, Kosong, Gagal dengan `role="alert"`).
  * `loading.js`: Komponen skeleton berdenyut (*pulse skeleton*) 6 kartu abu-abu dengan `aria-busy="true"`.

---

## 7. Implementasi Pertemuan 4: Komponen, Props, dan Proyek Inventaris Toko (SELESAI)
* **Panduan Sumber:** `modul/P04/1-materi.pdf`, `modul/P04/2-praktik.pdf`, & `modul/P04/3-slide.pdf`.
* **Proyek Berkelanjutan (`inventaris-toko/`):**
  * Dibangun sebagai aplikasi Next.js (App Router, Tailwind CSS, ESLint, Lucide React) yang dikerjakan secara berkelanjutan dari P4 hingga P17.
* **Progres Praktik Terpandu Peserta (Hands-on Coding):**
  * **Sesi A1 (Komponen Tombol - `components/Tombol.js`):**
    * Dibuat mandiri dengan 4 varian warna (`utama`, `garis`, `bahaya`, dan modifikasi `netral`).
    * Mempelajari dekonstruksi props (`{ children, varian, ikon: Ikon, ...sisa }`), aturan PascalCase pada pemanggilan komponen JSX, dan rest/spread parameter.
  * **Sesi A2 (Data & Logika Murni):**
    * `lib/data-barang.js`: Master data 12 barang dummy, 4 kategori (`Alat Tulis`, `Makanan`, `Minuman`, `Kebersihan`), dan `BATAS_MENIPIS = 10`.
    * `lib/barang.js`: Fungsi murni komputasi persediaan (`statusStok`, `kelompokkanPerKategori`, `ringkasanStok`).
    * Pemahaman mendalam konsep fungsi array: `.length` (kuantitas baris), `.reduce()` (akumulasi total unit dan valuasi modal), `.filter().length` (pencarian stok habis & menipis).
  * **Sesi A2 (Komponen Barang & Rendering):**
    * `components/LabelStok.js`: Badge status adaptif 3 warna (`habis`, `menipis`, `tersedia`) dengan lookup table `WARNA[status]` dan nested ternary.
    * `components/KartuBarang.js`: Kartu produk berikon `Package`, format Rupiah (`formatRupiah`), efek pudar bersyarat (`opacity-60` saat stok 0), dan pemanggilan komponen anak `<LabelStok stok={stok} />`.
    * Pemahaman tuntas mengenai **Aliran Data Satu Arah (*One-Way Data Flow*)** dari array sumber $\rightarrow$ map $\rightarrow$ KartuBarang $\rightarrow$ LabelStok.
  * **Sesi A3 (Navbar & Footer Semantik):**
    * `components/Navbar.js`: Navigasi atas dengan `Link` ke beranda, ikon `Store`, dan menu anchor internal (`#katalog`, `#tabel`, `#tentang`).
    * `components/Footer.js`: Catatan kaki semantik dengan hak cipta dinamis dan default parameter `tahun = 2026`.
  * **Sesi A4 (Komponen Serbaguna `TabelData.js`):**
    * `components/TabelData.js`: Tabel generik deklaratif berbasis pemetaan kolom (`kolom`), penanganan keadaan kosong (*empty state*), serta render prop `k.tampil ? k.tampil(baris) : baris[k.kunci]`.
  * **Sesi B (Sprint UI Statis Toko Maju Jaya & Modern SaaS Redesign):**
    * `components/KartuStatistik.js`: 4 kartu metrik data (Bento Grid) dengan peringatan bersyarat border amber.
    * `components/Bagian.js`: Wrapper section semantik dengan prop `children`.
    * **Desain UI Modern (Dribbble Inspired)**: Transformasi tampilan dari template kaku ke **Clean Modern SaaS (Linear/Raycast style)**: latar kanvas halus `bg-zinc-50/60`, navbar *sticky glassmorphism* (`backdrop-blur-md`), kartu produk beraksen kontainer ikon indigo dan efek *hover lift* (`hover:-translate-y-0.5 hover:shadow-md`), serta *pill badge* pastel lembut.
    * `app/page.js`: Perakitan katalog penuh Toko Maju Jaya (4 kartu metrik, pengelompokan per kategori bersarang, dan tabel data).
  * **Sesi C (Validasi SKKNI & Evaluasi):**
    * **Target Angka Kunci:** 12 jenis barang, nilai persediaan Rp 2.425.000, 3 stok menipis, 2 stok habis.
    * **Rubrik SKKNI:** Nilai sempurna 100/100 (7 komponen mandiri di `components/`, props/children, rendering daftar stabil, rendering bersyarat, logika murni di `lib/`, pre-existing components & aksesibilitas `aria-hidden`, dan responsif).
    * **Verifikasi Build:** 0 warning / 0 error pada `npm run lint` dan lolos `next build` Turbopack 100% statis.
    * **Pohon Komponen:** Terdokumentasi lengkap dalam diagram alir Mermaid.

---

## 8. Implementasi Pertemuan 5: State, Controlled Form, & Manajemen Barang (SELESAI)
* **Panduan Sumber:** `modul/P05/1-materi.pdf`, `modul/P05/2-praktik.pdf`, & `modul/P05/3-slide.pdf`.
* **Sesi A — Praktik Terpandu (Hands-on Coding di `inventaris-toko/`):**
  * **A1 & A2 (`components/Penghitung.js` & `app/latihan/page.js`):** Eksperimen `useState`, direktif `"use client"`, state independen antar instance, serta perbedaan *snapshot* (`setJumlah(jumlah + 1)`) vs *updater function* (`setJumlah((j) => j + 1)`). *(Dipertahankan sementara sebagai referensi latihan).*
  * **A3 & A4 (`lib/validasi.js`, `latihan/uji-validasi.mjs`, `components/FormBarang.js`):**
    * `lib/validasi.js`: Fungsi murni `validasiBarang(data, daftar, idSedangDiedit)` dan `adaGalat(galat)` untuk 6 kolom (`kode` format `/^[A-Z]{3}-\d{3}$/` & cek ganda, `nama` min 3 karakter, `kategori`, `harga` bulat > 0, `stok` bulat >= 0, `satuan`).
    * `latihan/uji-validasi.mjs`: Uji terminal 4 skenario validasi, 100% sesuai kunci modul.
    * `components/FormBarang.js`: *Controlled form* dengan 1 objek state `isian`, 1 handler `ubah(e)` (`[name]` + auto-uppercase `kode`), `noValidate`, komponen `Kolom`, pesan galat per kolom, serta atribut aksesibilitas `aria-invalid` dan `aria-describedby`.
  * **A5 (`lib/barang.js`):** Penambahan fungsi murni *immutable*: `rapikanBarang`, `tambahBarang`, `ubahBarang`, dan `hapusBarang`.
* **Sesi B — Sprint Manajemen Barang di Memori:**
  * `components/DialogKonfirmasi.js`: Modal konfirmasi hapus (`role="alertdialog"`, `aria-modal="true"`, tombol `Batal` `autoFocus` dan `Ya, hapus`).
  * `components/ManajemenBarang.js`: Induk pengelola state (`daftar`, `diedit`, `akanDihapus`, `pesan`), menghitung 4 `KartuStatistik` sebagai nilai turunan (`ringkasanStok(daftar)`), pola edit dengan `key={diedit?.id ?? "baru"}`, notifikasi status hijau (`role="status"`), dan `TabelData` lengkap dengan `formatRupiah`, `<LabelStok />`, serta kolom Aksi (Edit & Hapus dengan `aria-label`).
  * `app/page.js`: Halaman beranda Server Component merender `<ManajemenBarang barangAwal={daftarBarang} />`.
* **Verifikasi:** `npm run lint` (0 error/warning) dan `npm run build` Turbopack lolos (`/` dan `/latihan` ter-build statis).

---

## 9. Aset Statis & Dokumentasi
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

## 10. Konfigurasi Git & Riwayat Milestone
* **Branch Utama:** `main`.
* **Remote Repository:** `https://github.com/Bhayu-Satriaa/raincamp`
* **File `.gitignore`:** Mengabaikan `html-practice/` dan folder latihan internal `belajar-js/`.
* **Riwayat Commit Utama:**
  * `c76d082`: Milestone Pertemuan 1 (Form, Katalog TokoKita, CV Semantik, Landing KasirKu, dan Laporan PDF).
  * `87e0dfc`: `feat(day2): implementasi modul pertemuan 2 - javascript modern es6+, lib nilai & hitung, dashboard mahasiswa, evaluasi c3-c4, serta laporan pdf`.
  * `55ba10d`: `feat(day3): implementasi modul pertemuan 3 - pustaka algoritma, async fetch dummyjson, halaman web produk-api, dayjs, dan 3 flowchart`.
  * `0d2a094`: `feat(p4): tambahkan Tombol, data-barang, lib barang, LabelStok, dan KartuBarang hasil hands-on coding`.
  * `feat(p4)`: `selesaikan modul p04 - navbar, footer, tabeldata generik, sprint ui inventaris toko maju jaya, dan desain modern saas`.
  * *(Current)*: `feat(p5): selesaikan modul p05 - state, controlled form, validasi, dialog konfirmasi, dan manajemen barang`.
* **Workflow Push:** Setiap ada perubahan fungsional atau dokumentasi, lakukan build check (`npm run build`), commit dengan format semantik (`feat:`, `docs:`), dan push ke `origin main`.
* **Pembuatan PDF:** Menggunakan Microsoft Edge headless via PowerShell:
  `Start-Process msedge -ArgumentList '--headless=new', '--print-to-pdf="<output.pdf>"', '--no-pdf-header-footer', '<file.html>' -Wait`
