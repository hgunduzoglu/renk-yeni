// PATH: apps/frontend/pages/product/[slug].tsx
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";

export default function ProductDetail() {
  const { query, isReady } = useRouter();
  const productSlug = query.slug as string;

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => api.get(`/products/${productSlug}`).then(r => r.data),
    enabled: isReady && !!productSlug,
  });
  
  const [mainImage, setMainImage] = useState(product?.coverImage);

  // Ürün yüklendiğinde veya değiştiğinde ana resmi güncelle
  useState(() => {
    if (product) setMainImage(product.coverImage);
  });

  if (isLoading) {
    return <Layout><p className="text-center py-12">Yükleniyor...</p></Layout>;
  }

  if (!product) {
    return <Layout><p className="text-center py-12">Ürün bulunamadı.</p></Layout>;
  }

  const allImages = [product.coverImage, ...product.images.map((img: any) => img.url)];

  return (
    <Layout>
      <div className="bg-white">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resim Galerisi */}
            <div>
              <img src={mainImage} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg mb-4" />
              <div className="flex gap-2 overflow-x-auto">
                {allImages.map((imgUrl: string, index: number) => (
                  <button key={index} onClick={() => setMainImage(imgUrl)} className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded">
                    <img src={imgUrl} alt={`${product.name} - ${index + 1}`} className="w-24 h-24 object-cover rounded-md border-2 hover:border-yellow-400 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Ürün Bilgileri */}
            <div className="prose max-w-none">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <span className="text-sm text-gray-500">Kategori: {product.category.name}</span>
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: product.description }} />
              {product.warranty && (
                <p className="mt-4 text-sm font-semibold text-gray-700">
                  Garanti: {product.warranty}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
