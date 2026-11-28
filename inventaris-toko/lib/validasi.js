/**
 * Memeriksa keabsahan data isian barang secara manual dan mengembalikan pesan galat per kolom.
 * @param {Object} data Objek isian formulir barang
 * @param {Object[]} [daftar=[]] Daftar barang saat ini untuk pengecekan kode kembar
 * @param {number | null} [idSedangDiedit=null] ID barang yang sedang diedit agar kodenya sendiri diizinkan
 * @returns {Record<string, string>} Objek pesan galat per nama kolom (kosong bila valid)
 */
export function validasiBarang(data, daftar = [], idSedangDiedit = null) {
  const galat = {};
  const kode = String(data.kode ?? "").trim();
  const nama = String(data.nama ?? "").trim();

  if (!kode) galat.kode = "Kode wajib diisi.";
  else if (!/^[A-Z]{3}-\d{3}$/.test(kode))
    galat.kode = "Format kode: 3 huruf besar, tanda hubung, 3 angka. Contoh ATK-004.";
  else if (daftar.some((b) => b.kode === kode && b.id !== idSedangDiedit))
    galat.kode = "Kode sudah dipakai barang lain.";

  if (!nama) galat.nama = "Nama wajib diisi.";
  else if (nama.length < 3) galat.nama = "Nama minimal 3 karakter";

  if (!data.kategori) galat.kategori = "Pilih kategori.";

  const harga = Number(data.harga);
  if (data.harga === "" || data.harga === null || data.harga === undefined) galat.harga = "Harga wajib diisi.";
  else if (!Number.isInteger(harga) || harga <= 0) galat.harga = "Harga harus bilangan bulat lebih dari 0.";

  const stok = Number(data.stok);
  if (data.stok === "" || data.stok === null || data.stok === undefined) galat.stok = "Stok wajib diisi";
  else if (!Number.isInteger(stok) || stok < 0) galat.stok = "Stok harus bilangan bulat 0 atau lebih.";

  if (!String(data.satuan ?? "").trim()) galat.satuan = "Satuan wajib diisi.";

  return galat;
}

/**
 * Mengecek apakah objek hasil validasi mengandung setidaknya satu pesan galat.
 * @param {Record<string, string>} galat Objek galat hasil validasiBarang
 * @returns {boolean} Bernilai true jika ada galat, false jika bersih
 */
export function adaGalat(galat) {
  return Object.keys(galat).length > 0;
}
