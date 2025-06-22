// PATH: apps/frontend/pages/product/[slug].tsx
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";

export default function ProductDetail() {
  const { query, isReady } = useRouter();
  const productSlug = query.slug as string;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => api.get(`/products/${productSlug}`).then(r => r.data),
    enabled: isReady && !!productSlug,
  });
  
  // Ürün yüklendiğinde ana resmi ayarla
  useEffect(() => {
    if (product?.coverImage) {
      setSelectedImage(product.coverImage);
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!product?.id) return;

    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
      
      // Başarı göstergesi
      setTimeout(() => setIsAdding(false), 1500);
    } catch (error) {
      console.error('Sepete eklerken hata:', error);
      setIsAdding(false);
      alert('Ürün sepete eklenirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
            <p className="text-white text-lg">Yükleniyor...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-12 border border-white/20 text-center max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-4">Ürün Bulunamadı</h3>
            <p className="text-white/80">Aradığınız ürün mevcut değil.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const allImages = [product.coverImage, ...product.images.map((img: any) => img.url)];

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20 inline-block">
              <nav className="text-white/80 text-sm">
                <span>Ana Sayfa</span>
                <span className="mx-2">›</span>
                <span>{product.category.name}</span>
                <span className="mx-2">›</span>
                <span className="text-white font-medium">{product.name}</span>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sol Taraf - Resim Galerisi */}
            <div className="space-y-6">
              {/* Ana Resim */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Küçük Resimler */}
              {allImages.length > 1 && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="grid grid-cols-4 gap-3">
                    {allImages.map((imgUrl: string, index: number) => (
                      <button 
                        key={index} 
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImage === imgUrl 
                            ? 'border-yellow-400 shadow-lg' 
                            : 'border-white/30 hover:border-white/60'
                        }`}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`${product.name} - ${index + 1}`} 
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sağ Taraf - Ürün Bilgileri */}
            <div className="space-y-6">
              {/* Başlık ve Kategori */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="mb-4">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {product.category.name}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {product.name}
                </h1>
                {/* Fiyat Bilgisi */}
                {product.price && (
                  <div className="mt-6">
                    <div className="text-center bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
                      <span className="text-3xl font-bold text-yellow-400 drop-shadow-lg">
                        ₺{Number(product.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </span>
                      <p className="text-sm text-white/60 mt-1">Temsili fiyat</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sepete Ekle Butonu */}
              {product.price && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isAdding
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                    } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105`}
                  >
                    {isAdding ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3"/>
                          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Sepete Eklendi!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        🛒 Sepete Ekle
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* Açıklama */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ürün Açıklaması
                </h3>
                <div 
                  className="text-white/90 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }} 
                />
              </div>

              {/* Garanti Bilgisi */}
              {product.warranty && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Garanti</h4>
                      <p className="text-white/80">{product.warranty}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* İletişim Butonu */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h4 className="text-white font-semibold mb-4">Bu ürünle ilgileniyorum</h4>
                <a
                  href="/contact"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  İletişime Geç
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
