/**
 * Memformat angka menjadi teks mata uang Rupiah (IDR) tanpa desimal.
 * @param {number} n Nilai angka dalam rupiah
 * @returns {string} Teks terformat, misalnya "Rp 15.000"
 * @example formatRupiah(15000); // "Rp 15.000"
 */
export function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}
