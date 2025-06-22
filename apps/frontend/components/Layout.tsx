// PATH: apps/frontend/components/Layout.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundSlider from "./BackgroundSlider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isHome = useRouter().pathname === "/";

  // Anasayfada body scroll'unu engelle
  useEffect(() => {
    if (isHome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isHome]);

  return (
    <>
      <Head>
        <title>Renk Gölgelendirme</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Arka plan slaytı: tüm sayfalarda */}
      <BackgroundSlider />

      <div
        className={
          "relative flex flex-col min-h-screen " +
          (isHome ? "h-screen overflow-hidden" : "")
        }
      >
        <Navbar />

        {/* içerik */}
        <main className={isHome ? "flex-1 overflow-hidden p-0" : "flex-1"}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
