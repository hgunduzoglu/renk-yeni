// PATH: apps/frontend/components/HeroSlider.tsx
import { useEffect, useState } from "react";

const slides = [
  "/uploads/slider/202406-hero01.jpg",
  "/uploads/slider/202406-hero02.jpg",
  "/uploads/slider/202406-hero03.jpg"
];

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-[60vh] relative overflow-hidden">
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold">Gölgelendirme Çözümleri</h1>
      </div>
    </div>
  );
}
