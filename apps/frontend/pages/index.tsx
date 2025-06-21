import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function Home() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then((r) => r.data),
  });

  return (
    <Layout>
      <HeroSlider />
      <section id="categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Ürün Grupları</h2>
          {isLoading ? (
            <p className="text-center">Yükleniyor...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.isArray(categories) &&
                categories.map((category: any) => (
                  <ProductCard key={category.id} item={category} type="category" />
                ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
