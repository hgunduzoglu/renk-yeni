import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const links = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ürün Grupları", href: "/#categories" },
  { label: "Galeri", href: "/gallery" },
  { label: "Haberler", href: "/news" },
  { label: "İletişim", href: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Klasik <img> + mutlak yol — ağda da kesin görünür */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.svg"
            alt="RENK"
            className="h-8 w-auto"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </Link>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <ul
          className={clsx(
            "md:flex gap-6 font-medium",
            open ? "block mt-4" : "hidden md:block"
          )}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
