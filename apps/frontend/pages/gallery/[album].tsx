import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AlbumPage() {
  const { query } = useRouter();
  const { data } = useQuery({
    queryKey: ["album", query.album],
    queryFn: () => api.get(`/gallery/${query.album}`).then((r) => r.data),
    enabled: !!query.album
  });

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">{data?.name}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.images.map((img: any) => (
            <img
              key={img.id}
              src={img.url}
              className="w-full h-48 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
