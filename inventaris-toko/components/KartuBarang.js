import { Package } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import LabelStok from "./LabelStok";

export default function KartuBarang({ barang }) {
    const { kode, nama, harga, stok, satuan } = barang;
    const habis = stok === 0;

    return (
        <article
            className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-800 hover:shadow-md ${habis ? "opacity-60 bg-zinc-50/50" : ""
                }`}
        >
            <div>
                <div className="flex items-start justify-between gap-2">
                    {/* Kotak Ikon Modern */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                        <Package className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <LabelStok stok={stok} />
                </div>

                <div className="mt-4">
                    <p className="font-mono text-xs font-medium text-zinc-400">{kode}</p>
                    <h3 className="mt-1 font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                        {nama}
                    </h3>
                </div>
            </div>

            <div className="mt-6 border-t border-zinc-100 pt-3 flex items-baseline justify-between">
                <span className="text-xs text-black-800">Harga satuan</span>
                <p className="text-base font-bold text-zinc-900">
                    {formatRupiah(harga)}{" "}
                    <span className="text-xs font-normal text-zinc-500">/ {satuan}</span>
                </p>
            </div>
        </article>
    );
}