import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Başlık */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Hakkımızda</h1>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Ana İçerik Kartı */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="mb-8">
                <img 
                  src="/uploads/slider/202406-hero01.jpg" 
                  alt="Renk Gölgelendirme" 
                  className="w-full h-64 object-cover rounded-xl shadow-2xl"
                />
              </div>

              <div className="text-white space-y-6">
                <p className="text-xl font-medium leading-relaxed drop-shadow">
                  Renk Gölgelendirme Sistemleri, mekânın ruhunu yansıtan özel tasarımlarıyla, 
                  yıllarca modası geçmeyecek ve eskimeyecek ürünlere imzasını atıyor.
                </p>

                <p className="text-white/90 leading-relaxed">
                  Gölgelendirme sistemlerine butik üretim anlayışı kazandıran Renk Gölgelendirme Sistemleri, 
                  estetik, ergonomi ve yüksek kaliteyi bir arada kullanarak bulunduğu mekânları 
                  ayrıcalıklı kılıyor. Her biri alanında deneyimli uzman ekibiyle, satış öncesi ve 
                  sonrasında müşteri memnuniyetini garantileyen Renk Gölgelendirme Sistemleri, 
                  dış mekânlarına prestij kazandırmak isteyen Türkiye'nin önde gelen marka ve 
                  kuruluşlarının da ilk tercihi.
                </p>

                <p className="text-white/90 leading-relaxed">
                  Renk Gölgelendirme Sistemleri, ŞEMSİYE, PERGOLE ve TENTE üretiminin yanı sıra, 
                  yaşam alanlarında üst düzey konforu sağlayacak sıra dışı tasarımlarıyla da 
                  global bir marka olma yolunda ilerliyor.
                </p>
              </div>
            </div>

            {/* Vizyon ve Misyon Kartları */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 drop-shadow">Vizyonumuz</h2>
                </div>
                <p className="text-white/90 leading-relaxed text-center">
                  Türkiye'nin ve dünyanın gölgelendirme sistemleri sektöründe öncü firma 
                  olmak ve kaliteli ürünlerimizle müşterilerimizin yaşam kalitesini artırmak.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 drop-shadow">Misyonumuz</h2>
                </div>
                <p className="text-white/90 leading-relaxed text-center">
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