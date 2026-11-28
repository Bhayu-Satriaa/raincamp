import { describe, it, expect } from "vitest";
import {
  KERANJANG_AWAL,
  keranjangReducer,
  persenDiskon,
  hitungRingkasan,
  kurangiStok,
  menujuDiskonBerikutnya,
} from "@/lib/keranjang";

const SABUN = {
  id: 12,
  kode: "KBR-003",
  nama: "Sabun Cuci Piring",
  kategori: "Kebersihan",
  harga: 15000,
  stok: 22,
  satuan: "botol",
};

const AIR = {
  id: 7,
  kode: "MNM-001",
  nama: "Air Mineral 600 ml",
  kategori: "Minuman",
  harga: 4000,
  stok: 48,
  satuan: "botol",
};

const PASTA = {
  id: 11,
  kode: "KBR-002",
  nama: "Pasta Gigi",
  kategori: "Kebersihan",
  harga: 12000,
  stok: 3,
  satuan: "tube",
};

const HABIS = {
  id: 2,
  kode: "ATK-002",
  nama: "Pensil 2B",
  kategori: "Alat Tulis",
  harga: 3000,
  stok: 0,
  satuan: "pcs",
};

const jalankan = (...aksi) => aksi.reduce(keranjangReducer, KERANJANG_AWAL);

describe("persenDiskon", () => {
  it.each([
    [0, 0],
    [49999, 0],
    [50000, 5],
    [99999, 5],
    [100000, 10],
    [199999, 10],
    [200000, 15],
  ])("subtotal %i mendapat diskon %i%%", (subtotal, persen) => {
    expect(persenDiskon(subtotal)).toBe(persen);
  });
});

describe("keranjangReducer", () => {
  it("tambah barang baru masuk dengan jumlah 1 tanpa menyimpan kategori", () => {
    const hasil = jalankan({ type: "tambah", barang: SABUN });
    expect(hasil.item).toHaveLength(1);
    expect(hasil.item[0]).toMatchObject({ id: 12, nama: "Sabun Cuci Piring", jumlah: 1 });
    expect(hasil.item[0].kategori).toBeUndefined();
  });

  it("tambah barang yang sudah ada menambah jumlahnya +1", () => {
    const hasil = jalankan({ type: "tambah", barang: SABUN }, { type: "tambah", barang: SABUN });
    expect(hasil.item).toHaveLength(1);
    expect(hasil.item[0].jumlah).toBe(2);
  });

  it("mengabaikan tambah bila stok barang 0 (habis)", () => {
    const hasil = jalankan({ type: "tambah", barang: HABIS });
    expect(hasil).toEqual(KERANJANG_AWAL);
  });

  it("tidak melebihi stok maksimum saat ditambah berulang kali", () => {
    const hasil = jalankan(
      { type: "tambah", barang: PASTA },
      { type: "tambah", barang: PASTA },
      { type: "tambah", barang: PASTA },
      { type: "tambah", barang: PASTA },
    );
    expect(hasil.item[0].jumlah).toBe(3);
  });

  it("tambah barang kedua mempertahankan barang pertama", () => {
    const hasil = jalankan({ type: "tambah", barang: SABUN }, { type: "tambah", barang: AIR });
    expect(hasil.item).toHaveLength(2);
    expect(hasil.item.map((i) => i.id)).toEqual([12, 7]);
  });

  it("ubahJumlah memperbarui jumlah barang sasaran tanpa menyentuh barang lain", () => {
    const hasil = jalankan(
      { type: "tambah", barang: SABUN },
      { type: "tambah", barang: AIR },
      { type: "ubahJumlah", id: 12, jumlah: 5 },
    );
    expect(hasil.item.find((i) => i.id === 12).jumlah).toBe(5);
    expect(hasil.item.find((i) => i.id === 7).jumlah).toBe(1);
  });

  it("ubahJumlah membatasi jumlah maksimal sebesar stok barang", () => {
    const hasil = jalankan({ type: "tambah", barang: PASTA }, { type: "ubahJumlah", id: 11, jumlah: 99 });
    expect(hasil.item[0].jumlah).toBe(3);
  });

  it("ubahJumlah membulatkan angka desimal ke bawah", () => {
    const hasil = jalankan({ type: "tambah", barang: SABUN }, { type: "ubahJumlah", id: 12, jumlah: "4.9" });
    expect(hasil.item[0].jumlah).toBe(4);
  });

  it.each([[0], [-3], ["abc"]])("ubahJumlah ke %j menghapus baris dari keranjang", (nilaiTidakValid) => {
    const hasil = jalankan({ type: "tambah", barang: SABUN }, { type: "ubahJumlah", id: 12, jumlah: nilaiTidakValid });
    expect(hasil.item).toHaveLength(0);
  });

  it("hapus mengeluarkan barang sesuai id dan menyisakan barang lain", () => {
    const hasil = jalankan(
      { type: "tambah", barang: SABUN },
      { type: "tambah", barang: AIR },
      { type: "hapus", id: 12 },
    );
    expect(hasil.item).toHaveLength(1);
    expect(hasil.item[0].id).toBe(7);
  });

  it("kosongkan mengembalikan state ke KERANJANG_AWAL", () => {
    const hasil = jalankan({ type: "tambah", barang: SABUN }, { type: "kosongkan" });
    expect(hasil).toEqual(KERANJANG_AWAL);
  });

  it("melempar galat untuk aksi tidak dikenal", () => {
    expect(() => keranjangReducer(KERANJANG_AWAL, { type: "aneh" })).toThrow("Aksi tidak dikenal: aneh");
  });

  it("tidak mengubah state lama (immutable)", () => {
    const lama = jalankan({ type: "tambah", barang: SABUN });
    const salinan = structuredClone(lama);
    keranjangReducer(lama, { type: "tambah", barang: SABUN });
    expect(lama).toEqual(salinan);
  });
});

