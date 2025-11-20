import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Linkedin, Youtube, Twitter } from 'lucide-react';
import { trackNewsletterSubscribe, trackExternalLink } from '@/lib/gtm';
import { getAttributionData } from '@/lib/tracking';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, introduce tu email');
      return;
    }

    if (!acceptsPrivacy) {
      toast.error('Debes aceptar la política de privacidad');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get attribution data (UTMs, referrer, landing page)
      const attribution = getAttributionData();
      
      // Make.com webhook integration
      const webhookUrl = 'https://hook.eu1.make.com/51rd4vhg2lk12ginkdnjwubjmmiinej0';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event_type: 'newsletter_subscription',
          email,
          timestamp: new Date().toISOString(),
          source: 'Nash Marketing Labs Website - Footer',
          // Attribution data
          ...attribution
        })
      });
      
      if (!response.ok) throw new Error('Error al suscribir');
      
      // Track newsletter subscription in GTM
      trackNewsletterSubscribe(email);
      
      toast.success('¡Gracias por suscribirte! Recibirás contenido de valor sobre PPC.');
      setEmail('');
      setAcceptsPrivacy(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al suscribirte. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo and Description */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-black mb-2">NML</div>
              <p className="text-white/80 text-sm leading-relaxed">
                Control y rentabilidad. Puro Performance PPC.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/enriquenasarre/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalLink('LinkedIn', 'https://www.linkedin.com/in/enriquenasarre/')}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.youtube.com/@nashmarketinglabs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalLink('YouTube', 'https://www.youtube.com/@nashmarketinglabs')}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://x.com/enasarrepuy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalLink('Twitter/X', 'https://x.com/enasarrepuy')}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Ecommerce
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Leads
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Medición y Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Automatización
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-lg font-bold mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('nosotros')}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('resultados')}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Casos de éxito
                </button>
              </li>
              <li>
                <Link href="/diagnostico">
                  <a className="text-white/80 hover:text-white transition-colors text-sm">
                    Diagnóstico gratuito
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/empleo">
                  <a className="text-white/80 hover:text-white transition-colors text-sm">
                    Empleo
                  </a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-white/80 text-sm mb-4">
              Recibe estrategias, casos de éxito y tips exclusivos de PPC cada semana
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                required
              />
              
              {/* RGPD Checkbox */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="newsletter-privacy"
                  checked={acceptsPrivacy}
                  onChange={(e) => setAcceptsPrivacy(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 cursor-pointer"
                  required
                />
                <label htmlFor="newsletter-privacy" className="text-xs text-white/70 cursor-pointer">
                  Acepto la{' '}
                  <a href="/privacidad" target="_blank" className="text-white hover:underline">
                    Política de Privacidad
                  </a>
                </label>
              </div>
              <Button
                type="submit"
                className="w-full gradient-orange text-white font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Suscribiendo...' : 'Me suscribo'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2025 Nash Marketing Labs. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="/privacidad"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Políticas de Privacidad
              </a>
              <a
                href="/cookies"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Políticas de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
