import { daftarBarang } from "../lib/barang.js";

const getAllItem = daftarBarang.map((b) => b.nama);
console.log(getAllItem);

const almostOutOfStock = daftarBarang.filter((b) => b.stok < 10);
console.log(almostOutOfStock);

console.log(daftarBarang.find((b) => b.id === 4));

console.log(daftarBarang.some((b) => b.harga > 5000));

const countStock = daftarBarang.reduce((t, b) => t + b.harga * b.stok, 0)
console.log(countStock);

const termurah = [...daftarBarang].sort((a, b) => a.harga - b.harga).slice(0, 3);
console.log(termurah.map((b) => `${b.nama} ${b.harga}`));

const perKategori = daftarBarang.reduce((hasil, b) => {
    hasil[b.kategori] = (hasil[b.kategori] ?? 0) + 1;
    return hasil;
}, {});
console.log(perKategori);


