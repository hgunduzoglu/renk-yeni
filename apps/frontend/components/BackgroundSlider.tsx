import { useEffect, useState } from "react";

const IMGS = [
  "/uploads/slider/202406-hero01.jpg",
  "/uploads/slider/202406-hero02.jpg",
  "/uploads/slider/202406-hero03.jpg"
];

export default function BackgroundSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % IMGS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {IMGS.map((src, i) => (
        <img
          key={src}
          src={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* hafif karartma – sayfa okunurluğu için */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
