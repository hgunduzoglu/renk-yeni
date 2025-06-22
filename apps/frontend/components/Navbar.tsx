import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Image from "next/image";

const mainMenuItems = [
  { label: "Ana Sayfa", english: "home", href: "/" },
  { label: "Kurumsal", english: "about us", href: "/about" },
  { label: "Ürünlerimiz", english: "products", href: "#", hasDropdown: true, type: "products" },
  { label: "Haberler", english: "news", href: "/news" },
  { label: "Galeri", english: "photo gallery", href: "/gallery", hasDropdown: true, type: "gallery" },
  { label: "İletişim", english: "contact us", href: "/contact" },
];

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  
  // Desktop için hover state
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then((r) => r.data as any[]),
  });

  const { data: albums, isLoading: albumsLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: () => api.get("/gallery").then((r) => r.data as any[]),
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [categoriesState, setCategoriesState] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategoriesState(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch categories:', response.status);
          // Fallback kategoriler
          setCategoriesState([
            { id: 1, name: 'Cam', slug: 'cam' },
            { id: 2, name: 'Şemsiye', slug: 'semsiye' },
            { id: 3, name: 'Pergole', slug: 'pergole' },
            { id: 4, name: 'Özel Üretim Gölgelendirme Sistemleri', slug: 'ozeluretimgolgelendirmesistemleri' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback kategoriler
        setCategoriesState([
          { id: 1, name: 'Cam', slug: 'cam' },
          { id: 2, name: 'Şemsiye', slug: 'semsiye' },
          { id: 3, name: 'Pergole', slug: 'pergole' },
          { id: 4, name: 'Özel Üretim Gölgelendirme Sistemleri', slug: 'ozeluretimgolgelendirmesistemleri' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDropdownToggle = (menu: string) => {
    setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(null);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProductsDropdownOpen(false);
    setGalleryDropdownOpen(false);
    setHoveredItem(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="backdrop-blur bg-black/80 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-[120px] relative z-10">
            <Image
            src="/logo.svg"
              alt="RENK Gölgelendirme"
              width={40}
              height={40}
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
                      
                      {/* Products Mobile Dropdown */}
                      {item.type === "products" && isProductsDropdownOpen && (
                        <div className="pl-4 mt-3 bg-black/50 rounded p-3">
                          <h4 className="text-yellow-400 text-sm font-semibold mb-2 uppercase">Ürün Gruplarımız</h4>
                          {isLoading ? (
                            <p className="text-gray-400 text-sm">Yükleniyor...</p>
                          ) : categoriesState.length > 0 ? (
                            <ul className="space-y-2">
                              {categoriesState.map((cat) => (
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
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">Kategori bulunamadı</div>
                          )}
                        </div>
                      )}

                      {/* Gallery Mobile Dropdown */}
                      {item.type === "gallery" && isGalleryDropdownOpen && (
                        <div className="pl-4 mt-3 bg-black/50 rounded p-3">
                          <div className="mb-4">
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
                              {isLoading ? (
                                <li><p className="text-gray-400 text-sm">Yükleniyor...</p></li>
                              ) : categoriesState.length > 0 ? (
                                categoriesState.map((cat) => (
                                  <li key={cat.id}>
                                    <Link 
                                      href={`/gallery?category=${cat.slug}`} 
                                      onClick={closeMenus} 
                                      className="block hover:text-yellow-400 py-1 text-sm"
                                    >
                                      {cat.name}
                                    </Link>
                                  </li>
                                ))
                              ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">Kategori bulunamadı</div>
                              )}
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
          <ul className="hidden md:flex items-center gap-6 font-medium text-lg">
            {mainMenuItems.map((item) => (
              <li key={item.href} className="relative group">
                {item.hasDropdown ? (
                  <div className="relative">
                    <div 
                      className="cursor-pointer hover:text-yellow-400 transition-colors flex flex-col text-center py-4 px-3"
                      onMouseEnter={() => setHoveredItem(item.type!)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-gray-400 uppercase">{item.english}</span>
                    </div>
                    
                    {/* Desktop Dropdown Container */}
                    <div 
                      className={clsx(
                        "absolute left-0 top-full w-72 bg-white text-black rounded-md shadow-2xl border transition-all duration-200 z-50",
                        hoveredItem === item.type ? "opacity-100 visible" : "opacity-0 invisible"
                      )}
                      onMouseEnter={() => setHoveredItem(item.type!)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Products Desktop Dropdown */}
                      {item.type === "products" && (
                        <>
                          <div className="px-4 py-3 bg-yellow-50 rounded-t-md border-b border-gray-200">
                            <h4 className="text-yellow-700 font-bold text-sm uppercase tracking-wide">Ürün Gruplarımız</h4>
                          </div>
                          {isLoading ? (
                            <div className="px-4 py-3">
                              <p className="text-gray-500 text-sm">Yükleniyor...</p>
                            </div>
                          ) : categoriesState.length > 0 ? (
                            <ul className="space-y-2">
                              {categoriesState.map((cat, index) => (
                                <li key={cat.id}>
                                  <Link 
                                    href={`/${cat.slug}`} 
                                    className={clsx(
                                      "block px-4 py-3 hover:bg-yellow-50 hover:text-yellow-700 transition-colors font-medium",
                                      index === categoriesState.length - 1 ? "rounded-b-md" : "border-b border-gray-100"
                                    )}
                                    onClick={closeMenus}
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="px-4 py-3 text-gray-500 text-sm">Kategori bulunamadı</div>
                          )}
                        </>
                      )}

                      {/* Gallery Desktop Dropdown */}
                      {item.type === "gallery" && (
                        <>
                          {/* Videolarımız Section */}
                          <div className="px-4 py-3 bg-blue-50 rounded-t-md border-b border-gray-200">
                            <h4 className="text-blue-700 font-bold text-sm uppercase tracking-wide">Videolarımız</h4>
                          </div>
                          <Link 
                            href="/gallery/videos" 
                            className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-200 font-medium"
                            onClick={closeMenus}
                          >
                            Tüm Videolar
                          </Link>

                          {/* Albümlerimiz Section */}
                          <div className="px-4 py-3 bg-green-50 border-b border-gray-200">
                            <h4 className="text-green-700 font-bold text-sm uppercase tracking-wide">Albümlerimiz</h4>
                          </div>
                          <Link 
                            href="/gallery" 
                            className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors font-bold border-b border-gray-200"
                            onClick={closeMenus}
                          >
                            Tüm Albümler
                          </Link>
                          {isLoading ? (
                            <div className="px-4 py-3">
                              <p className="text-gray-500 text-sm">Yükleniyor...</p>
                            </div>
                          ) : categoriesState.length > 0 ? (
                            <ul className="space-y-2">
                              {categoriesState.map((cat, index) => (
                                <li key={cat.id}>
                                  <Link 
                                    href={`/gallery?category=${cat.slug}`} 
                                    className={clsx(
                                      "block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors font-medium",
                                      index === categoriesState.length - 1 ? "rounded-b-md" : "border-b border-gray-100"
                                    )}
                                    onClick={closeMenus}
                                  >
                                    {cat.name}
              </Link>
            </li>
          ))}
        </ul>
                          ) : (
                            <div className="px-4 py-3 text-gray-500 text-sm">Kategori bulunamadı</div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link href={item.href} className="hover:text-yellow-400 transition-colors flex flex-col text-center py-4 px-3">
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
