// ==============================================================================
// PRAKTIK A1: Tinjauan Cepat di Terminal
// File: latihan/dasar.mjs
// Jalankan: node latihan/dasar.mjs
// ==============================================================================

// 1. Variabel & Operator Aritmatika
const nama = "Ani";
let nilai = 72;
nilai += 5; // nilai sekarang 77

// 2. Ternary Operator (mirip di PHP: $kondisi ? $benar : $salah)
const status = nilai >= 75 ? "Lulus" : "Remedial";

// 3. Template Literal (Interpolasi string dengan backtick)
console.log(`${nama}: ${nilai} (${status})`);


// 4. Fungsi & Percabangan (Versi Arrow Function sesuai modifikasi)
const hurufMutu = (n) => {
  if (n >= 85) return "A";
  if (n >= 75) return "B";
  if (n >= 65) return "C";
  if (n >= 50) return "D";
  return "E";
};

// 5. Arrow Function dengan Default Parameter
const lulus = (n, batas = 65) => n >= batas;


// 6. Perulangan for...of (Mirip foreach ($array as $n) di PHP)
console.log("\n--- Hasil Nilai & Huruf Mutu ---");
for (const n of [90, 77, 64, 40]) {
  console.log(n, hurufMutu(n), "Lulus?", lulus(n));
}


// 7. Perbedaan Krusial: Logical OR (||) vs Nullish Coalescing (??)
const stok = 0;
console.log("\n--- Perbandingan || vs ?? ---");
console.log("Menggunakan || :", stok || "kosong"); // 0 dianggap falsy -> cetak "kosong" (bisa jadi BUG!)
console.log("Menggunakan ?? :", stok ?? "kosong"); // 0 bukan null/undefined -> cetak 0 (benar)
