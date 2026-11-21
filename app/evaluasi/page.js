export const metadata = { title: "Evaluasi C3 - Tebak Output" };

const daftarSoal = [
    {
        no: 1,
        judul: "Block Scope (let)",
        kode: `let a = 1; { let a = 2; } console.log(a);`,
        output: "1",
        penjelasan: "Variabel dengan let memiliki scope kurung kurawal. Nilai a di luar blok tetap 1.",
    },
    {
        no: 2,
        judul: "Destructuring & Default Value",
        kode: `const { nama, umur = 17 } = { nama: "Ani" }; console.log(nama, umur);`,
        output: "Ani 17",
        penjelasan: "Karena properti umur tidak tersedia di objek sumber, default value 17 otomatis digunakan.",
    },
    {
        no: 3,
        judul: "Array Destructuring (Skip)",
        kode: `const [x, , z] = [10, 20, 30]; console.log(x + z);`,
        output: "40",
        penjelasan: "Elemen kedua dilewati dengan tanda koma kosong. x = 10, z = 30 -> 10 + 30 = 40.",
    },
    {
        no: 4,
        judul: "Spread Immutability",
        kode: `const a = [1, 2]; const b = [...a, 3]; a.push(9); console.log(b);`,
        output: "[ 1, 2, 3 ]",
        penjelasan: "Array b adalah salinan baru independen, tidak terpengaruh perubahan pada a.push(9).",
    },
    {
        no: 5,
        judul: "Object Spread & Overwrite",
        kode: `const o = { p: 1 }; const q = { ...o, p: 2, r: 3 }; console.log(o.p, q.p, q.r);`,
        output: "1 2 3",
        penjelasan: "o.p tetap bernilai 1. Pada objek q, properti p ditimpa menjadi 2 dan ditambah r: 3.",
    },
    {
        no: 6,
        judul: "Default Array Sort (Alphabetical)",
        kode: `console.log([5, 1, 10, 2].sort());`,
        output: "[ 1, 10, 2, 5 ]",
        penjelasan: "Tanpa fungsi pembanding, .sort() mengurutkan secara leksikografis (string '10' sebelum '2').",
    },
    {
        no: 7,
        judul: "Array Find",
        kode: `console.log([3, 8, 12, 5].find((n) => n > 6));`,
        output: "8",
        penjelasan: ".find() berhenti dan mengembalikan elemen pertama yang memenuhi syarat (8 > 6).",
    },
    {
        no: 8,
        judul: "Arrow Function tanpa Return",
        kode: `const f = (n) => { n * 2 }; console.log(f(3));`,
        output: "undefined",
        penjelasan: "Arrow function berkurawal wajib memiliki kata kunci return. Tanpa return, nilainya undefined.",
    },
    {
        no: 9,
        judul: "Optional Chaining (?.)",
        kode: `const u = { profil: { kota: "Palu" } }; console.log(u.alamat?.kota, u.profil?.kota);`,
        output: "undefined Palu",
        penjelasan: "u.alamat bernilai undefined, tetapi ?. mencegah crash error dan mengembalikan undefined secara aman.",
    },
    {
        no: 10,
        judul: "String Spread & Join",
        kode: `console.log([...'abc'].map((c) => c.toUpperCase()).join('-'));`,
        output: "A-B-C",
        penjelasan: "String dipecah menjadi array huruf, diubah menjadi kapital, lalu digabungkan dengan strip.",
    },
    {
        no: 11,
        judul: "Trace Table Loop (continue)",
        kode: `const nilai = [60, 85, 72, 90];
let jumlahLulus = 0;
for (const n of nilai) {
    if (n < 70) continue;
    jumlahLulus++;
}
console.log(jumlahLulus);`,
        output: "3",
        penjelasan: "Nilai 60 dilewati oleh continue. Tiga nilai lainnya (85, 72, 90) menambah jumlahLulus hingga menjadi 3.",
    },
];

export default function HalamanEvaluasiC3() {
    return (
        <main className="mx-auto max-w-4xl p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Evaluasi C3: Soal Tebak Output
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Hasil eksekusi kode dan pembahasan konsep JavaScript ES6+ dari modul praktik.
                </p>
            </div>

            <div className="grid gap-4">
                {daftarSoal.map((soal) => (
                    <div
                        key={soal.no}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="font-semibold text-slate-900">
                                {soal.no}. {soal.judul}
                            </span>
                            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                                Output: {soal.output}
                            </span>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-slate-400 mb-1">KODE JAVASCRIPT:</p>
                            <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                                <code>{soal.kode}</code>
                            </pre>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 border border-slate-100">
                            <strong className="text-slate-800">💡 Penjelasan:</strong> {soal.penjelasan}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
