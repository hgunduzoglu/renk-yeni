import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AlbumPage() {
  const { query, isReady } = useRouter();
  const albumSlug = query.album as string;

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", albumSlug],
    queryFn: () => api.get(`/gallery/${albumSlug}`).then((r) => r.data),
    enabled: isReady && !!albumSlug,
  });

  return (
    <Layout>
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">{album?.name}</h1>
          {isLoading ? (
            <p className="text-center">Yükleniyor...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {album?.images.map((img: any) => (
                <a href={img.url} target="_blank" rel="noopener noreferrer" key={img.id}>
                  <img
                    src={img.url}
                    alt={`${album.name} - ${img.id}`}
                    className="w-full h-48 object-cover rounded-md shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
