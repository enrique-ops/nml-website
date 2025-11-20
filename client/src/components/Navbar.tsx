import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { trackCTAClick } from '@/lib/gtm';

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      // If not on home page, navigate to home first
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-2 group cursor-pointer">
                <div className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">
                  NML
                </div>
                <div className="hidden md:block text-sm font-medium text-muted-foreground">
                  Nash Marketing Labs
                </div>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('proceso')}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Proceso
            </button>
            <button
              onClick={() => scrollToSection('resultados')}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Resultados
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Nosotros
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick('1ª Consulta Gratis', 'navbar');
                scrollToSection('contacto');
              }}
              className="gradient-orange text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              1ª Consulta Gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-secondary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <div className="container py-6 space-y-4">
              <button
                onClick={() => scrollToSection('servicios')}
                className="block w-full text-left py-2 text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('proceso')}
                className="block w-full text-left py-2 text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                Proceso
              </button>
              <button
                onClick={() => scrollToSection('resultados')}
                className="block w-full text-left py-2 text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                Resultados
              </button>
              <button
                onClick={() => scrollToSection('nosotros')}
                className="block w-full text-left py-2 text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                Nosotros
              </button>
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('contacto')}
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Contacto
                </Button>
                <Button
                  onClick={() => {
                    trackCTAClick('1ª Consulta Gratis', 'navbar_mobile');
                    window.open('https://calendly.com/nasarre/60min', '_blank');
                  }}
                  className="w-full gradient-orange text-white font-semibold"
                >
                  1ª Consulta Gratis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
