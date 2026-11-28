# Dokumen Pengujian Unit & Debugging — Inventaris Toko Maju Jaya

- **Unit Kompetensi SKKNI:**
  - `J.620100.033.02` — Melaksanakan Pengujian Unit Program
  - `J.620100.023.02` — Membuat Dokumen Kode Program
  - `J.620100.025.02` — Melakukan Debugging
- **Alat Uji:** Vitest v5.1.2, jsdom, React Testing Library, `@testing-library/user-event`, `@vitest/coverage-v8`, ESLint (`eslint-plugin-jsdoc`), Prettier.

---

## 1. Tabel Skenario Uji (33 Skenario Representatif untuk Asesor)

Keterangan kolom **Jenis**: **N** = Normal · **B** = Nilai Batas (_Boundary_) · **S** = Masukan Salah (_Invalid_) · **R** = Regresi.

| ID    | Fungsi / Komponen           | Skenario                                              | Jenis | Masukan                                                   | Hasil yang Diharapkan                                                                     | Hasil Aktual | Status |
| :---- | :-------------------------- | :---------------------------------------------------- | :---: | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :----------- | :----: |
| UJ-01 | `statusStok`                | Stok normal melimpah                                  |   N   | `48`                                                      | `"tersedia"`                                                                              | `"tersedia"` | Lolos  |
| UJ-02 | `statusStok`                | Stok habis tepat 0                                    |   B   | `0`                                                       | `"habis"`                                                                                 | `"habis"`    | Lolos  |
| UJ-03 | `statusStok`                | Tepat di atas habis                                   |   B   | `1`                                                       | `"menipis"`                                                                               | `"menipis"`  | Lolos  |
| UJ-04 | `statusStok`                | Tepat di bawah ambang menipis                         |   B   | `9`                                                       | `"menipis"`                                                                               | `"menipis"`  | Lolos  |
| UJ-05 | `statusStok`                | Tepat di ambang tersedia                              |   B   | `10`                                                      | `"tersedia"`                                                                              | `"tersedia"` | Lolos  |
| UJ-06 | `ringkasanStok`             | Ringkasan 12 barang awal                              |   N   | `daftarBarang` (12 item)                                  | `jumlahJenis: 12`, `totalUnit: 547`, `nilaiPersediaan: 2425000`, `habis: 2`, `menipis: 3` | sesuai       | Lolos  |
| UJ-07 | `persenDiskon`              | Belanja belum mencapai ambang                         |   N   | `0`                                                       | `0` (0%)                                                                                  | `0`          | Lolos  |
| UJ-08 | `persenDiskon`              | Tepat Rp 1 di bawah ambang 5%                         |   B   | `49999`                                                   | `0` (0%)                                                                                  | `0`          | Lolos  |
| UJ-09 | `persenDiskon`              | Tepat di ambang 5%                                    |   B   | `50000`                                                   | `5` (5%)                                                                                  | `5`          | Lolos  |
| UJ-10 | `persenDiskon`              | Tepat Rp 1 di bawah ambang 10%                        |   B   | `99999`                                                   | `5` (5%)                                                                                  | `5`          | Lolos  |
| UJ-11 | `persenDiskon`              | Tepat di ambang 10%                                   |   B   | `100000`                                                  | `10` (10%)                                                                                | `10`         | Lolos  |
| UJ-12 | `persenDiskon`              | Tepat di ambang tertinggi 15%                         |   B   | `200000`                                                  | `15` (15%)                                                                                | `15`         | Lolos  |
| UJ-13 | `hitungRingkasan`           | 14 sabun + 2 air mineral                              |   N   | `[{harga:15000,jumlah:14},{harga:4000,jumlah:2}]`         | `subtotal: 218000, persen: 15, diskon: 32700, total: 185300`                              | sesuai       | Lolos  |
| UJ-14 | `keranjangReducer`          | Tambah barang yang stoknya 0                          |   B   | `{ type: "tambah", barang: Pensil2B(stok:0) }`            | Diabaikan (`item: []`)                                                                    | sesuai       | Lolos  |
| UJ-15 | `keranjangReducer`          | Ubah jumlah melebihi stok barang                      |   B   | `Pasta Gigi (stok 3)`, `jumlah: 99`                       | Jumlah tertahan di `3`                                                                    | `3`          | Lolos  |
| UJ-16 | `keranjangReducer`          | Ubah jumlah menjadi 0 / negatif / teks                |   S   | `jumlah: 0`, `-3`, `"abc"`                                | Baris barang dihapus dari keranjang                                                       | sesuai       | Lolos  |
| UJ-17 | `keranjangReducer`          | Tipe aksi tidak dikenal                               |   S   | `{ type: "aneh" }`                                        | Melempar `Error("Aksi tidak dikenal: aneh")`                                              | sesuai       | Lolos  |
| UJ-18 | `buatSkemaPembayaran`       | Tunai tepat sebesar total                             |   B   | `total: 58500, bayar: 58500`                              | Valid (`success: true`)                                                                   | sesuai       | Lolos  |
| UJ-19 | `buatSkemaPembayaran`       | Uang kurang Rp 1                                      |   B   | `total: 58500, bayar: 58499`                              | `"Uang yang dibayar kurang dari total."`                                                  | sesuai       | Lolos  |
| UJ-20 | `buatSkemaPembayaran`       | Metode QRIS dengan bayar 0                            |   N   | `metode: "qris", bayar: 0`                                | Valid (`success: true`)                                                                   | sesuai       | Lolos  |
| UJ-21 | `skemaBarang`               | Format kode salah (huruf kecil / tanpa `-`)           |   S   | `kode: "atk-005"` / `"ATK005"`                            | Pesan galat format kode `AAA-999`                                                         | sesuai       | Lolos  |
| UJ-22 | `skemaBarang`               | Harga 0, negatif, atau desimal                        |   S   | `harga: 0`, `-5000`, `2500.5`                             | Ditolak dengan pesan bilangan bulat > 0                                                   | sesuai       | Lolos  |
| UJ-23 | `validasiBarang`            | Kode kembar vs kode milik barang yang diedit          |   B   | `kode: "ATK-001"`, `idSedangDiedit: null` vs `1`          | Ditolak untuk barang baru; diizinkan saat edit `id: 1`                                    | sesuai       | Lolos  |
| UJ-24 | `terapkanKueri`             | Pencarian kata tak peka huruf + trim spasi            |   N   | `{ kata: "  SABUN  " }`                                   | Menemukan 2 barang (_Sabun Cuci Piring_, _Sabun Mandi_)                                   | sesuai       | Lolos  |
| UJ-25 | `terapkanKueri`             | Urut harga termurah & stok paling sedikit             |   N   | `urut: "harga-naik"` / `"stok-naik"`                      | Harga awal `2000`; stok awal `0`                                                          | sesuai       | Lolos  |
| UJ-26 | `terapkanKueri`             | Nomor halaman melampaui batas maksimum                |   B   | `halaman: 99, perHalaman: 5` (total 12)                   | Dikepit otomatis ke `halaman: 3`                                                          | `3`          | Lolos  |
| UJ-27 | `binarySearch`              | Cari angka 85 di array terurut vs `linearSearch`      |   N   | `TERURUT` (12 item), target `85`                          | `indeks: 10` dalam `3` langkah (`linearSearch`: `11` langkah)                             | sesuai       | Lolos  |
| UJ-28 | `bubbleSort`                | Optimasi berhenti dini pada array sudah urut          |   B   | `[10, 13, 14, 29, 37]`                                    | Berhenti dalam `4` perbandingan tanpa mutasi                                              | sesuai       | Lolos  |
| UJ-29 | `useDebounce`               | Ketikan cepat membatalkan timer lama                  |   N   | Ketik `"sa"` (200ms) lalu `"sab"` (300ms)                 | Nilai baru berubah ke `"sab"` setelah jeda penuh 300ms                                    | sesuai       | Lolos  |
| UJ-30 | `Paginasi`                  | Navigasi di halaman pertama & terakhir                |   B   | `halaman: 1, totalHalaman: 3`                             | Tombol `Sebelumnya` `disabled`, halaman `1` `aria-current="page"`                         | sesuai       | Lolos  |
| UJ-31 | `FormPembayaran`            | Submit tunai kurang dari total tagihan                |   S   | `total: 58500`, ketik `"50000"`, klik `Bayar`             | Pesan galat muncul, `aria-invalid="true"`, `onBayar` tidak dipanggil                      | sesuai       | Lolos  |
| UJ-32 | `PilihBarang` + `Keranjang` | Tambah barang hingga stok habis                       |   B   | Klik tambah `Pasta Gigi` (stok 3) 3 kali                  | Sisa stok `0`, tombol tambah menjadi `disabled`                                           | sesuai       | Lolos  |
| UJ-33 | `Keranjang` (kasir)         | Kolom jumlah dikosongkan sementara lalu diketik ulang |   R   | `Backspace` (_clear_), ketik `4` pada _Sabun Cuci Piring_ | Baris tetap ada; jumlah `4`; diskon 5%; total `Rp 57.000`                                 | sesuai       | Lolos  |

