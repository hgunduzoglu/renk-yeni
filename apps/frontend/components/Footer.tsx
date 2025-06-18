// PATH: apps/frontend/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <p>&copy; {new Date().getFullYear()} Renk Gölgelendirme</p>
          <nav className="flex gap-6 text-sm">
            <a href="mailto:info@renkgolgelendirme.com" className="hover:text-white">E-posta</a>
            <a href="tel:+90xxxxxxxxxx" className="hover:text-white">Telefon</a>
          </nav>
        </div>
      </footer>
    );
  }
  