# Project Memory: Raincamp (Next.js 15+ & Tailwind CSS)

Dokumen memori ini mencatat profil pengembang, arsitektur proyek, riwayat pengerjaan, dan preferensi teknis untuk referensi sesi berikutnya.

---

## 1. Profil Pengembang
* **Nama:** Bhayu Satria Sugara
* **Peran:** Junior Programmer
* **Pendidikan:** D4 Teknik Rekayasa Perangkat Lunak (Politeknik Pertanian Negeri Samarinda), Alumni SMK Negeri 7 Samarinda (2025)
* **Email:** bhayuusatriaa@gmail.com
* **GitHub:** [https://github.com/Bhayu-Satriaa/raincamp](https://github.com/Bhayu-Satriaa/raincamp)
* **Latar Belakang Keahlian:** Berpengalaman dengan sintaks PHP dan framework Laravel. Sedang mendalami ekosistem JavaScript modern (React, Next.js, dan Tailwind CSS).

---

## 2. Jembatan Konsep (Mental Model: Laravel vs Next.js)
* **Routing:** Bukan di `routes/web.php`, melainkan berbasis struktur folder (*App Router* di folder `app/`).
* **Halaman Web:** Didefinisikan lewat fungsi komponen yang diekspor sebagai `export default` di dalam file `page.js`.
* **JSX vs Blade:** 
  * Atribut `class` menjadi `className`.
  * Atribut `for` pada `<label>` menjadi `htmlFor` (karena `for` adalah keyword JavaScript).
  * Kurung kurawal `{}` dipakai untuk menyisipkan nilai JavaScript asli (angka, boolean, variabel, fungsi) seperti halnya `{{ $variabel }}` di Blade.

---

## 3. Struktur Rute & Halaman yang Telah Dibuat

| Rute URL | File Sumber | Deskripsi & Fitur Utama |
| :--- | :--- | :--- |
| `/` | `app/page.js` | Halaman landing bawaan Next.js. |
| `/daftar` | `app/daftar/page.js` | **Modul A2 & A3**: Form pendaftaran pelatihan bergaya Tailwind dengan reusable class (`kelasLabel`, `kelasInput`) dan efek focus ring. |
| `/produk-mini` | `app/produk-mini/page.js` | **Modul A4 & A5**: Katalog TokoKita dengan navbar Flexbox, grid kartu responsif (1 kolom di HP $\rightarrow$ 2 kolom di tablet $\rightarrow$ 3 kolom di desktop), Dark Mode, serta ikon paus DeepSeek di atas teks DeepSeek pada setiap kartu. |
| `/cv` | `app/cv/page.js` | **Modul B1**: Curriculum Vitae semantik lengkap (`<header>`, `<nav>`, `<figure>`, `<table>`, `<ul>` nested, `<article>`, `<video>`, `<form>` grid 2-kolom, `<footer>`). Mendukung mode gelap (*Dark Mode*). |
| `/landing` | `app/landing/page.js` | **Modul B2**: Landing page produk KasirKu (Header, Hero section responsif, 3 Kartu Fitur, Paket Harga, dan Footer). |

---

## 4. Aset Statis & Dokumentasi
* **Folder `public/`**:
  * `foto.jpg`: Foto profil kandidat (digunakan pada `/cv`).
  * `deepseek-icon.svg`: Ikon paus DeepSeek vektor resolusi tajam (`#4D6BFE`).
  * `deepseek.svg`: Logo DeepSeek utuh (ikon + teks).
  * `perkenalan.mp4`: File video pendukung komponen video CV.
* **Dokumentasi PDF:**
  * `Penjelasan-Halaman-CV.pdf`: Laporan dokumentasi resmi 5 halaman A4 mengenai kode sumber `app/cv/page.js` lengkap dengan analisis semantik dan screenshot tampilan web.
  * `screenshot-desktop.png`: Tangkapan layar utuh resolusi tinggi halaman CV dalam mode gelap.

---

## 5. Konfigurasi Git & Alur Kerja
* **Branch Utama:** `main` (sebelumnya `master`, sudah disinkronkan ke `main`).
* **Remote Repository:** `https://github.com/Bhayu-Satriaa/raincamp`
* **File `.gitignore`:** Diatur untuk mengabaikan folder latihan internal `html-practice/`.
* **Workflow Push:** Setiap ada perubahan fungsional atau dokumentasi, lakukan build check (`npm run build`), commit dengan format semantik (`feat:`, `docs:`), dan push ke `origin main`.
* **Pembuatan PDF & Screenshot:** Menggunakan Microsoft Edge headless (`--headless=new`) via PowerShell untuk render HTML ke PDF A4 presisi tanpa header/footer bawaan peramban.
