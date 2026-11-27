import { terapkanKueri } from "../lib/kueri.js";
import { daftarBarang as d } from "../lib/data-barang.js";

const ringkas = (r) => [
    r.total,
    r.totalHalaman,
    r.halaman,
    r.data.map((b) => b.nama).join(", "),
];

console.log(ringkas(terapkanKueri(d)));
console.log(ringkas(terapkanKueri(d, { halaman: 3 })));
console.log(ringkas(terapkanKueri(d, { kata: "SABUN" })));
console.log(
    ringkas(terapkanKueri(d, { kategori: "Minuman", urut: "harga-turun" }))
);
console.log(ringkas(terapkanKueri(d, { halaman: 9 })));