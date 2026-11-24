import Link from "next/link";
import { Store } from "lucide-react";

const MENU = [
  { href: "#katalog", label: "Katalog" },
  { href: "#ringkasan", label: "Ringkasan" },
  { href: "#tabel", label: "Tabel" },
  { href: "#tentang", label: "Tentang" },
];

export default function Navbar({ namaToko }) {
  return (
    <header className="sticky top-0 z-20 bg-slate-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Menu utama">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold hover:text-teal-400 transition">
          <Store aria-hidden="true" /> {namaToko}
        </Link>
        <ul className="flex gap-6 text-sm">
          {MENU.map((m) => (
            <li key={m.href}>
              <a href={m.href} className="hover:text-teal-300 transition">{m.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
