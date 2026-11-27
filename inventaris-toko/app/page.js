import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HalamanBarang from "@/components/HalamanBarang";

const NAMA_TOKO = "Toko Maju Jaya";

export default function Beranda() {
  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900">
      <Navbar namaToko={NAMA_TOKO} />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">
          Manajemen Barang
        </h1>
        <HalamanBarang />
      </main>
      <Footer namaToko={NAMA_TOKO} />
    </div>
  );
}