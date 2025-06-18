import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundSlider from "./BackgroundSlider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Renk Gölgelendirme</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Global arkaplan */}
      <BackgroundSlider />

      {/* Sayfa içeriği */}
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
