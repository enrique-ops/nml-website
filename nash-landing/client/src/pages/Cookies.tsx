import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Cookies() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => setLocation('/')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </button>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            Política de Cookies
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-muted/30 rounded-2xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-0">
                <strong>Última actualización:</strong> 24/10/2025
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">1. Introducción</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bienvenido a Nash Marketing Labs. En Nash Marketing Labs, nos esforzamos por brindar la mejor experiencia en línea posible a nuestros usuarios en España. Para lograrlo, utilizamos cookies y tecnologías similares en nuestro sitio web y aplicaciones móviles.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Esta política de cookies tiene como objetivo proporcionarte información clara y completa sobre cómo utilizamos las cookies, qué tipos de cookies utilizamos y cómo puedes gestionarlas.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">2. ¿Qué son las cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web o utilizas nuestras aplicaciones móviles. Estas cookies nos permiten recopilar información sobre tu navegación y comportamiento en línea.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">3. ¿Qué tipos de cookies utilizamos?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A continuación, te proporcionamos una descripción de los tipos de cookies que utilizamos en Nash Marketing Labs:
              </p>

              <div className="space-y-6">
                <div className="bg-white border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Cookies esenciales</h3>
                  <p className="text-muted-foreground">
                    Estas cookies son esenciales para el funcionamiento de nuestro sitio web y aplicaciones móviles. Nos permiten ofrecer servicios básicos, como el inicio de sesión, la autenticación y la gestión de la sesión. Sin estas cookies, nuestro sitio web y aplicaciones no funcionarían correctamente.
                  </p>
                </div>

                <div className="bg-white border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Cookies de rendimiento</h3>
                  <p className="text-muted-foreground">
                    Utilizamos cookies de rendimiento para recopilar información sobre cómo los visitantes utilizan nuestro sitio web y aplicaciones móviles. Esto nos ayuda a mejorar la calidad de nuestros servicios y a entender cómo los usuarios interactúan con nuestro contenido.
                  </p>
                </div>

                <div className="bg-white border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Cookies de funcionalidad</h3>
                  <p className="text-muted-foreground">
                    Estas cookies se utilizan para recordar tus preferencias y configuraciones, como el idioma o la región. Esto permite una experiencia más personalizada.
                  </p>
                </div>

                <div className="bg-white border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Cookies de publicidad y seguimiento</h3>
                  <p className="text-muted-foreground mb-4">
                    Utilizamos cookies de terceros con fines publicitarios y de seguimiento. Estas cookies recopilan información sobre tus hábitos de navegación y nos ayudan a ofrecerte anuncios relevantes.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Google Ads y Google Analytics</strong> (Google LLC)</li>
                    <li><strong>Meta Ads / Facebook Pixel</strong> (Meta Platforms, Inc.)</li>
                    <li><strong>LinkedIn Ads</strong> (LinkedIn Corporation)</li>
                    <li><strong>Retention.com</strong> (para campañas de retargeting y marketing por correo electrónico)</li>
                    <li><strong>Otras plataformas de seguimiento y analítica</strong> empleadas para medición, optimización y remarketing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Nota importante:</strong> Estas tecnologías pueden asociar tus actividades en nuestro sitio con información personal que tú u otros hayan proporcionado a dichas plataformas, incluyendo posibles asociaciones con tu correo electrónico.
                </p>
                <p className="text-sm text-blue-900 leading-relaxed mt-3">
                  Puedes optar por no recibir esta publicidad visitando{' '}
                  <a href="https://app.retention.com/optout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    https://app.retention.com/optout
                  </a>
                  {' '}o ejercer tu derecho de exclusión en cumplimiento del RGPD en{' '}
                  <a href="https://www.rb2b.com/rb2b-gdpr-opt-out" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    https://www.rb2b.com/rb2b-gdpr-opt-out
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">4. ¿Cómo puedes gestionar las cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Puedes gestionar las cookies en cualquier momento a través de la configuración de tu navegador o dispositivo. Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad de nuestro sitio web y aplicaciones móviles.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">5. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Si tienes alguna pregunta o inquietud sobre nuestra política de cookies o el uso de cookies en Nash Marketing Labs, no dudes en ponerte en contacto con nosotros:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li><strong>Nombre de la Empresa:</strong> Nash Marketing Labs</li>
                <li><strong>Dirección:</strong> C/ Maria Moliner 2, Esc.1, 2º</li>
                <li><strong>Correo Electrónico:</strong> enrique@ads4startups.com</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">6. Cambios en la Política de Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nos reservamos el derecho de actualizar esta política de cookies en cualquier momento. Te recomendamos revisar periódicamente esta página para mantenerte informado sobre los cambios.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">7. Aceptación de Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Al continuar utilizando nuestro sitio web y aplicaciones móviles, aceptas el uso de cookies de acuerdo con esta política.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Gracias por confiar en Nash Marketing Labs.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
