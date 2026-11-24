import KartuBarang from "@/components/KartuBarang";
import { daftarBarang } from "@/lib/data-barang";

export default function Berangda() {
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {daftarBarang.map((b) => (
        <KartuBarang key={b.id} barang={b} />
      ))}
    </main>
  );
}