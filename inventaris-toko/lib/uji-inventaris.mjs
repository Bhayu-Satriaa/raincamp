import { daftarBarang } from "./data-barang.js";
import { ringkasanStok, kelompokkanPerKategori } from "./barang.js";
import { formatRupiah } from "./format.js";

const ringkas = ringkasanStok(daftarBarang);
console.log("=== PENGUJIAN INVENTARIS TOKO (P04) ===");
console.log("Jumlah Jenis:", ringkas.jumlahJenis, ringkas.jumlahJenis === 12 ? "✓ PAS" : "✗ GAGAL");
console.log("Total Unit:", ringkas.totalUnit);
console.log("Nilai Persediaan:", formatRupiah(ringkas.nilaiPersediaan), ringkas.nilaiPersediaan === 2425000 ? "✓ PAS" : "✗ GAGAL");
console.log("Stok Menipis:", ringkas.menipis, ringkas.menipis === 3 ? "✓ PAS" : "✗ GAGAL");
console.log("Stok Habis:", ringkas.habis, ringkas.habis === 2 ? "✓ PAS" : "✗ GAGAL");

const perKategori = kelompokkanPerKategori(daftarBarang);
console.log("\nKategori:");
for (const [kat, items] of Object.entries(perKategori)) {
  console.log(`- ${kat}: ${items.length} item`);
}
