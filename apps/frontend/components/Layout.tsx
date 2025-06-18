// PATH: apps/frontend/components/Layout.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundSlider from "./BackgroundSlider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isHome = useRouter().pathname === "/";

  return (
    <>
      <Head>
        <title>Renk Gölgelendirme</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Arka plan slaytı: ana sayfa HARİÇ tüm sayfalarda */}
      {!isHome && <BackgroundSlider />}

      <div
        className={
          "relative flex flex-col " +
          (isHome ? "h-screen overflow-hidden" : "min-h-screen")
        }
      >
        <Navbar />

        {/* içerik */}
        <main className={isHome ? "flex-1 overflow-hidden" : "flex-1"}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
