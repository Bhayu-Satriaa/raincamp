import { formatRupiah, formatTanggal, singkat } from "@/lib/format";
import barang from "@/data/barang.json";

export default function HalamanFormat() {
    return (
        <main className="mx-auto max-w-xl space-y-2 p-6">
            <h1 className="text-2xl font-bold">Uji lib/format.js</h1>
            <p>{formatRupiah(1250000)}</p>
            <p>{formatTanggal("2026-11-21")}</p>
            <p>{singkat("Buku Tulis Sidu 58 Lembar Isi 17", 32)}</p>

            <hr className="my-4"></hr>

            <h2 className="text-xl font-semibold">Daftar Barang (JSON)</h2>
            <ul className="list-disc pl-5">
                {barang.map((b) => (
                    <li key={b.id}>
                        {b.nama}: {formatRupiah(b.harga)}
                    </li>
                ))}
            </ul>
        </main>
    );
}