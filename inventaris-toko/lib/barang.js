import { BATAS_MENIPIS } from "./data-barang";

/**
 * Menentukan status ketersediaan stok barang.
 * @param {number} stok Jumlah unit stok saat ini
 * @param {number} [batas=BATAS_MENIPIS] Ambang batas stok dikatakan menipis
 * @returns {"habis" | "menipis" | "tersedia"} Status stok barang
 */
export function statusStok(stok, batas = BATAS_MENIPIS) {
  if (stok === 0) return "habis";
  if (stok < batas) return "menipis";
  return "tersedia";
}

/**
 * Mengelompokkan daftar barang ke dalam objek berdasarkan nama kategorinya.
 * @param {Object[]} daftar Daftar objek barang
 * @returns {Record<string, Object[]>} Objek pasangan kategori dan array barangnya
 */
export function kelompokkanPerKategori(daftar) {
  return daftar.reduce((hasil, b) => {
    hasil[b.kategori] = [...(hasil[b.kategori] ?? []), b];
    return hasil;
  }, {});
}

/**
 * Menghitung ringkasan persediaan: total jenis, total unit, nilai rupiah, stok habis, dan stok menipis.
 * @param {Object[]} daftar Daftar objek barang
 * @returns {{ jumlahJenis: number, totalUnit: number, nilaiPersediaan: number, habis: number, menipis: number }} Objek metrik ringkasan stok
 */
export function ringkasanStok(daftar) {
  return {
    jumlahJenis: daftar.length,
    totalUnit: daftar.reduce((t, b) => t + b.stok, 0),
    nilaiPersediaan: daftar.reduce((t, b) => t + b.harga * b.stok, 0),
    habis: daftar.filter((b) => statusStok(b.stok) === "habis").length,
    menipis: daftar.filter((b) => statusStok(b.stok) === "menipis").length,
  };
}

/**
 * Merapikan spasi teks dan mengonversi harga serta stok menjadi angka.
 * @param {Object} data Data mentah isian formulir barang
 * @returns {{ kode: string, nama: string, kategori: string, harga: number, stok: number, satuan: string }} Objek barang yang sudah bersih
 */
export function rapikanBarang(data) {
  return {
    kode: data.kode.trim(),
    nama: data.nama.trim(),
    kategori: data.kategori,
    harga: Number(data.harga),
    stok: Number(data.stok),
    satuan: data.satuan.trim(),
  };
}

/**
 * Menambahkan barang baru dengan ID berurut tanpa mengubah array asal.
 * @param {Object[]} daftar Daftar barang saat ini
 * @param {Object} data Data barang baru
 * @returns {Object[]} Array daftar barang baru
 */
export function tambahBarang(daftar, data) {
  const idBaru = daftar.length === 0 ? 1 : Math.max(...daftar.map((b) => b.id)) + 1;
  return [...daftar, { id: idBaru, ...rapikanBarang(data) }];
}

/**
 * Memperbarui data barang berdasarkan ID tanpa memutasi array asal.
 * @param {Object[]} daftar Daftar barang saat ini
 * @param {number} id ID barang yang akan diubah
 * @param {Object} data Data pengganti barang
 * @returns {Object[]} Array daftar barang baru
 */
export function ubahBarang(daftar, id, data) {
  return daftar.map((b) => (b.id === id ? { ...b, ...rapikanBarang(data) } : b));
}

/**
 * Menghapus satu barang berdasarkan ID tanpa memutasi array asal.
 * @param {Object[]} daftar Daftar barang saat ini
 * @param {number} id ID barang yang akan dihapus
 * @returns {Object[]} Array daftar barang baru tanpa barang tersebut
 */
export function hapusBarang(daftar, id) {
  return daftar.filter((b) => b.id !== id);
}
