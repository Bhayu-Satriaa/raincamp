# Pohon Komponen — Inventaris Toko (Pertemuan 4)

Dokumen ini memetakan dekomposisi hierarki komponen (*Component Tree*) aplikasi Inventaris Toko beserta aliran data (*props flow*).

```mermaid
flowchart TD
  B["Beranda · app/page.js"] --> N["Navbar · namaToko"]
  B --> S1["KartuStatistik · Jenis Barang"]
  B --> S2["KartuStatistik · Nilai Persediaan"]
  B --> S3["KartuStatistik · Stok Menipis (peringatan)"]
  B --> S4["KartuStatistik · Stok Habis (peringatan)"]
  B --> G0["Bagian · id: ringkasan, children"]
  G0 --> RK["RingkasanKategori · data"]
  B --> G1["Bagian · id: katalog, children"]
  G1 --> KB["KartuBarang ×12 · barang"]
  KB --> LS1["LabelStok · stok"]
  B --> G2["Bagian · id: tabel, children"]
  G2 --> T["TabelData · kolom, data"]
  T --> LS2["LabelStok · stok"]
  B --> F["Footer · namaToko, tahun"]
```

## Daftar Komponen & Peran
1. **`Navbar`**: Menampilkan nama toko berikon dan tautan navigasi anchor ke bagian halaman (`#katalog`, `#ringkasan`, `#tabel`, `#tentang`).
2. **`KartuStatistik`**: Kartu metrik responsif (grid 2/4 kolom) dengan penanda border kuning jika terdapat kondisi peringatan (*alert warning*).
3. **`RingkasanKategori`**: Komponen analitik penampil jumlah jenis barang, total unit, dan estimasi modal per kategori.
4. **`Bagian`**: Wrapper semantik (`<section>`) yang memanfaatkan `children` untuk merangkum konten dinamis.
5. **`KartuBarang`**: Kartu produk individual dengan deteksi stok habis (efek pudar `opacity-60`), formatting Rupiah, dan status stok.
6. **`LabelStok`**: Badge bersyarat 3 warna (*emerald* untuk tersedia, *amber* untuk menipis < 10, *red* untuk stok 0).
7. **`TabelData`**: Komponen tabel serbaguna berbasis mapping deklaratif kolom dan format tampilan dinamis.
8. **`Tombol`**: Komponen tombol serbaguna dengan dukungan 4 varian gaya (`utama`, `garis`, `bahaya`, `netral`), ikon `lucide-react`, dan rest props `...sisa`.
9. **`Footer`**: Penutup halaman dengan hak cipta dan tahun dinamis.
