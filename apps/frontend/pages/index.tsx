import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  // Ürün grupları grid'i kaldırıldı – tamamen hero'dan oluşan sayfa
  return (
    <Layout>
      <HeroSlider />
      {/* İstersen gelecekte ek içerik buraya */}
    </Layout>
  );
}
