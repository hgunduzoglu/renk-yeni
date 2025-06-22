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
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Başlık */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Bizden Haberler</h1>
              <p className="text-white/90 mt-2 drop-shadow">Güncel haberler ve duyurular</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <p className="text-white text-lg">Yükleniyor...</p>
                </div>
              </div>
            </div>
          ) : Array.isArray(news) && news.length > 0 ? (
            <div className="space-y-8">
              {news.map((n: any) => (
                <article key={n.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
                  {n.coverImage && (
                    <div className="overflow-hidden rounded-xl mb-6">
                      <img 
                        src={n.coverImage} 
                        alt={n.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg group-hover:text-yellow-300 transition-colors">
                      {n.title}
                    </h2>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-white/70 text-sm">
                        {new Date(n.createdAt).toLocaleDateString("tr-TR", { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    
                    <p className="text-white/90 leading-relaxed">
                      {n.body.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                    
                    <div className="pt-4">
                      <Link 
                        href={`/news/${n.slug}`} 
                        className="inline-flex items-center gap-2 bg-yellow-400/90 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 backdrop-blur-sm"
                      >
                        Devamını Oku 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-12 border border-white/20 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Henüz Haber Yok</h3>
                <p className="text-white/80">Haberler yakında yayınlanacaktır.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
