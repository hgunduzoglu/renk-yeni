// PATH: apps/frontend/pages/product/[slug].tsx
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function ProductDetail() {
  const { query } = useRouter();
  const { data: product } = useQuery({
    queryKey: ["product", query.slug],
    queryFn: () => api.get(`/products/${query.slug}`).then(r => r.data),
    enabled: !!query.slug
  });

  if (!product) return null;
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <img src={product.coverImage} className="w-full h-96 object-cover rounded-lg" />
        <h1 className="text-4xl font-bold mt-6">{product.name}</h1>
        <p className="mt-4 prose" dangerouslySetInnerHTML={{ __html: product.description }} />
        {product.warranty && (
          <p className="mt-4 text-sm text-gray-600">
            Garanti: {product.warranty}
          </p>
        )}
      </div>
    </Layout>
  );
}
