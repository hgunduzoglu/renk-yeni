import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function NewsDetail() {
  const { query, isReady } = useRouter();
  const newsSlug = query.slug as string;

  const { data: newsItem, isLoading } = useQuery({
    queryKey: ["news", newsSlug],
    queryFn: () => api.get(`/news/${newsSlug}`).then((r) => r.data),
    enabled: isReady && !!newsSlug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <p className="text-white text-lg">Yükleniyor...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!newsItem) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-12 border border-white/20 max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Haber Bulunamadı</h3>
            <p className="text-white/80 mb-6">Aradığınız haber mevcut değil.</p>
            <Link 
              href="/news" 
              className="inline-flex items-center gap-2 bg-yellow-400/90 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              Haberlere Dön
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Geri Dön Butonu */}
          <div className="mb-8">
            <Link 
              href="/news" 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Haberlere Dön
            </Link>
          </div>

          {/* Ana İçerik */}
          <article className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {/* Başlık ve Tarih */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4">
                {newsItem.title}
              </h1>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/80 text-lg">
                  {new Date(newsItem.createdAt).toLocaleDateString("tr-TR", { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </header>

            {/* Kapak Resmi */}
            {newsItem.coverImage && (
              <div className="overflow-hidden rounded-xl mb-8">
                <img 
                  src={newsItem.coverImage} 
                  alt={newsItem.title} 
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>
            )}

            {/* İçerik */}
            <div 
              className="prose prose-lg max-w-none text-white/90 leading-relaxed"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
              }}
              dangerouslySetInnerHTML={{ __html: newsItem.body }} 
            />
          </article>

          {/* Alt Navigasyon */}
          <div className="mt-8 text-center">
            <Link 
              href="/news" 
              className="inline-flex items-center gap-2 bg-yellow-400/90 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Tüm Haberleri Görüntüle
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 