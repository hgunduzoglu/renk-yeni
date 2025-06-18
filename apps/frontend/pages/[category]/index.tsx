// PATH: apps/frontend/pages/[category]/index.tsx
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function CategoryPage() {
  const { query } = useRouter();
  const { data: products } = useQuery({
    queryKey: ["products", query.category],
    queryFn: () => api.get(`/products?category=${query.category}`).then(r => r.data),
    enabled: !!query.category
  });

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">{query.category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((p: any) => (
            <ProductCard key={p.id} category={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
