import { Button } from '@/components/ui/button';
import { ShoppingCart, Users } from 'lucide-react';

export default function ValueProposition() {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Si la inversión en ads es{' '}
            <span className="text-gradient-orange">relevante en tu P&L</span>,
            tenemos la metodología que necesitas
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Cualquiera puede regalarle el dinero a Google y Facebook. Muy pocos generan los beneficios que aportamos a las empresas, una y otra vez, día tras día, año tras año.
          </p>

          <p className="text-lg text-foreground font-medium">
            No es magia ni una promesa vacía: son <span className="text-secondary font-bold">matemáticas, metodología y experiencia</span>.
          </p>

          {/* Service Type Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-12 py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart size={24} />
                </div>
                <div className="text-left">
                  <div className="text-sm opacity-90">Soluciones para</div>
                  <div className="text-xl font-bold">Ecommerce</div>
                </div>
              </div>
            </Button>

            <Button
              size="lg"
              onClick={scrollToContact}
              className="group relative overflow-hidden gradient-orange text-white font-semibold text-lg px-12 py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div className="text-left">
                  <div className="text-sm opacity-90">Generación de</div>
                  <div className="text-xl font-bold">Leads</div>
                </div>
              </div>
            </Button>
          </div>


        </div>
      </div>
    </section>
  );
}
