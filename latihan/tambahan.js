import { daftarBarang } from "../lib/barang.js";
import { formatRupiah } from "../lib/format.js";

console.log("Variabel, Tipe Data & Operator ")
console.log(typeof "Halo");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof [1, 2, 3]);
console.log(typeof null);

console.log("\ Percabangan & Perulangan");
for (let i = 1; i <= 30; i++) {
    if (i % 15 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

console.log("\n Arrow Function Satu Baris");
const luasLingkaran = (r) => Math.PI * r * r;
const celsiusKeFahrenheit = (c) => (c * 9) / 5 + 32;
const ganjil = (n) => n % 2 !== 0;

console.log("Luas lingkaran (r = 7):", Math.round(luasLingkaran(7) * 100) / 100);
console.log("30°C ke Fahrenheit:", celsiusKeFahrenheit(30));
console.log("Apakah 7 ganjil?:", ganjil(7));
console.log("Apakah 8 ganjil?:", ganjil(8));


console.log("\n Array, Objek & Template Literal");
const daftarRingkas = daftarBarang.map(
    (b) => `${b.nama}: ${formatRupiah(b.harga)} (stok ${b.stok})`
);
daftarRingkas.forEach((baris) => console.log(baris));