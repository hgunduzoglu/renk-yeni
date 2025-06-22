import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Image from "next/image";
import CartIcon from "./CartIcon";

const mainMenuItems = [
  { label: "Ana Sayfa", english: "home", href: "/" },
  { label: "Hakkımızda", english: "about us", href: "/about" },
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
              src="/logo.png"
              alt="RENK Gölgelendirme"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6 text-base">
              {mainMenuItems.map((item) => (
                <li key={item.href} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.type!)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="cursor-pointer hover:text-yellow-400 flex flex-col text-center">
                        <span>{item.label}</span>
                        <span className="text-xs text-gray-300 uppercase">{item.english}</span>
                      </span>

                      {/* Dropdown Menu */}
                      {hoveredItem === item.type && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl min-w-[280px] z-50">
                          {item.type === "products" && (
                            <div className="p-4">
                              <h4 className="text-yellow-400 text-sm font-semibold mb-3 uppercase border-b border-gray-700 pb-2">
                                Ürün Gruplarımız
                              </h4>
                              {isLoading ? (
                                <p className="text-gray-400 text-sm py-2">Yükleniyor...</p>
                              ) : categoriesState.length > 0 ? (
                                <ul className="space-y-2">
                                  {categoriesState.map((cat) => (
                                    <li key={cat.id}>
                                      <Link 
                                        href={`/${cat.slug}`} 
                                        onClick={closeMenus} 
                                        className="block hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded transition-colors text-sm"
                                      >
                                        {cat.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">Kategori bulunamadı</div>
                              )}
                            </div>
                          )}

                          {item.type === "gallery" && (
                            <div className="p-4">
                              <div className="mb-4">
                                <h4 className="text-yellow-400 text-sm font-semibold mb-3 uppercase border-b border-gray-700 pb-2">
                                  Videolarımız
                                </h4>
                                <ul className="space-y-2 mb-4">
                                  <li>
                                    <Link href="/gallery/videos" onClick={closeMenus} className="block hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded transition-colors text-sm">
                                      Tüm Videolar
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="text-yellow-400 text-sm font-semibold mb-3 uppercase border-b border-gray-700 pb-2">
                                  Albümlerimiz
                                </h4>
                                {isLoading ? (
                                  <p className="text-gray-400 text-sm py-2">Yükleniyor...</p>
                                ) : categoriesState.length > 0 ? (
                                  <ul className="space-y-2">
                                    {categoriesState.map((cat) => (
                                      <li key={cat.id}>
                                        <Link 
                                          href={`/gallery/${cat.slug}`} 
                                          onClick={closeMenus} 
                                          className="block hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded transition-colors text-sm"
                                        >
                                          {cat.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className="px-3 py-2 text-sm text-gray-500">Albüm bulunamadı</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href} className="hover:text-yellow-400 flex flex-col text-center">
                      <span>{item.label}</span>
                      <span className="text-xs text-gray-300 uppercase">{item.english}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Cart Icon for Desktop */}
            <CartIcon />
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart Icon for Mobile */}
            <CartIcon />

            <button
              className="text-2xl z-10"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Menüyü Aç/Kapat"
            >
            ☰
          </button>
          </div>

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
        </div>
      </nav>
    </header>
  );
}
