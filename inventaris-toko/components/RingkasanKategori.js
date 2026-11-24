import { formatRupiah } from "@/lib/format";
import { Layers } from "lucide-react";

export default function RingkasanKategori({ data }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <div key={item.kategori} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-teal-700 mb-2">
            <span className="font-semibold text-slate-800">{item.kategori}</span>
            <Layers size={18} aria-hidden="true" />
          </div>
          <p className="text-sm text-slate-500">{item.jumlahBarang} jenis ({item.totalUnit} unit)</p>
          <p className="text-base font-bold text-slate-900 mt-1">{formatRupiah(item.nilaiPersediaan)}</p>
        </div>
      ))}
    </div>
  );
}
