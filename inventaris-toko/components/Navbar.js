import Link from "next/link";
import { Store } from "lucide-react";

const MENU = [
  { href: "#katalog", label: "katalog" },
  { href: "#tabel", label: "Tabel" },
  { href: "#tentang", label: "Tentang" },
];

export default function Navbar({ namaToko }) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5"
        aria-label="Menu utama"
      >
        <Link href="/" className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-900 transition
              hover:opacity-80">
          <Store className="h-5 w-5" aria-hidden="true" /> {namaToko}
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          {MENU.map((m) => (
            <li key={m.href}>
              <a href={m.href} className="transition-colors hover:text-zinc-950">
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}