import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function Gallery() {
  const { data: albums, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: () => api.get("/gallery").then((r) => r.data),
  });

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Başlık */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Foto Galeri</h1>
              <p className="text-white/90 mt-2 drop-shadow">Projelerimizden örnekler</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <p className="text-white text-lg">Yükleniyor...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.isArray(albums) &&
                albums.map((a: any) => (
                  <Link href={`/gallery/${a.slug}`} key={a.id} className="group block">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <div className="overflow-hidden rounded-xl mb-4">
                        <img
                          src={a.images[0]?.url || "/placeholder.jpg"}
                          alt={a.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white mb-1 drop-shadow group-hover:text-yellow-300 transition-colors">
                          {a.name}
                        </h3>
                        <p className="text-white/70 text-sm drop-shadow">
                          {a.images?.length || 0} fotoğraf
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          {albums && albums.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-12 border border-white/20 max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-4">Henüz Albüm Yok</h3>
                <p className="text-white/80">Galeri albümleri yakında eklenecektir.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
