import { describe, it, expect } from "vitest";
import { skemaBarang, buatSkemaPembayaran, galatPerKolom } from "@/lib/skema";

const BARANG_VALID = {
  kode: " ATK-005 ",
  nama: " Buku Gambar ",
  kategori: "Alat Tulis",
  harga: "12000",
  stok: "10",
  satuan: " pcs ",
};

describe("skemaBarang", () => {
  it("meloloskan data valid, memangkas spasi, dan mengubah teks angka menjadi number", () => {
    const hasil = skemaBarang.safeParse(BARANG_VALID);
    expect(hasil.success).toBe(true);
    expect(hasil.data).toEqual({
      kode: "ATK-005",
      nama: "Buku Gambar",
      kategori: "Alat Tulis",
      harga: 12000,
      stok: 10,
      satuan: "pcs",
    });
    expect(galatPerKolom(hasil)).toEqual({});
  });

  it.each([
    ["", "Kode wajib diisi."],
    ["atk-005", "Format kode"],
    ["ATK005", "Format kode"],
  ])("menolak kode %j dengan pesan %s", (kode, pesan) => {
    const galat = galatPerKolom(skemaBarang.safeParse({ ...BARANG_VALID, kode }));
    expect(galat.kode).toContain(pesan);
  });

  it("menolak nama kurang dari 3 karakter", () => {
    const galat = galatPerKolom(skemaBarang.safeParse({ ...BARANG_VALID, nama: "Ab" }));
    expect(galat.nama).toContain("minimal 3");
  });

  it("menolak kategori di luar daftar KATEGORI", () => {
    const galat = galatPerKolom(skemaBarang.safeParse({ ...BARANG_VALID, kategori: "Elektronik" }));
    expect(galat.kategori).toBe("Pilih kategori.");
  });

  it.each([
    [0, "lebih dari 0"],
    [-5000, "lebih dari 0"],
    [2500.5, "bilangan bulat"],
  ])("menolak harga %s karena harus %s", (harga, pesan) => {
    const galat = galatPerKolom(skemaBarang.safeParse({ ...BARANG_VALID, harga }));
    expect(galat.harga).toContain(pesan);
  });

  it("menerima stok 0 tetapi menolak stok negatif", () => {
    expect(skemaBarang.safeParse({ ...BARANG_VALID, stok: 0 }).success).toBe(true);
    const galat = galatPerKolom(skemaBarang.safeParse({ ...BARANG_VALID, stok: -1 }));
    expect(galat.stok).toBe("Stok tidak boleh negatif.");
  });

  it("menolak satuan kosong", () => {
    const galat = galatPerKolom(skemaBarang.safeParse({ ...BARANG_VALID, satuan: "   " }));
    expect(galat.satuan).toBe("Satuan wajib diisi.");
  });
});

describe("buatSkemaPembayaran", () => {
  const skema = buatSkemaPembayaran(58500);

  it("meloloskan pembayaran tunai tepat sebesar total (nilai batas Rp 58.500)", () => {
    const hasil = skema.safeParse({ pelanggan: " Budi ", metode: "tunai", bayar: "58500" });
    expect(hasil.success).toBe(true);
    expect(hasil.data).toEqual({ pelanggan: "Budi", metode: "tunai", bayar: 58500 });
  });

  it("menolak uang tunai kurang Rp 1 dari total (Rp 58.499 vs Rp 58.500)", () => {
    const hasil = skema.safeParse({ pelanggan: "", metode: "tunai", bayar: 58499 });
    expect(hasil.success).toBe(false);
    expect(galatPerKolom(hasil)).toEqual({ bayar: "Uang yang dibayar kurang dari total." });
  });

  it("meloloskan pembayaran QRIS walau kolom bayar 0", () => {
    const hasil = skema.safeParse({ pelanggan: "", metode: "qris", bayar: 0 });
    expect(hasil.success).toBe(true);
  });

  it("menolak nama pelanggan lebih dari 50 karakter", () => {
    const hasil = skema.safeParse({ pelanggan: "A".repeat(51), metode: "qris", bayar: 0 });
    expect(galatPerKolom(hasil).pelanggan).toContain("maksimal 50");
  });
});
