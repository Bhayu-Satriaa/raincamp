"use client";

import Penghitung from "@/components/Penghitung";
import FormBarang from "@/components/FormBarang";
import FormPembayaran from "@/components/kasir/FormPembayaran";

export default function Latihan() {
    return (
        <main className="mx-auto max-w-3xl space-y-6 p-6">
            <h1 className="text-2xl font-bold">Latihan State (P05)</h1>
            <div className="flex flex-wrap gap-4">
                <Penghitung />
                <Penghitung awal={10} langkah={5} />
            </div>
            <FormBarang onSimpan={(x) => alert(JSON.stringify(x))} />
            <FormPembayaran
                total={58500}
                nonaktif={false}
                onBayar={(d) => console.log("bayar", d)}
            />
        </main>
    );
}