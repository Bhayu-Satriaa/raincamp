import { daftarMahasiswa } from "../lib/nilai.js";
import * as H from "../lib/hitung.js";

const data = H.lengkapiNilai(daftarMahasiswa);

console.log(H.statistik(data));

console.log(H.peringkat(data, 3).map((m) => `${m.nama} ${m.akhir}`));

console.log(H.distribusiHuruf(data));

console.log(H.cariNim(data, "2401008")?.akhir, H.cariNim(data, "9999"));

const prodiList = ["Informatika", "Sistem Informasi"];
for (const p of prodiList) {
    const nilaiProdi = H.ambilKolom(H.filterProdi(data, p), "akhir");
    console.log(`Rata-rata ${p}: ${H.rataRata(nilaiProdi)}`);
}
