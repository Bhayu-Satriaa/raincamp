import { Suspense } from "react";
import { daftarMahasiswa } from "@/lib/nilai";
import {
    lengkapiNilai,
    statistik,
    peringkat,
    distribusiHuruf,
    filterProdi,
    rataRata,
    ambilKolom,
} from "@/lib/hitung";

export const metadata = { title: "Statistik Nilai Mahasiswa" };

async function TabelDanFilterMahasiswa({ searchParams, semuaData }) {
    const params = await searchParams;
    const prodiFilter = params?.prodi;
    const dataTabel = prodiFilter ? filterProdi(semuaData, prodiFilter) : semuaData;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500 font-medium">Filter Prodi:</span>
                <a
                    href="/mahasiswa"
                    className={`px-3 py-1 rounded-lg border text-xs font-medium transition ${
                        !prodiFilter
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                >
                    Semua
                </a>
                <a
                    href="/mahasiswa?prodi=Informatika"
                    className={`px-3 py-1 rounded-lg border text-xs font-medium transition ${
                        prodiFilter === "Informatika"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                >
                    Informatika
                </a>
                <a
                    href="/mahasiswa?prodi=Sistem Informasi"
                    className={`px-3 py-1 rounded-lg border text-xs font-medium transition ${
                        prodiFilter === "Sistem Informasi"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                >
                    Sistem Informasi
                </a>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                            <th className="py-2.5">NIM</th>
                            <th>Nama</th>
                            <th>Prodi</th>
                            <th>Akhir</th>
                            <th>Huruf</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTabel.map((m) => (
                            <tr key={m.nim} className="border-b border-slate-100 hover:bg-slate-50/70 transition">
                                <td className="py-2 font-mono text-xs text-slate-600">{m.nim}</td>
                                <td className="font-medium text-slate-900">{m.nama}</td>
                                <td className="text-slate-600">{m.prodi}</td>
                                <td className="font-semibold text-slate-900">{m.akhir}</td>
                                <td>
                                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-800">
                                        {m.huruf}
                                    </span>
                                </td>
                                <td
                                    className={`font-semibold ${
                                        m.status === "Lulus" ? "text-green-700" : "text-red-700"
                                    }`}
                                >
                                    {m.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default function HalamanMahasiswa({ searchParams }) {
    const semuaData = lengkapiNilai(daftarMahasiswa);
    const s = statistik(semuaData);
    const tiga = peringkat(semuaData, 3);
    const dist = distribusiHuruf(semuaData);
    const prodi = ["Informatika", "Sistem Informasi"].map((p) => ({
        nama: p,
        rata: rataRata(ambilKolom(filterProdi(semuaData, p), "akhir")),
    }));

    return (
        <main className="mx-auto max-w-5xl p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Statistik Nilai Mahasiswa
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Dashboard rekapitulasi data nilai 20 mahasiswa berbasis fungsi modular murni.
                </p>
            </div>

            {/* Empat Kartu Ringkasan (Responsif: 2 kolom di HP, 4 kolom di layar md) */}
            <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                    ["Mahasiswa", s.jumlahMahasiswa],
                    ["Rata-rata", s.rataRata],
                    ["Tertinggi", s.tertinggi],
                    ["Lulus", `${s.jumlahLulus} (${s.persenLulus}%)`],
                ].map(([label, isi]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                        <p className="text-sm font-medium text-slate-500">{label}</p>
                        <p className="text-2xl font-bold mt-1 text-slate-900">{isi}</p>
                    </div>
                ))}
            </section>

            {/* Tiga Panel Analitik */}
            <section className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                    <h2 className="font-semibold text-slate-900">3 Teratas</h2>
                    <ol className="mt-3 list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
                        {tiga.map((m) => (
                            <li key={m.nim}>
                                <span className="font-medium text-slate-900">{m.nama}</span> —{" "}
                                <span className="text-slate-500 font-semibold">{m.akhir}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                    <h2 className="font-semibold text-slate-900">Distribusi Huruf</h2>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                        {Object.entries(dist).map(([huruf, n]) => (
                            <li key={huruf} className="flex justify-between border-b border-slate-100 pb-1">
                                <span>Nilai {huruf}:</span>
                                <span className="font-semibold text-slate-900">{n} orang</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                    <h2 className="font-semibold text-slate-900">Rata-rata per Prodi</h2>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                        {prodi.map((p) => (
                            <li key={p.nama} className="flex justify-between border-b border-slate-100 pb-1">
                                <span>{p.nama}:</span>
                                <span className="font-semibold text-slate-900">{p.rata}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Tabel dengan Suspense boundary untuk PPR Next.js 16 */}
            <Suspense fallback={<div className="py-4 text-slate-500">Memuat tabel mahasiswa...</div>}>
                <TabelDanFilterMahasiswa searchParams={searchParams} semuaData={semuaData} />
            </Suspense>
        </main>
    );
}