---

## 2. Bug yang Ditemukan dan Diperbaiki (Bukti Unit `J.620100.025.02`)

### Bug Utama Produksi — Baris Barang Hilang Saat Menekan _Backspace_ di Kasir

- **Lokasi:** `components/kasir/Keranjang.js`
- **Gejala:** Ketika kasir menghapus angka jumlah di keranjang dengan tombol _Backspace_ untuk mengetik angka baru (misalnya ingin mengganti `1` menjadi `4`), baris barang tersebut justru langsung terhapus dari keranjang.
- **Cara Ditemukan:** Pengujian komponen otomatis menggunakan `@testing-library/user-event` (`await user.clear(inputJumlah)` diikuti `await user.type(inputJumlah, "4")`). Pada pengujian manual sebelumnya bug ini tidak terlihat karena angka diganti dengan blok/timpa sekaligus tanpa melewati string kosong `""`.
- **Penyebab:** Elemen `<input type="number">` mengirim setiap perubahan `e.target.value` langsung ke `ubahJumlah(i.id, e.target.value)`. Saat input kosong (`""`), `Number("")` bernilai `0`, dan aturan `keranjangReducer` menganggap `jumlah <= 0` sebagai perintah menghapus item.
- **Perbaikan:** Mengekstrak komponen `InputJumlah` dengan state lokal `teks`. Jika `nilai === ""`, state lokal diset ke `""` tanpa memanggil reducer; saat angka valid diketik barulah dikirim ke `onUbah`, dan `onBlur` mengembalikan `setTeks(null)` sehingga angka kembali ke jumlah terakhir di keranjang bila dibiarkan kosong.
- **Test Pengaman (Regresi):** Skenario **`UJ-33`** di `__tests__/komponen.test.jsx`.

