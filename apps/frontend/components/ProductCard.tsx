// PATH: apps/frontend/components/ProductCard.tsx
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ item, type }: { item: any; type: "product" | "category" }) {
  const isCategory = type === "category";
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const coverImage = item.coverImage || (isCategory && item.products?.[0]?.coverImage) || "/placeholder.jpg";
  const name = item.name;
  const link = isCategory ? `/${item.slug}` : `/product/${item.slug}`;
  const subtext = isCategory ? `${item._count?.products ?? 0} ürün` : item.category?.name;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link'i engelle
    e.stopPropagation();

    if (isCategory || !item.id) return;

    try {
      setIsAdding(true);
      await addToCart(item.id, 1);
      
      // Başarı göstergesi - kısa bir süre için butonu yeşil yap
      setTimeout(() => setIsAdding(false), 1000);
    } catch (error) {
      console.error('Sepete eklerken hata:', error);
      setIsAdding(false);
      alert('Ürün sepete eklenirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  return (
    <div className="group block transition-all duration-300 overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
      <Link href={link} className="block">
        <div className="overflow-hidden h-56 rounded-t-xl">
          <img
            src={coverImage}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={link} className="block text-center mb-3">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-yellow-300 transition-colors">
            {name}
          </h3>
          <p className="text-white/80 text-sm drop-shadow">
            {subtext}
          </p>
        </Link>

        {/* Ürün için fiyat ve sepete ekle butonu */}
        {!isCategory && item.price && (
          <div className="space-y-3">
            <div className="text-center">
              <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
                ₺{Number(item.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
              <p className="text-xs text-white/60">Temsili fiyat</p>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Eklendi!
                </span>
              ) : (
                '🛒 Sepete Ekle'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
