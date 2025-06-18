import Layout from "@/components/Layout";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-xl">
        <h1 className="text-3xl font-bold mb-6">İletişim Formu</h1>
        <form className="space-y-4">
          <input className="w-full border p-2" placeholder="Ad / Soyad" />
          <input className="w-full border p-2" placeholder="Telefon" />
          <input className="w-full border p-2" placeholder="E-posta" />
          <textarea className="w-full border p-2 h-32" placeholder="Mesaj" />
          <button className="px-6 py-2 bg-black text-white">Gönder</button>
        </form>
      </div>
    </Layout>
  );
}
