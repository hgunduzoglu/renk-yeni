// PATH: apps/frontend/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-8 mt-0 border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full md:w-auto">
            <span className="text-sm">&copy; {new Date().getFullYear()} Renk Gölgelendirme</span>
            <span className="hidden md:inline-block text-gray-500">|</span>
            <span className="text-sm">Fabrika: Uzayçağı Cad. 1161. Sok. No:16 Ostim Yenimahalle / ANKARA</span>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="mailto:info@renkgolgelendirme.com" className="hover:text-white transition">E-posta</a>
            <a href="tel:+903122782393" className="hover:text-white transition">Telefon</a>
          </nav>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-white"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.635.401 3.661 1.375c-.974.974-1.247 2.11-1.305 3.391C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.613.058 1.281.331 2.417 1.305 3.391.974.974 2.11 1.247 3.391 1.305C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.417-.331 3.391-1.305.974-.974 1.247-2.11 1.305-3.391.058-1.281.07-1.69.07-7.613 0-5.923-.012-6.332-.07-7.613-.058-1.281-.331-2.417-1.305-3.391-.974-.974-2.11-1.247-3.391-1.305C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
          </div>
        </div>
      </footer>
    );
  }
  