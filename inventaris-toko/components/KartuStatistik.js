export default function KartuStatistik({
    label,
    nilai,
    ikon: Ikon,
    peringatan = false,
}) {
    return (
        <div
            className={`flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-xs transition-all ${peringatan
                    ? "border-amber-300 bg-amber-50/20"
                    : "border-zinc-200/80 hover:border-zinc-300"
                }`}
        >
            {Ikon && (
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${peringatan
                            ? "bg-amber-100 text-amber-700"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                >
                    <Ikon className="h-6 w-6" aria-hidden="true" />
                </div>
            )}
            <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {label}
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                    {nilai}
                </p>
            </div>
        </div>
    );
}