export default function TabelData({ kolom, data, kunciBaris = "id", pesanKosong = "Data tidak ditemukan." }) {
  if (!data || data.length === 0) {
    return (
      <div
        className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center text-sm
          text-zinc-500"
      >
        {pesanKosong}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
      <table className="w-full text-left text-sm">
        <thead
          className="border-b border-zinc-200/80 bg-zinc-50/80 text-xs font-semibold uppercase
            tracking-wider text-zinc-500"
        >
          <tr>
            {kolom.map((k) => (
              <th key={k.kunci} scope="col" className={`px-5 py-3.5 ${k.rataKanan ? "text-right" : ""}`}>
                {k.judul}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-700">
          {data.map((baris) => (
            <tr key={baris[kunciBaris]} className="transition-colors hover:bg-zinc-50/60">
              {kolom.map((k) => (
                <td key={k.kunci} className={`px-5 py-4 ${k.rataKanan ? "text-right" : ""}`}>
                  {/* Jika kolom punya render function k.tampil(), jalankan. Jika tidak, ambil baris[k.kunci] */}
                  {k.tampil ? k.tampil(baris) : baris[k.kunci]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
