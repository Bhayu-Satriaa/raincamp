export default function Footer({ namaToko, tahun = 2026 }) {
  return (
    <footer id="tentang" className="mt-16 border-t border-zinc-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-zinc-500">
        <p>
          © {tahun} <span className="font-medium text-zinc-700">{namaToko}</span>. Proyek pelatihan Junior Programmer.
        </p>
        <p className="font-mono text-[11px] text-zinc-400">Next.js 16 · Tailwind CSS</p>
      </div>
    </footer>
  );
}
