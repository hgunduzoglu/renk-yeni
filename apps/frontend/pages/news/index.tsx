import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function NewsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.get("/news").then((r) => r.data)
  });

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Bizden Haberler</h1>
        {isLoading && <p>Yükleniyor...</p>}
        <ul className="space-y-4">
          {Array.isArray(data) &&
            data.map((n: any) => (
              <li key={n.id}>
                <Link href={`/news/${n.slug}`} className="text-blue-600 underline">
                  {n.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
}
