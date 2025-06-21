import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const mainMenuItems = [
  { label: "Ana Sayfa", english: "home", href: "/" },
  { label: "Kurumsal", english: "about us", href: "/about" },
  { label: "Ürünlerimiz", english: "products", href: "#", hasDropdown: true, type: "products" },
  { label: "Haberler", english: "news", href: "/news" },
  { label: "Galeri", english: "photo gallery", href: "/gallery", hasDropdown: true, type: "gallery" },
  { label: "İletişim", english: "contact us", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  
  // Desktop için aktif dropdown state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then((r) => r.data as any[]),
  });

  const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: () => api.get("/gallery").then((r) => r.data as any[]),
  });

  const closeMenus = () => {
    setMenuOpen(false);
    setProductsDropdownOpen(false);
    setGalleryDropdownOpen(false);
    setActiveDropdown(null);
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  // Desktop dropdown handler
  const handleMouseEnter = (type: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms gecikme
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setDropdownTimeout(timeout);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="backdrop-blur bg-black/80 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-[120px] relative z-10">
            <img
              src="/logo.svg"
              alt="RENK Gölgelendirme"
              className="h-10 w-auto object-contain"
              style={{ maxHeight: 40 }}
              onError={(e) => {
                console.log("Logo yüklenemedi");
                (e.target as HTMLImageElement).style.display = "none";
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent && !parent.querySelector('.logo-text')) {
                  const span = document.createElement('span');
                  span.className = 'logo-text text-2xl font-bold text-yellow-400';
                  span.textContent = 'RENK';
                  parent.appendChild(span);
                }
              }}
            />
            <span className="text-2xl font-bold text-yellow-400 logo-text hidden">RENK</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl z-10"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            ☰
          </button>

          {/* Mobile Menu */}
          <div
            className={clsx(
              "absolute left-0 right-0 top-full bg-black/95 p-6 transition-all duration-300 md:hidden z-40",
              isMenuOpen ? "block" : "hidden"
            )}
          >
            <ul className="flex flex-col gap-4 text-lg">
              {mainMenuItems.map((item) => (
                <li key={item.href}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          if (item.type === "products") {
                            setProductsDropdownOpen(!isProductsDropdownOpen);
                            setGalleryDropdownOpen(false);
                          } else if (item.type === "gallery") {
                            setGalleryDropdownOpen(!isGalleryDropdownOpen);
                            setProductsDropdownOpen(false);
                          }
                        }}
                        className="w-full flex justify-between items-center hover:text-yellow-400 text-left"
                      >
                        <div className="flex flex-col">
                          <span>{item.label}</span>
                          <span className="text-xs text-gray-400 uppercase">{item.english}</span>
                        </div>
                        <span className="text-xl">
                          {(item.type === "products" && isProductsDropdownOpen) || 
                           (item.type === "gallery" && isGalleryDropdownOpen) ? "−" : "+"}
                        </span>
                      </button>
                      
                      {/* Products Dropdown */}
                      {item.type === "products" && isProductsDropdownOpen && (
                        <div className="pl-4 mt-3 bg-black/50 rounded p-3">
                          <div className="mb-3">
                            <h4 className="text-yellow-400 text-sm font-semibold mb-2 uppercase">Ürün Gruplarımız</h4>
                            <ul className="space-y-2">
                              {Array.isArray(categories) &&
                                categories.map((cat) => (
                                  <li key={cat.id}>
                                    <Link 
                                      href={`/${cat.slug}`} 
                                      onClick={closeMenus} 
                                      className="block hover:text-yellow-400 py-1 text-sm"
                                    >
                                      {cat.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Gallery Dropdown */}
                      {item.type === "gallery" && isGalleryDropdownOpen && (
                        <div className="pl-4 mt-3 bg-black/50 rounded p-3">
                          <div className="mb-3">
                            <h4 className="text-yellow-400 text-sm font-semibold mb-2 uppercase">Videolarımız</h4>
                            <ul className="space-y-2">
                              <li>
                                <Link href="/gallery/videos" onClick={closeMenus} className="block hover:text-yellow-400 py-1 text-sm">
                                  Tüm Videolar
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-yellow-400 text-sm font-semibold mb-2 uppercase">Albümlerimiz</h4>
                            <ul className="space-y-2">
                              <li>
                                <Link href="/gallery" onClick={closeMenus} className="block hover:text-yellow-400 py-1 text-sm font-semibold">
                                  Tüm Albümler
                                </Link>
                              </li>
                              {Array.isArray(categories) &&
                                categories.map((cat) => (
                                  <li key={cat.id}>
                                    <Link 
                                      href={`/gallery?category=${cat.slug}`} 
                                      onClick={closeMenus} 
                                      className="block hover:text-yellow-400 py-1 text-sm"
                                    >
                                      {cat.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href} onClick={closeMenus} className="hover:text-yellow-400 flex flex-col">
                      <span>{item.label}</span>
                      <span className="text-xs text-gray-400 uppercase">{item.english}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-lg">
            {mainMenuItems.map((item) => (
              <li key={item.href} className="relative">
                {item.hasDropdown ? (
                  <>
                    <div 
                      className="cursor-pointer hover:text-yellow-400 transition-colors flex flex-col text-center py-2 px-2"
                      onMouseEnter={() => handleMouseEnter(item.type!)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-gray-400 uppercase">{item.english}</span>
                    </div>
                    
                    {/* Products Desktop Dropdown */}
                    {item.type === "products" && activeDropdown === "products" && (
                      <div 
                        className="absolute left-0 top-full w-64 bg-white text-black rounded-md shadow-xl z-50 border"
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="px-4 py-3 bg-gray-50 rounded-t-md border-b border-gray-200">
                          <h4 className="text-yellow-600 font-semibold text-sm uppercase">Ürün Gruplarımız</h4>
                        </div>
                        {Array.isArray(categories) &&
                          categories.map((cat, index) => (
                            <Link 
                              key={cat.id}
                              href={`/${cat.slug}`} 
                              className={clsx(
                                "block px-4 py-3 hover:bg-gray-100 transition-colors",
                                index === categories.length - 1 ? "rounded-b-md" : ""
                              )}
                              onClick={closeMenus}
                            >
                              {cat.name}
                            </Link>
                          ))}
                      </div>
                    )}

                    {/* Gallery Desktop Dropdown */}
                    {item.type === "gallery" && activeDropdown === "gallery" && (
                      <div 
                        className="absolute left-0 top-full w-64 bg-white text-black rounded-md shadow-xl z-50 border"
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        {/* Videolarımız Section */}
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-md">
                          <h4 className="text-yellow-600 font-semibold text-sm uppercase">Videolarımız</h4>
                        </div>
                        <Link 
                          href="/gallery/videos" 
                          className="block px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-200"
                          onClick={closeMenus}
                        >
                          Tüm Videolar
                        </Link>

                        {/* Albümlerimiz Section */}
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                          <h4 className="text-yellow-600 font-semibold text-sm uppercase">Albümlerimiz</h4>
                        </div>
                        <Link 
                          href="/gallery" 
                          className="block px-4 py-3 hover:bg-gray-100 transition-colors font-semibold border-b border-gray-200"
                          onClick={closeMenus}
                        >
                          Tüm Albümler
                        </Link>
                        {Array.isArray(categories) &&
                          categories.map((cat, index) => (
                            <Link 
                              key={cat.id}
                              href={`/gallery?category=${cat.slug}`} 
                              className={clsx(
                                "block px-4 py-3 hover:bg-gray-100 transition-colors",
                                index === categories.length - 1 ? "rounded-b-md" : "",
                                index === 0 ? "" : "border-t border-gray-100"
                              )}
                              onClick={closeMenus}
                            >
                              {cat.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="hover:text-yellow-400 transition-colors flex flex-col text-center py-2 px-2">
                    <span>{item.label}</span>
                    <span className="text-xs text-gray-400 uppercase">{item.english}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
