import { describe, it, expect } from "vitest";
import { daftarBarang } from "@/lib/data-barang";
import { statusStok, kelompokkanPerKategori, ringkasanStok, tambahBarang, ubahBarang, hapusBarang } from "@/lib/barang";
import { validasiBarang, adaGalat } from "@/lib/validasi";
import { formatRupiah } from "@/lib/format";

describe("statusStok", () => {
  it.each([
    [0, "habis"],
    [1, "menipis"],
    [9, "menipis"],
    [10, "tersedia"],
    [48, "tersedia"],
  ])("stok %i berstatus %s", (stok, status) => {
    expect(statusStok(stok)).toBe(status);
  });

  it("mendukung ambang batas menipis kustom", () => {
    expect(statusStok(4, 5)).toBe("menipis");
    expect(statusStok(5, 5)).toBe("tersedia");
  });
});

describe("kelompokkanPerKategori & ringkasanStok", () => {
  it("mengelompokkan 12 barang awal ke dalam 4 kategori masing-masing 3 barang", () => {
    const kelompok = kelompokkanPerKategori(daftarBarang);
    expect(Object.keys(kelompok)).toEqual(["Alat Tulis", "Makanan", "Minuman", "Kebersihan"]);
    expect(kelompok["Alat Tulis"]).toHaveLength(3);
  });

  it("menghitung ringkasan 12 barang awal sesuai angka kunci proyek", () => {
    expect(ringkasanStok(daftarBarang)).toEqual({
      jumlahJenis: 12,
      totalUnit: 547,
      nilaiPersediaan: 2425000,
      habis: 2,
      menipis: 3,
    });
  });

  it("mengembalikan semua metrik 0 untuk daftar kosong", () => {
    expect(ringkasanStok([])).toEqual({
      jumlahJenis: 0,
      totalUnit: 0,
      nilaiPersediaan: 0,
      habis: 0,
      menipis: 0,
    });
  });
});

describe("CRUD barang murni (tambah, ubah, hapus)", () => {
  const DATA_BARU = {
    kode: " ATK-004 ",
    nama: " Penggaris 30 cm ",
    kategori: "Alat Tulis",
    harga: "4500",
    stok: "25",
    satuan: " pcs ",
  };

  it("tambahBarang memberi id berikutnya, merapikan spasi, mengubah angka, dan immutable", () => {
    const salinan = structuredClone(daftarBarang);
    const hasil = tambahBarang(daftarBarang, DATA_BARU);

    expect(hasil).toHaveLength(13);
    expect(hasil[12]).toEqual({
      id: 13,
      kode: "ATK-004",
      nama: "Penggaris 30 cm",
      kategori: "Alat Tulis",
      harga: 4500,
      stok: 25,
      satuan: "pcs",
    });
    expect(daftarBarang).toEqual(salinan);
  });

  it("tambahBarang pada daftar kosong memulai id dari 1", () => {
    const hasil = tambahBarang([], DATA_BARU);
    expect(hasil[0].id).toBe(1);
  });

  it("ubahBarang memperbarui barang sesuai id tanpa mengubah barang lain", () => {
    const hasil = ubahBarang(daftarBarang, 1, DATA_BARU);
    expect(hasil.find((b) => b.id === 1)).toMatchObject({
      id: 1,
      kode: "ATK-004",
      nama: "Penggaris 30 cm",
      harga: 4500,
    });
    expect(hasil.find((b) => b.id === 2).nama).toBe("Pensil 2B");
  });

  it("hapusBarang menyaring barang sesuai id tanpa memutasi daftar asal", () => {
    const hasil = hapusBarang(daftarBarang, 1);
    expect(hasil).toHaveLength(11);
    expect(hasil.find((b) => b.id === 1)).toBeUndefined();
    expect(daftarBarang).toHaveLength(12);
  });
});

describe("validasiBarang & adaGalat", () => {
  const VALID = {
    kode: "ATK-009",
    nama: "Map Plastik",
    kategori: "Alat Tulis",
    harga: 3000,
    stok: 15,
    satuan: "pcs",
  };

  it("meloloskan data barang yang valid (adaGalat bernilai false)", () => {
    const galat = validasiBarang(VALID, daftarBarang);
    expect(galat).toEqual({});
    expect(adaGalat(galat)).toBe(false);
  });

  it("menolak kolom kosong dan format kode tidak sesuai pola", () => {
    const kosong = validasiBarang({}, daftarBarang);
    expect(adaGalat(kosong)).toBe(true);
    expect(kosong.kode).toBe("Kode wajib diisi.");
    expect(kosong.nama).toBe("Nama wajib diisi.");
    expect(kosong.kategori).toBe("Pilih kategori.");
    expect(kosong.harga).toBe("Harga wajib diisi.");
    expect(kosong.stok).toContain("wajib diisi");
    expect(kosong.satuan).toBe("Satuan wajib diisi.");

    const salahPola = validasiBarang({ ...VALID, kode: "atk09", nama: "Ab" }, daftarBarang);
    expect(salahPola.kode).toContain("Format kode");
    expect(salahPola.nama).toContain("minimal 3");
  });

  it("menolak harga <= 0, stok negatif, atau angka desimal", () => {
    const galat = validasiBarang({ ...VALID, harga: 0, stok: -1 }, daftarBarang);
    expect(galat.harga).toContain("lebih dari 0");
    expect(galat.stok).toContain("0 atau lebih");

    const desimal = validasiBarang({ ...VALID, harga: 2500.5, stok: 1.5 }, daftarBarang);
    expect(desimal.harga).toContain("bilangan bulat");
    expect(desimal.stok).toContain("bilangan bulat");
  });

  it("menolak kode kembar dengan barang lain tetapi mengizinkan kode barang yang sedang diedit", () => {
    const kembar = validasiBarang({ ...VALID, kode: "ATK-001" }, daftarBarang);
    expect(kembar.kode).toBe("Kode sudah dipakai barang lain.");

    const milikSendiri = validasiBarang({ ...VALID, kode: "ATK-001" }, daftarBarang, 1);
    expect(milikSendiri.kode).toBeUndefined();
  });
});

describe("formatRupiah", () => {
  it("memformat angka ribuan ke mata uang Rupiah tanpa desimal", () => {
    expect(formatRupiah(185300)).toMatch(/Rp\s?185\.300/);
  });

  it("memformat angka 0 menjadi Rp 0", () => {
    expect(formatRupiah(0)).toMatch(/Rp\s?0/);
  });
});
