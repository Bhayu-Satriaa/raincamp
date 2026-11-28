import { describe, it, expect } from "vitest";
import {
  linearSearch,
  binarySearch,
  bubbleSort,
  selectionSort,
  insertionSort,
  urutkanBerdasarkan,
} from "@/lib/algoritma";

const TERURUT = [5, 12, 18, 25, 31, 42, 56, 63, 70, 77, 85, 92];
const ACAK = [29, 10, 14, 37, 13];

describe("linearSearch", () => {
  it("menemukan elemen pertama dalam 1 langkah", () => {
    expect(linearSearch(TERURUT, 5)).toEqual({ indeks: 0, langkah: 1 });
  });

  it("menemukan angka 85 pada indeks 10 dalam 11 langkah", () => {
    expect(linearSearch(TERURUT, 85)).toEqual({ indeks: 10, langkah: 11 });
  });

  it("mengembalikan indeks -1 setelah memeriksa seluruh elemen jika tidak ditemukan", () => {
    expect(linearSearch(TERURUT, 99)).toEqual({ indeks: -1, langkah: 12 });
  });

  it("menangani array kosong", () => {
    expect(linearSearch([], 10)).toEqual({ indeks: -1, langkah: 0 });
  });
});

describe("binarySearch", () => {
  it("menemukan nilai tengah tepat dalam 1 langkah", () => {
    expect(binarySearch(TERURUT, 42)).toEqual({ indeks: 5, langkah: 1 });
  });

  it("menemukan angka 85 pada indeks 10 hanya dalam 3 langkah", () => {
    expect(binarySearch(TERURUT, 85)).toEqual({ indeks: 10, langkah: 3 });
  });

  it("menemukan elemen batas ujung kiri dan ujung kanan", () => {
    expect(binarySearch(TERURUT, 5).indeks).toBe(0);
    expect(binarySearch(TERURUT, 92).indeks).toBe(11);
  });

  it("mengembalikan indeks -1 bila target tidak ada", () => {
    expect(binarySearch(TERURUT, 40).indeks).toBe(-1);
  });

  it("menangani array kosong", () => {
    expect(binarySearch([], 10)).toEqual({ indeks: -1, langkah: 0 });
  });
});

describe("pengurutan angka (bubbleSort, selectionSort, insertionSort)", () => {
  it.each([
    ["bubbleSort", bubbleSort, 10],
    ["selectionSort", selectionSort, 10],
    ["insertionSort", insertionSort, 8],
  ])("%s mengurutkan [29, 10, 14, 37, 13] dalam %i perbandingan dan immutable", (_, fn, jml) => {
    const asal = [...ACAK];
    const { hasil, perbandingan } = fn(asal);
    expect(hasil).toEqual([10, 13, 14, 29, 37]);
    expect(perbandingan).toBe(jml);
    expect(asal).toEqual(ACAK);
  });

  it.each([
    ["bubbleSort", bubbleSort],
    ["selectionSort", selectionSort],
    ["insertionSort", insertionSort],
  ])("%s menangani array kosong, satu elemen, dan nilai duplikat", (_, fn) => {
    expect(fn([]).hasil).toEqual([]);
    expect(fn([42]).hasil).toEqual([42]);
    expect(fn([5, 2, 5, 1]).hasil).toEqual([1, 2, 5, 5]);
  });

  it("bubbleSort berhenti dini (4 perbandingan) bila array 5 angka sudah terurut", () => {
    expect(bubbleSort([10, 13, 14, 29, 37])).toEqual({
      hasil: [10, 13, 14, 29, 37],
      perbandingan: 4,
    });
  });
});

describe("urutkanBerdasarkan", () => {
  const BARANG_MINI = [
    { nama: "B", harga: 5000, stok: 10 },
    { nama: "A", harga: 2000, stok: 10 },
    { nama: "C", harga: 8000, stok: 3 },
  ];

  it("mengurutkan naik (asc) secara bawaan berdasarkan properti angka", () => {
    const hasil = urutkanBerdasarkan(BARANG_MINI, "harga");
    expect(hasil.map((b) => b.nama)).toEqual(["A", "B", "C"]);
  });

  it("mengurutkan turun (desc) berdasarkan properti", () => {
    const hasil = urutkanBerdasarkan(BARANG_MINI, "harga", "desc");
    expect(hasil.map((b) => b.nama)).toEqual(["C", "B", "A"]);
  });

  it("menangani nilai properti kembar tanpa memutasi array asal", () => {
    const salinan = structuredClone(BARANG_MINI);
    const hasil = urutkanBerdasarkan(BARANG_MINI, "stok", "asc");
    expect(hasil[0].nama).toBe("C");
    expect(BARANG_MINI).toEqual(salinan);
  });
});
