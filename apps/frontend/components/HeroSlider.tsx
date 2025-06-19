// PATH: apps/frontend/components/HeroSlider.tsx
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
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const active = slides[idx];

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[500px] overflow-hidden flex items-center justify-center">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          alt={s.title}
        />
      ))}
      {/* Koyu overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 md:px-0">
        <h1 className="text-white text-4xl md:text-6xl font-bold max-w-3xl text-center drop-shadow-lg mb-6">
          {active.title}
        </h1>
        {active.cta && (
          <Link
            href={active.cta.href}
            className="inline-flex bg-white/90 text-black px-8 py-3 font-semibold hover:bg-yellow-400 hover:text-black transition rounded shadow-lg text-lg"
          >
            {active.cta.label}
          </Link>
        )}
        {/* Slider dotları */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${i === idx ? "bg-yellow-400 border-yellow-400" : "bg-white/40 border-white/60"}`}
              onClick={() => setIdx(i)}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
