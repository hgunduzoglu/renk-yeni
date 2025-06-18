import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    src: "/uploads/slider/202406-hero01.jpg",
    title: "Özel Üretim Gölgelendirme Sistemleri",
    cta: { label: "Big Chefs", href: "/galeri/pergole" }
  },
  {
    src: "/uploads/slider/202406-hero02.jpg",
    title: "Luna",
    cta: { label: "İNCELE", href: "/product/luna" }
  },
  {
    src: "/uploads/slider/202406-hero03.jpg",
    title: "Pergola Devrimi Persa",
    cta: { label: "İNCELE", href: "/product/persa" }
  }
];

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const active = slides[idx];

  return (
    {/* 100vh - 4rem (navbar) ⇒ boşluk yok */}
    <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col justify-center gap-6 px-6 md:px-24">
        <h1 className="text-white text-4xl md:text-6xl font-bold max-w-3xl">
          {active.title}
        </h1>
        {active.cta && (
          <Link
            href={active.cta.href}
            className="inline-block bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition rounded"
          >
            {active.cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
