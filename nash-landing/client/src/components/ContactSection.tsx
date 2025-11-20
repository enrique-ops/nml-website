import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { trackFormSubmit, trackCalendlyOpen } from '@/lib/gtm';
import { getAttributionData } from '@/lib/tracking';

export default function ContactSection() {
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(false);
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !businessType) {
      toast.error('Por favor, completa todos los campos');
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
          event_type: 'contact_form',
          email, 
          businessType,
          newsletter_subscription: newsletterSubscription,
          timestamp: new Date().toISOString(),
          source: 'Nash Marketing Labs Website',
          // Attribution data
          ...attribution
        })
      });
      
      if (!response.ok) throw new Error('Error al enviar');
      
      // Track form submission in GTM
      trackFormSubmit('contact_form', {
        business_type: businessType,
        email_domain: email.split('@')[1]
      });
      
      toast.success('¡Solicitud enviada! Te contactaremos pronto.');
      setEmail('');
      setBusinessType('');
      setAcceptsPrivacy(false);
      setNewsletterSubscription(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al enviar. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                ¿Listo para mejorar tu ROAS y reducir tu CPL?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Primera consulta gratuita. Sin compromiso. Resultados reales basados en matemáticas y metodología probada.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Mail className="text-secondary" size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Email</div>
                  <div>clientes@nashmarketinglabs.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Phone className="text-secondary" size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Teléfono</div>
                  <div>Disponible tras la consulta</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="text-secondary" size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Ubicación</div>
                  <div>Trabajamos con clientes globalmente</div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Respuesta en menos de 24 horas</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Consulta inicial 100% gratuita</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sin compromiso ni permanencia</span>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Agenda tu consulta gratuita
                </h3>
                <p className="text-muted-foreground">
                  Completa el formulario y nos pondremos en contacto contigo
                </p>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email corporativo
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Business Type Select */}
              <div className="space-y-2">
                <label htmlFor="businessType" className="text-sm font-medium text-foreground">
                  Tipo de negocio
                </label>
                <select
                  id="businessType"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="leads">Generación de Leads</option>
                  <option value="both">Ambos</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {/* RGPD Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={acceptsPrivacy}
                  onChange={(e) => setAcceptsPrivacy(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                  He leído y acepto la{' '}
                  <a href="/privacidad" target="_blank" className="text-primary hover:underline font-medium">
                    Política de Privacidad
                  </a>{' '}
                  y el tratamiento de mis datos para gestionar mi solicitud.
                </label>
              </div>

              {/* Newsletter Checkbox (Optional) */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletterSubscription}
                  onChange={(e) => setNewsletterSubscription(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                />
                <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                  Quiero recibir newsletter con estrategias, casos de éxito y novedades de PPC <span className="text-xs italic">(opcional)</span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full gradient-orange text-white font-semibold text-lg py-6 shadow-lg hover:shadow-xl transition-all group"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    Solicitar consulta gratuita
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </Button>
            </form>

            {/* Alternative CTA */}
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-4">
                ¿Prefieres agendar directamente?
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  trackCalendlyOpen('contact_section');
                  window.open('https://calendly.com/nasarre/60min', '_blank');
                }}
              >
                Agenda una llamada
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
