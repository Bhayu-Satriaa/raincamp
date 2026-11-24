const GAYA = {
    utama: "bg-teal-700 text-white hover:bg-teal-800",
    submit: "bg-blue-700 text-white hover:bg-blue-800",
    garis: "border border-teal-700 text-teal-700 hover:bg-teal-50",
    bahaya: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-600 text-black hover:bg-yellow-700",
    netral: "bg-slate-200 text-slate-800 hover:bg-slate-300",
};

export default function Tombol({ children, varian = "utama", ikon: Ikon, ...sisa }) {
    return (
        <button
            // Perhatikan: Gunakan backtick ( ` ) agar ${GAYA[varian]} dievaluasi
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${GAYA[varian]}`}
            {...sisa}
        >
            {/* 1. Ikon harus seragam: ikon: Ikon dan <Ikon /> */}
            {Ikon && <Ikon size={16} aria-hidden="true" />}

            {/* 2. Teks di dalam tombol */}
            {children}
        </button>
    );
}