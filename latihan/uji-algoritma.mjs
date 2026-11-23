import {
    linearSearch,
    binarySearch,
    bubbleSort,
    selectionSort,
    insertionSort,
    urutkanBerdasarkan,
} from "../lib/algoritma.js";

const dataAcak = [29, 10, 14, 37, 13];

console.log("--- BUBBLE SORT ---")
console.log(bubbleSort(dataAcak))

console.log("--- SELECTION SORT ---")
console.log(selectionSort(dataAcak))

console.log("--- INSERTION SORT ---")
console.log(insertionSort(dataAcak))

const dataTerurut = [3, 8, 12, 19, 25, 31, 42, 56, 67, 78, 85, 91, 99];

console.log("--- BINARY SEARCH (Cari 85) ---");
console.log(binarySearch(dataTerurut, 85));

console.log("--- LINEAR SEARCH (Cari 85) ---");
console.log(linearSearch(dataTerurut, 85));

const produk = [
    { nama: "Sepatu", harga: 150000 },
    { nama: "Kaos", harga: 75000 },
    { nama: "Jaket", harga: 220000 },
];

console.log("--- URUTKAN OBJEK (Termurah ke Termahal) ---");
console.log(urutkanBerdasarkan(produk, "harga", "asc"));