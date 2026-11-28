// Perbaikan 5 bug klasik hasil reproduksi unit test:

// 1. Menambahkan nilai awal 0 pada .reduce() agar akumulator tidak dimulai dari objek pertama
export function hitungSubtotal(item) {
  return item.reduce((total, i) => total + i.harga * i.jumlah, 0);
}

// 2. Menggunakan operator >= (bukan >) agar nilai batas tepat Rp 150.000 tetap mendapat gratis ongkir
export function gratisOngkir(subtotal) {
  return subtotal >= 150000;
}

// 3. Menangani pembagian dengan 0 saat daftar kosong agar tidak menghasilkan NaN
export function rataRataHarga(daftar) {
  if (daftar.length === 0) return 0;
  const total = daftar.reduce((t, b) => t + b.harga, 0);
  return total / daftar.length;
}

// 4. Menyalin array terlebih dahulu ([...daftar]) karena .sort() memutasi array secara langsung
export function urutkanTermurah(daftar) {
  return [...daftar].sort((a, b) => a.harga - b.harga);
}

// 5. Menormalisasi spasi tepi dan huruf besar/kecil sebelum mencocokkan kode barang
export function cariKode(daftar, kode) {
  const target = String(kode ?? "")
    .trim()
    .toUpperCase();
  return daftar.find((b) => b.kode.toUpperCase() === target) ?? null;
}
