import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function NewsDetail() {
  const { query, isReady } = useRouter();
  const newsSlug = query.slug as string;

  const { data: newsItem, isLoading } = useQuery({
    queryKey: ["news", newsSlug],
    queryFn: () => api.get(`/news/${newsSlug}`).then((r) => r.data),
    enabled: isReady && !!newsSlug,
  });

  if (isLoading) {
    return <Layout><p className="text-center py-12">Yükleniyor...</p></Layout>;
  }

  if (!newsItem) {
    return <Layout><p className="text-center py-12">Haber bulunamadı.</p></Layout>;
  }

  return (
    <Layout>
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 prose lg:prose-xl">
          <h1 className="text-4xl font-bold mb-4">{newsItem.title}</h1>
          <p className="text-gray-500 text-sm mb-8">
            Yayınlanma Tarihi: {new Date(newsItem.createdAt).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {newsItem.coverImage && <img src={newsItem.coverImage} alt={newsItem.title} className="w-full h-auto rounded-lg mb-8" />}
          <div dangerouslySetInnerHTML={{ __html: newsItem.body }} />
        </div>
      </div>
    </Layout>
  );
} 