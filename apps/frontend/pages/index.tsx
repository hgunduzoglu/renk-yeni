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
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          {/* Başlık */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Ürün Grupları</h2>
              <p className="text-white/90 mt-2 drop-shadow">Kaliteli gölgelendirme çözümleri</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <p className="text-white text-lg">Yükleniyor...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.isArray(categories) &&
                categories.map((category: any) => (
                  <div key={category.id} className="group">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <ProductCard item={category} type="category" />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
