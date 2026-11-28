export default function Bagian({ id, judul, keterangan, children }) {
  return (
    <section id={id} className="pt-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">{judul}</h2>
        {keterangan && <p className="mt-1 text-sm text-zinc-500">{keterangan}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}
