import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function Home() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then((r) => r.data)
  });

  return (
    <Layout>
      <HeroSlider />
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold mb-6">Ürün Gruplarımız</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((c: any) => (
            <ProductCard key={c.id} category={c} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