describe("hitungRingkasan", () => {
  it("keranjang kosong menghasilkan semua nilai 0", () => {
    expect(hitungRingkasan([])).toEqual({
      jumlahUnit: 0,
      subtotal: 0,
      diskon: 0,
      persen: 0,
      total: 0,
    });
  });

  it("belanja di bawah Rp 50.000 tidak mendapat diskon", () => {
    const hasil = hitungRingkasan([{ id: 7, harga: 4000, jumlah: 2 }]);
    expect(hasil).toEqual({
      jumlahUnit: 2,
      subtotal: 8000,
      diskon: 0,
      persen: 0,
      total: 8000,
    });
  });

  it("4 sabun (Rp 60.000) mendapat diskon 5% menjadi Rp 57.000", () => {
    const hasil = hitungRingkasan([{ id: 12, harga: 15000, jumlah: 4 }]);
    expect(hasil).toMatchObject({ subtotal: 60000, persen: 5, diskon: 3000, total: 57000 });
  });

  it("14 sabun + 2 air: diskon 15%, total Rp 185.300", () => {
    const item = [
      { id: 12, harga: 15000, jumlah: 14 },
      { id: 7, harga: 4000, jumlah: 2 },
    ];
    expect(hitungRingkasan(item)).toEqual({
      jumlahUnit: 16,
      subtotal: 218000,
      persen: 15,
      diskon: 32700,
      total: 185300,
    });
  });

  it("membulatkan potongan diskon ke rupiah terdekat", () => {
    const hasil = hitungRingkasan([{ id: 1, harga: 50010, jumlah: 1 }]);
    expect(hasil).toMatchObject({ subtotal: 50010, persen: 5, diskon: 2501, total: 47509 });
  });
});

describe("kurangiStok", () => {
  it("mengurangi stok barang yang dibeli sesuai isi keranjang", () => {
    const daftar = [SABUN, AIR];
    const hasil = kurangiStok(daftar, [{ id: 12, jumlah: 4 }]);
    expect(hasil.find((b) => b.id === 12).stok).toBe(18);
  });

  it("membiarkan stok barang yang tidak dibeli tetap utuh", () => {
    const daftar = [SABUN, AIR];
    const hasil = kurangiStok(daftar, [{ id: 12, jumlah: 4 }]);
    expect(hasil.find((b) => b.id === 7).stok).toBe(48);
  });

  it("tidak mengubah daftar barang asli (immutable)", () => {
    const daftar = [SABUN, AIR];
    const salinan = structuredClone(daftar);
    kurangiStok(daftar, [{ id: 12, jumlah: 4 }]);
    expect(daftar).toEqual(salinan);
  });
});

describe("menujuDiskonBerikutnya", () => {
  it("subtotal Rp 30.000 kurang Rp 20.000 menuju diskon 5%", () => {
    expect(menujuDiskonBerikutnya(30000)).toEqual({ kurang: 20000, persen: 5 });
  });

  it("subtotal Rp 50.000 kurang Rp 50.000 menuju diskon 10%", () => {
    expect(menujuDiskonBerikutnya(50000)).toEqual({ kurang: 50000, persen: 10 });
  });

  it("subtotal Rp 120.000 kurang Rp 80.000 menuju diskon 15%", () => {
    expect(menujuDiskonBerikutnya(120000)).toEqual({ kurang: 80000, persen: 15 });
  });

  it("subtotal Rp 200.000 mengembalikan null karena sudah di tingkat tertinggi", () => {
    expect(menujuDiskonBerikutnya(200000)).toBeNull();
  });
});