### Ringkasan 5 Bug Latihan Diagnostik (`latihan/berbug.js` & `latihan/berbug.test.js`)

1. `hitungSubtotal`: `.reduce()` tanpa nilai awal `0` menyebabkan akumulator diawali objek pertama (`"[object Object]18000"`) $\rightarrow$ diperbaiki dengan argumen kedua `, 0`.
2. `gratisOngkir`: kesalahan operator nilai batas `subtotal > 150000` menolak belanja tepat `Rp 150.000` $\rightarrow$ diperbaiki menjadi `subtotal >= 150000`.
3. `rataRataHarga`: pembagian `0 / 0` menghasilkan `NaN` saat daftar kosong $\rightarrow$ ditambahkan penjaga `if (daftar.length === 0) return 0;`.
4. `urutkanTermurah`: pemanggilan `daftar.sort(...)` langsung memutasi array argumen $\rightarrow$ disalin lebih dulu dengan `[...daftar].sort(...)`.
5. `cariKode`: pencocokan peka huruf besar/kecil dan spasi tepi $\rightarrow$ dinormalisasi dengan `.trim().toUpperCase()`.

---

## 3. Ringkasan Eksekusi Pengujian & Coverage (`v8`)

### Ringkasan Berkas Test (`npm run test:run`)

| Berkas Test                   | Jumlah Test |     Status     |
| :---------------------------- | :---------: | :------------: |
| `__tests__/keranjang.test.js` |     34      |     Lolos      |
| `__tests__/algoritma.test.js` |     19      |     Lolos      |
| `__tests__/barang.test.js`    |     19      |     Lolos      |
| `__tests__/komponen.test.jsx` |     16      |     Lolos      |
| `__tests__/skema.test.js`     |     15      |     Lolos      |
| `__tests__/kueri.test.js`     |     13      |     Lolos      |
| `latihan/berbug.test.js`      |     11      |     Lolos      |
| `__tests__/hook.test.js`      |      4      |     Lolos      |
| **Total (8 Berkas)**          |   **131**   | **100% Lolos** |

### Ringkasan Cakupan Kode Pustaka `lib/` (`npm run coverage`)

| Folder / Berkas                               | % Stmts  |  % Branch  | % Funcs  | % Lines  |
| :-------------------------------------------- | :------: | :--------: | :------: | :------: |
| **`lib/` (Keseluruhan — Target $\ge$ 90%)**   | **100%** | **99.19%** | **100%** | **100%** |
| `lib/algoritma.js`                            |   100%   |    100%    |   100%   |   100%   |
| `lib/barang.js`                               |   100%   |    100%    |   100%   |   100%   |
| `lib/data-barang.js`                          |   100%   |    100%    |   100%   |   100%   |
| `lib/format.js`                               |   100%   |    100%    |   100%   |   100%   |
| `lib/keranjang.js`                            |   100%   |    96%     |   100%   |   100%   |
| `lib/kueri.js`                                |   100%   |    100%    |   100%   |   100%   |
| `lib/skema.js`                                |   100%   |    100%    |   100%   |   100%   |
| `lib/validasi.js`                             |   100%   |    100%    |   100%   |   100%   |
| `context/KeranjangContext.js`                 |   95%    |    100%    |  87.5%   |   100%   |
| `hooks/useDebounce.js` & `useLocalStorage.js` |   100%   |    100%    |   100%   |   100%   |
