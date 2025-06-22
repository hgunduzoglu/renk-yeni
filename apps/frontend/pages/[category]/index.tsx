// PATH: apps/frontend/pages/[category]/index.tsx
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function CategoryPage() {
  const { query, isReady } = useRouter();
  
  // category slug'ını router'dan al
  const categorySlug = query.category as string;

  // Kategorinin kendi bilgilerini ve ürünlerini çek
  const { data: category, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category", categorySlug],
    queryFn: () => api.get(`/categories/${categorySlug}`).then(r => r.data),
    enabled: isReady && !!categorySlug,
  });

  const { data: products, isLoading: areProductsLoading } = useQuery({
    queryKey: ["products", categorySlug],
    queryFn: () => api.get(`/products?category=${categorySlug}`).then(r => r.data),
    enabled: isReady && !!categorySlug,
  });

  const isLoading = isCategoryLoading || areProductsLoading;

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Başlık Bölümü */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {category?.name || 'Ürünler'}
              </h1>
              {category?.description && (
                <p className="text-white/90 text-lg max-w-2xl mx-auto drop-shadow">
                  {category.description}
                </p>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <p className="text-white text-lg">Yükleniyor...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((p: any) => (
                <div key={p.id} className="group">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <ProductCard item={p} type="product" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {products && products.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-12 border border-white/20 max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-4">Henüz Ürün Yok</h3>
                <p className="text-white/80">Bu kategoride henüz ürün bulunmamaktadır.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
