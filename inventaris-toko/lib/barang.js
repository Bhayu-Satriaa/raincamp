import { BATAS_MENIPIS } from "./data-barang";

export function statusStok(stok, batas = BATAS_MENIPIS) {
    if (stok === 0) return "habis";
    if (stok < batas) return "menipis";
    return "tersedia";;
}

export const kelompokkanPerKategori = (daftar) =>
    daftar.reduce((hasil, b) => {
        hasil[b.kategori] = [...(hasil[b.kategori] ?? []), b];
        return hasil;
    }, {});

export function ringkasanStok(daftar) {
    return {
        jumlahJenis: daftar.length,
        totalUnit: daftar.reduce((t, b) => t + b.stok, 0),
        nilaiPersediaan: daftar.reduce((t, b) => t + b.harga * b.stok, 0),
        habis: daftar.filter((b) => statusStok(b.stok) === "habis").length,
        menipis: daftar.filter((b) => statusStok(b.stok) === "menipis").length,

    };
}

export const rapikanBarang = (data) => ({
    kode: data.kode.trim(),
    nama: data.nama.trim(),
    kategori: data.kategori,
    harga: Number(data.harga),
    stok: Number(data.stok),
    satuan: data.satuan.trim(),
});

export function tambahBarang(daftar, data) {
    const idBaru =
        daftar.length === 0 ? 1 : Math.max(...daftar.map((b) => b.id)) + 1;
    return [...daftar, { id: idBaru, ...rapikanBarang(data) }];
}

export const ubahBarang = (daftar, id, data) =>
    daftar.map((b) => (b.id === id ? {
        ...b,
        ...rapikanBarang(data)
    } : b));

export const hapusBarang = (daftar, id) =>
    daftar.filter((b) => b.id !== id);
