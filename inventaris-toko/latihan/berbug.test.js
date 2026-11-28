import { describe, it, expect } from "vitest";
import { hitungSubtotal, gratisOngkir, rataRataHarga, urutkanTermurah, cariKode } from "./berbug";

describe("Latihan Berburu 5 Bug", () => {
  it("1a. hitungSubtotal menjumlah harga × jumlah untuk beberapa barang", () => {
    const item = [
      { nama: "Buku", harga: 5000, jumlah: 2 },
      { nama: "Spidol", harga: 9000, jumlah: 2 },
    ];
    expect(hitungSubtotal(item)).toBe(28000);
  });

  it("1b. hitungSubtotal pada keranjang kosong mengembalikan 0", () => {
    expect(hitungSubtotal([])).toBe(0);
  });

  it.each([
    [149999, false],
    [150000, true],
    [200000, true],
  ])("2. gratisOngkir(%i) menghasilkan %s", (subtotal, hasil) => {
    expect(gratisOngkir(subtotal)).toBe(hasil);
  });

  it("3a. rataRataHarga menghitung rata-rata harga dengan benar", () => {
    expect(rataRataHarga([{ harga: 4000 }, { harga: 6000 }])).toBe(5000);
  });

  it("3b. rataRataHarga mengembalikan 0 bila daftar kosong (bukan NaN)", () => {
    expect(rataRataHarga([])).toBe(0);
  });

  it("4a. urutkanTermurah mengurutkan barang dari harga terendah", () => {
    const hasil = urutkanTermurah([{ harga: 9000 }, { harga: 3000 }, { harga: 5000 }]);
    expect(hasil.map((b) => b.harga)).toEqual([3000, 5000, 9000]);
  });

  it("4b. urutkanTermurah tidak mengubah urutan array asli (immutable)", () => {
    const asli = [{ harga: 9000 }, { harga: 3000 }];
    urutkanTermurah(asli);
    expect(asli.map((b) => b.harga)).toEqual([9000, 3000]);
  });

  it("5a. cariKode menemukan barang walau masukan berhuruf kecil dan berspasi", () => {
    const daftar = [{ kode: "ATK-001", nama: "Buku Tulis" }];
    expect(cariKode(daftar, " atk-001 ")).toEqual({ kode: "ATK-001", nama: "Buku Tulis" });
  });

  it("5b. cariKode mengembalikan null bila kode tidak ditemukan", () => {
    expect(cariKode([{ kode: "ATK-001" }], "MKN-999")).toBeNull();
  });
});
