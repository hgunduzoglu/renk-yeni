import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function NewsList() {
  const { data: news, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.get("/news").then((r) => r.data as any[]),
  });

  return (
    <Layout>
      <div className="bg-white py-12 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Bizden Haberler</h1>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2">Yükleniyor...</p>
            </div>
          ) : Array.isArray(news) && news.length > 0 ? (
            <ul className="space-y-6">
              {news.map((n: any) => (
                <li key={n.id} className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {n.coverImage && (
                    <img 
                      src={n.coverImage} 
                      alt={n.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-2xl font-semibold mb-2">{n.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {new Date(n.createdAt).toLocaleDateString("tr-TR", { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {n.body.replace(/<[^>]*>/g, '').substring(0, 200)}...
                  </p>
                  <Link 
                    href={`/news/${n.slug}`} 
                    className="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
                  >
                    Devamını Oku →
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Henüz haber bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
