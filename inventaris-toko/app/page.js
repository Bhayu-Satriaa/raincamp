import { Boxes, PackageX, TriangleAlert, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Bagian from "@/components/Bagian";
import KartuBarang from "@/components/KartuBarang";
import KartuStatistik from "@/components/KartuStatistik";
import LabelStok from "@/components/LabelStok";
import TabelData from "@/components/TabelData";
import { daftarBarang, KATEGORI } from "@/lib/data-barang";
import { kelompokkanPerKategori, ringkasanStok } from "@/lib/barang";
import { formatRupiah } from "@/lib/format";

const NAMA_TOKO = "Toko Maju Jaya";

const KOLOM = [
  { kunci: "kode", judul: "Kode" },
  { kunci: "nama", judul: "Nama barang" },
  { kunci: "kategori", judul: "Kategori" },
  {
    kunci: "harga",
    judul: "Harga",
    rataKanan: true,
    tampil: (b) => formatRupiah(b.harga),
  },
  {
    kunci: "stok",
    judul: "Stok",
    tampil: (b) => <LabelStok stok={b.stok} />,
  },
];

export default function Beranda() {
  const ringkas = ringkasanStok(daftarBarang);
  const perKategori = kelompokkanPerKategori(daftarBarang);

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900">
      <Navbar namaToko={NAMA_TOKO} />

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-12">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Katalog Inventaris
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Ringkasan data barang dan status persediaan {NAMA_TOKO}.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KartuStatistik
            label="Jenis barang"
            nilai={ringkas.jumlahJenis}
            ikon={Boxes}
          />
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
        <Bagian
          id="katalog"
          judul="Katalog per Kategori"
          keterangan={`${KATEGORI.length} kategori, ${daftarBarang.length} jenis barang`}
        >
          <div className="space-y-10">
            {KATEGORI.map((kat) => (
              <div key={kat}>
                <div className="mb-4 flex items-center gap-2">
                  <h3 className="font-semibold text-zinc-800">{kat}</h3>
                  <span className="rounded-full bg-zinc-200/70 px-2 py-0.5 text-xs font-medium text-zinc-600">
                    {perKategori[kat]?.length ?? 0}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {(perKategori[kat] ?? []).map((b) => (
                    <KartuBarang key={b.id} barang={b} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Bagian>
        <Bagian
          id="tabel"
          judul="Tabel Barang"
          keterangan="Daftar inventaris lengkap dengan harga dan status persediaan real-time."
        >
          <TabelData kolom={KOLOM} data={daftarBarang} />
        </Bagian>
      </main>

      <Footer namaToko={NAMA_TOKO} />
    </div>
  );
}