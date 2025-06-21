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
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">{category?.name || 'Ürünler'}</h1>
          
          {isLoading ? (
            <p className="text-center">Yükleniyor...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((p: any) => (
                <ProductCard key={p.id} item={p} type="product" />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
