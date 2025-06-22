import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";

export default function AlbumPage() {
  const { query, isReady } = useRouter();
  const albumSlug = query.album as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imagesPerPage = 12;

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", albumSlug],
    queryFn: () => api.get(`/gallery/${albumSlug}`).then((r) => r.data),
    enabled: isReady && !!albumSlug,
  });

  if (!album) return null;

  // Pagination hesaplamaları
  const totalImages = album?.images?.length || 0;
  const totalPages = Math.ceil(totalImages / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = album?.images?.slice(startIndex, endIndex) || [];

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Başlık Bölümü */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {album?.name}
              </h1>
              <p className="text-white/90 text-lg drop-shadow">
                {totalImages} fotoğraf
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <p className="text-white text-lg">Yükleniyor...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Galeri Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {currentImages.map((img: any, index: number) => (
                  <div key={img.id} className="group cursor-pointer">
                    <div 
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      onClick={() => setSelectedImage(img.url)}
                    >
                      <img
                        src={img.url}
                        alt={`${album.name} - ${startIndex + index + 1}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <div className="mt-3 text-center">
                        <span className="text-white/80 text-sm">
                          Fotoğraf {startIndex + index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                    <div className="flex items-center space-x-2">
                      {/* Önceki sayfa */}
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        ‹ Önceki
                      </button>

                      {/* Sayfa numaraları */}
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-2 rounded-lg transition-all ${
                              page === currentPage
                                ? 'bg-yellow-500 text-black font-semibold'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      {/* Sonraki sayfa */}
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Sonraki ›
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal - Büyük Resim Gösterimi */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Büyük görüntü"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
