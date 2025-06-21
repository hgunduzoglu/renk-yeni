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
      <div className="bg-white py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Foto Galeri</h1>
          {isLoading ? (
            <p className="text-center">Yükleniyor...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.isArray(albums) &&
                albums.map((a: any) => (
                  <Link href={`/gallery/${a.slug}`} key={a.id} className="group block text-center">
                    <div className="overflow-hidden rounded-lg shadow-md">
                      <img
                        src={a.images[0]?.url || "/placeholder.jpg"}
                        alt={a.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-3 font-semibold group-hover:text-yellow-600 transition">{a.name}</p>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
