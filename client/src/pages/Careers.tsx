import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Briefcase, Users, TrendingUp, Clock, MapPin, GraduationCap, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trackFormSubmit } from '@/lib/gtm';
import { getAttributionData } from '@/lib/tracking';

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    message: ''
  });
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(false);
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, completa todos los campos obligatorios');
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
          event_type: 'job_application',
          ...formData,
          newsletter_subscription: newsletterSubscription,
          timestamp: new Date().toISOString(),
          source: 'Nash Marketing Labs Website - Careers Page',
          // Attribution data
          ...attribution
        })
      });
      
      if (!response.ok) throw new Error('Error al enviar');
      
      // Track form submission in GTM
      trackFormSubmit('careers_form', {
        has_linkedin: formData.linkedin ? 'yes' : 'no',
        email_domain: formData.email.split('@')[1]
      });
      
      toast.success('¡Solicitud enviada! Revisa tu email (spam incluido) con las instrucciones para el proceso de selección. ¡Mucha suerte!');
      setFormData({ name: '', email: '', phone: '', linkedin: '', message: '' });
      setAcceptsPrivacy(false);
      setNewsletterSubscription(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al enviar. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: MapPin,
      title: '100% Remoto Real',
      description: 'Trabaja desde donde quieras. Sin oficinas, sin desplazamientos. Libertad geográfica total.'
    },
    {
      icon: Clock,
      title: 'Jornada 100% Flexible',
      description: 'Tú organizas tu horario de trabajo. Conciliación real con tu vida personal.'
    },
    {
      icon: GraduationCap,
      title: 'Formación Continua',
      description: 'Acceso a cursos, certificaciones y recursos para seguir creciendo profesionalmente.'
    },
    {
      icon: TrendingUp,
      title: 'Proyectos Retadores',
      description: 'Trabaja con clientes que invierten millones en PPC. Aprende de casos reales de alto impacto.'
    },
    {
      icon: Users,
      title: 'Equipo de Alto Nivel',
      description: 'Colabora con expertos en PPC, analytics y performance marketing.'
    },
    {
      icon: Briefcase,
      title: 'Metodología Propia',
      description: 'Aprende nuestra "Ingeniería de PPC" basada en datos y resultados medibles.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                Trabaja con nosotros
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                ¡Forma parte del equipo Nash!
              </p>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                Siempre estamos buscando talento. El talento es lo más preciado hoy en día para cualquier compañía.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-10 md:p-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  ¿Qué hacemos en Nash Marketing Labs?
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Si estás aquí, ya sabes lo que hacemos: nos dedicamos a llevar el PPC de las empresas al siguiente nivel.
                  </p>
                  <p>
                    Basándonos en datos, hacemos lo que hemos llamado <strong className="text-foreground">"Ingeniería de PPC"</strong>. 
                    No es marketing tradicional, es análisis profundo, optimización constante y obsesión por los resultados medibles.
                  </p>
                  <p>
                    Trabajamos con clientes que invierten desde decenas de miles hasta millones de euros al mes en publicidad digital. 
                    Cada euro cuenta, cada decisión se basa en datos, cada campaña se optimiza para máximo ROAS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-foreground mb-4">
                ¿Por qué trabajar con nosotros?
              </h2>
              <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
                Ofrecemos un entorno de trabajo único, diseñado para que puedas dar lo mejor de ti sin sacrificar tu calidad de vida.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-background" id="apply">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Envía tu candidatura
                </h2>
                <p className="text-lg text-muted-foreground">
                  Si quieres dejarnos discretamente tu interés en trabajar con nosotros, aunque no tengamos ninguna candidatura abierta, 
                  puedes hacerlo aquí. Revisamos todas las solicitudes y te contactaremos cuando surja una oportunidad que encaje contigo.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+34 600 000 000"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-foreground mb-2">
                      LinkedIn
                    </label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/tu-perfil"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Cuéntanos sobre ti *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="¿Por qué quieres trabajar con nosotros? ¿Qué experiencia tienes en PPC o marketing digital? ¿Qué te hace único?"
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>

                  {/* RGPD Checkbox */}
                  <div className="flex items-start space-x-3 pt-4">
                    <input
                      type="checkbox"
                      id="privacy-careers"
                      checked={acceptsPrivacy}
                      onChange={(e) => setAcceptsPrivacy(e.target.checked)}
                      className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      required
                    />
                    <label htmlFor="privacy-careers" className="text-sm text-muted-foreground leading-relaxed">
                      Acepto la{' '}
                      <a href="/privacidad" className="text-primary hover:underline">
                        política de privacidad
                      </a>{' '}
                      y el tratamiento de mis datos personales para procesos de selección.
                    </label>
                  </div>

                  {/* Newsletter Checkbox (Optional) */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="newsletter-careers"
                      checked={newsletterSubscription}
                      onChange={(e) => setNewsletterSubscription(e.target.checked)}
                      className="mt-1 w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                    />
                    <label htmlFor="newsletter-careers" className="text-sm text-muted-foreground leading-relaxed">
                      Quiero recibir newsletter con estrategias, casos de éxito y novedades de PPC <span className="text-xs italic">(opcional)</span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-orange text-white font-semibold text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar candidatura
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center mt-4">
                    * Campos obligatorios
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
