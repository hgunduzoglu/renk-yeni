// PATH: apps/frontend/pages/index.tsx
import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function Home() {
  /** TanStack Query → /api/categories */
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then((r) => r.data)
  });

  return (
    <Layout>
      {/* Hero arkaplan slider */}
      <HeroSlider />

      {/* Kategori Grid’i */}
      <section id="categories" className="container mx-auto -mt-screen pt-12">

        <h2 className="text-3xl font-semibold mb-6">Ürün Gruplarımız</h2>

        {/* Yükleniyor / Hata durumları */}
        {isLoading && <p>Yükleniyor…</p>}
        {error && <p className="text-red-500">Veri alınamadı.</p>}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(categories) &&
            categories.map((c: any) => (
              <ProductCard key={c.id} category={c} />
            ))}
        </div>
      </section>
    </Layout>
  );
}
