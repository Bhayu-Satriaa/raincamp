import { daftarMahasiswa } from "../lib/nilai.js";
import * as H from "../lib/hitung.js";

// 1. Lengkapi data mahasiswa dengan nilai akhir, huruf, dan status
const data = H.lengkapiNilai(daftarMahasiswa);

// 2. Tampilkan ringkasan statistik
console.log(H.statistik(data));

// 3. Tampilkan 3 mahasiswa peringkat teratas
console.log(H.peringkat(data, 3).map((m) => `${m.nama} ${m.akhir}`));

// 4. Tampilkan sebaran distribusi huruf mutu
console.log(H.distribusiHuruf(data));

// 5. Uji pencarian NIM
console.log(H.cariNim(data, "2401008")?.akhir, H.cariNim(data, "9999"));

// 6. Rata-rata per prodi
const prodiList = ["Informatika", "Sistem Informasi"];
for (const p of prodiList) {
    const nilaiProdi = H.ambilKolom(H.filterProdi(data, p), "akhir");
    console.log(`Rata-rata ${p}: ${H.rataRata(nilaiProdi)}`);
}
