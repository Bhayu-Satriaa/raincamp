import { Boxes, PackageX, TriangleAlert, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Bagian from "@/components/Bagian";
import KartuBarang from "@/components/KartuBarang";
import KartuStatistik from "@/components/KartuStatistik";
import LabelStok from "@/components/LabelStok";
import TabelData from "@/components/TabelData";
import RingkasanKategori from "@/components/RingkasanKategori";
import { daftarBarang, KATEGORI } from "@/lib/data-barang";
import { kelompokkanPerKategori, ringkasanStok, ringkasanPerKategori } from "@/lib/barang";
import { formatRupiah } from "@/lib/format";

const NAMA_TOKO = "Toko Maju Jaya";

const KOLOM = [
  { kunci: "kode", judul: "Kode" },
  { kunci: "nama", judul: "Nama barang" },
  { kunci: "kategori", judul: "Kategori" },
  { kunci: "harga", judul: "Harga", rataKanan: true, tampil: (b) => formatRupiah(b.harga) },
  { kunci: "stok", judul: "Stok", tampil: (b) => <LabelStok stok={b.stok} /> },
];

export default function Beranda() {
  const ringkas = ringkasanStok(daftarBarang);
  const perKategori = kelompokkanPerKategori(daftarBarang);
  const dataRingkasKategori = ringkasanPerKategori(daftarBarang);

  return (
    <>
      <Navbar namaToko={NAMA_TOKO} />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Katalog Inventaris</h1>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KartuStatistik label="Jenis barang" nilai={ringkas.jumlahJenis} ikon={Boxes} />
          <KartuStatistik
            label="Nilai persediaan"
            nilai={formatRupiah(ringkas.nilaiPersediaan)}
            ikon={Wallet}
          />
          <KartuStatistik
            label="Stok menipis"
            nilai={ringkas.menipis}
            ikon={TriangleAlert}
            peringatan={ringkas.menipis > 0}
          />
          <KartuStatistik
            label="Stok habis"
            nilai={ringkas.habis}
            ikon={PackageX}
            peringatan={ringkas.habis > 0}
          />
        </div>

        <Bagian id="ringkasan" judul="Ringkasan per Kategori" keterangan="Komposisi barang dan total nilai modal per kategori">
          <RingkasanKategori data={dataRingkasKategori} />
        </Bagian>

        <Bagian
          id="katalog"
          judul="Katalog per Kategori"
          keterangan={`${KATEGORI.length} kategori, ${daftarBarang.length} barang`}
        >
          {KATEGORI.map((kat) => (
            <div key={kat} className="mb-8">
              <h3 className="mb-3 font-semibold text-slate-700">
                {kat} <span className="text-sm font-normal text-slate-500">({perKategori[kat]?.length ?? 0})</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(perKategori[kat] ?? []).map((b) => (
                  <KartuBarang key={b.id} barang={b} />
                ))}
              </div>
            </div>
          ))}
        </Bagian>

        <Bagian id="tabel" judul="Tabel Barang" keterangan="Daftar lengkap seluruh stok inventaris">
          <TabelData kolom={KOLOM} data={daftarBarang} />
        </Bagian>
      </main>

      <Footer namaToko={NAMA_TOKO} />
    </>
  );
}
