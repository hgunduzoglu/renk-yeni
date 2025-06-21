import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="bg-white py-12 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Hakkımızda</h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <img 
                src="/uploads/slider/202406-hero01.jpg" 
                alt="Renk Gölgelendirme" 
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
              />
            </div>

            <div className="text-gray-700 leading-relaxed space-y-6">
              <p className="text-xl text-gray-800 font-medium">
                Renk Gölgelendirme Sistemleri, mekânın ruhunu yansıtan özel tasarımlarıyla, 
                yıllarca modası geçmeyecek ve eskimeyecek ürünlere imzasını atıyor.
              </p>

              <p>
                Gölgelendirme sistemlerine butik üretim anlayışı kazandıran Renk Gölgelendirme Sistemleri, 
                estetik, ergonomi ve yüksek kaliteyi bir arada kullanarak bulunduğu mekânları 
                ayrıcalıklı kılıyor. Her biri alanında deneyimli uzman ekibiyle, satış öncesi ve 
                sonrasında müşteri memnuniyetini garantileyen Renk Gölgelendirme Sistemleri, 
                dış mekânlarına prestij kazandırmak isteyen Türkiye'nin önde gelen marka ve 
                kuruluşlarının da ilk tercihi.
              </p>

              <p>
                Renk Gölgelendirme Sistemleri, ŞEMSİYE, PERGOLE ve TENTE üretiminin yanı sıra, 
                yaşam alanlarında üst düzey konforu sağlayacak sıra dışı tasarımlarıyla da 
                global bir marka olma yolunda ilerliyor.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h2 className="text-2xl font-semibold mb-4">Vizyonumuz</h2>
                <p>
                  Türkiye'nin ve dünyanın gölgelendirme sistemleri sektöründe öncü firma 
                  olmak ve kaliteli ürünlerimizle müşterilerimizin yaşam kalitesini artırmak.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Misyonumuz</h2>
                <p>
                  Estetik, fonksiyonellik ve dayanıklılığı bir araya getiren gölgelendirme 
                  sistemleri üreterek, müşterilerimizin açık alan deneyimlerini en üst seviyeye çıkarmak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 