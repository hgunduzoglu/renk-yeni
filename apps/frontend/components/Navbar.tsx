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
    <header className="sticky top-0 z-50 w-full">
      <nav className="backdrop-blur bg-black/80 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 min-w-[120px]">
            <img
              src="/logo.svg"
              alt="RENK"
              className="h-10 w-auto object-contain"
              style={{ maxHeight: 40 }}
              onError={e => ((e.target as HTMLImageElement).style.display = "none")}
            />
          </Link>

          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Menüyü Aç/Kapat">
            ☰
          </button>

          <ul
            className={clsx(
              "md:flex gap-8 font-medium text-lg transition-all duration-300",
              open ? "block absolute left-0 right-0 top-full bg-black/95 p-6 md:static md:bg-transparent" : "hidden md:flex"
            )}
          >
            {links.map((l) => (
              <li key={l.href} className="my-2 md:my-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-yellow-400 transition-colors duration-200 px-2 py-1 rounded"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
