import { describe, it, expect } from "vitest";
import { daftarBarang } from "@/lib/data-barang";
import { terapkanKueri } from "@/lib/kueri";

describe("terapkanKueri", () => {
  it("tanpa argumen kueri mengembalikan halaman 1 berisi 5 barang urut Nama A-Z", () => {
    const hasil = terapkanKueri(daftarBarang);
    expect(hasil.data).toHaveLength(5);
    expect(hasil.total).toBe(12);
    expect(hasil.totalHalaman).toBe(3);
    expect(hasil.halaman).toBe(1);
    expect(hasil.data[0].nama).toBe("Air Mineral 600 ml");
  });

  it("mencari berdasarkan nama tanpa membedakan huruf besar/kecil serta mengabaikan spasi", () => {
    const hasil = terapkanKueri(daftarBarang, { kata: "  SABUN  " });
    expect(hasil.total).toBe(2);
    expect(hasil.data.map((b) => b.nama)).toEqual(["Sabun Cuci Piring", "Sabun Mandi"]);
  });

  it("mencari berdasarkan kode barang", () => {
    const hasil = terapkanKueri(daftarBarang, { kata: "mkn-001" });
    expect(hasil.total).toBe(1);
    expect(hasil.data[0].nama).toBe("Mi Instan Goreng");
  });

  it("menyaring barang berdasarkan kategori", () => {
    const hasil = terapkanKueri(daftarBarang, { kategori: "Minuman" });
    expect(hasil.total).toBe(3);
    expect(hasil.data.every((b) => b.kategori === "Minuman")).toBe(true);
  });

  it("menggabungkan pencarian kata dan filter kategori sekaligus", () => {
    expect(terapkanKueri(daftarBarang, { kata: "sabun", kategori: "Kebersihan" }).total).toBe(2);
    expect(terapkanKueri(daftarBarang, { kata: "sabun", kategori: "Makanan" }).total).toBe(0);
  });

  it("mengurutkan berdasarkan harga termurah (harga-naik)", () => {
    const hasil = terapkanKueri(daftarBarang, { urut: "harga-naik", perHalaman: 12 });
    expect(hasil.data[0].harga).toBe(2000);
    expect(hasil.data[11].harga).toBe(15000);
  });

  it("mengurutkan berdasarkan harga termahal (harga-turun)", () => {
    const hasil = terapkanKueri(daftarBarang, { urut: "harga-turun" });
    expect(hasil.data[0].harga).toBe(15000);
  });

  it("mengurutkan berdasarkan stok paling sedikit (stok-naik)", () => {
    const hasil = terapkanKueri(daftarBarang, { urut: "stok-naik" });
    expect(hasil.data[0].stok).toBe(0);
    expect(hasil.data[1].stok).toBe(0);
  });

  it("jatuh kembali ke urutan nama-naik bila kunci urut tidak dikenal", () => {
    const hasil = terapkanKueri(daftarBarang, { urut: "acak" });
    expect(hasil.data[0].nama).toBe("Air Mineral 600 ml");
  });

  it("mengambil irisan barang yang tepat pada halaman terakhir", () => {
    const hasil = terapkanKueri(daftarBarang, { halaman: 3, perHalaman: 5 });
    expect(hasil.halaman).toBe(3);
    expect(hasil.data).toHaveLength(2);
  });

  it("menjepit nomor halaman di luar rentang ke batas [1, totalHalaman]", () => {
    expect(terapkanKueri(daftarBarang, { halaman: 99, perHalaman: 5 }).halaman).toBe(3);
    expect(terapkanKueri(daftarBarang, { halaman: 0, perHalaman: 5 }).halaman).toBe(1);
  });

  it("hasil pencarian kosong tetap mengembalikan totalHalaman = 1 dan halaman = 1", () => {
    const hasil = terapkanKueri(daftarBarang, { kata: "tidak-ada-barang" });
    expect(hasil).toEqual({ data: [], total: 0, totalHalaman: 1, halaman: 1 });
  });

  it("tidak mengubah urutan array daftarBarang asli (immutable)", () => {
    const salinan = structuredClone(daftarBarang);
    terapkanKueri(daftarBarang, { urut: "harga-turun" });
    expect(daftarBarang).toEqual(salinan);
  });
});
