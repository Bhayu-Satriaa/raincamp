import { statusStok } from "@/lib/barang";

const WARNA = {
  habis: "bg-rose-50 text-rose-700 border-rose-200/80",
  menipis: "bg-amber-50 text-amber-700 border-amber-200/80",
  tersedia: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
};

export default function LabelStok({ stok }) {
  const status = statusStok(stok);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight ${WARNA[status]}`}
    >
      {status === "habis" ? "Stok habis" : status === "menipis" ? `Menipis: ${stok}` : `Stok ${stok}`}
    </span>
  );
}
