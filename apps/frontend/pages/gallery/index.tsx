import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function Gallery() {
  const { data } = useQuery({
    queryKey: ["albums"],
    queryFn: () => api.get("/gallery").then((r) => r.data)
  });

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Foto Galeri</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(data) &&
            data.map((a: any) => (
              <Link href={`/gallery/${a.slug}`} key={a.id} className="block">
                <img
                  src={a.images[0]?.url || "/placeholder.jpg"}
                  className="w-full h-48 object-cover rounded-md"
                />
                <p className="mt-2 text-center">{a.name}</p>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
}
