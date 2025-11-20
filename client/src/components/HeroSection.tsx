import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Target, Zap } from 'lucide-react';
import { trackCTAClick } from '@/lib/gtm';

export default function HeroSection() {
  const scrollToContact = () => {
    trackCTAClick('1ª Consulta Gratis', 'hero_section');
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToResults = () => {
    trackCTAClick('Ver casos de éxito', 'hero_section');
    const element = document.getElementById('resultados');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold">
              <Zap size={16} />
              <span>La primera ingeniería de PPC del mundo</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-gradient-navy">Más ROAS</span>
                <br />
                <span className="text-gradient-navy">Menos CPL</span>
                <br />
                <span className="text-gradient-orange">Mejor P&L</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Matemáticas, metodología y resultados reales. No regalamos tu dinero a Google y Facebook, generamos beneficios que marcan la diferencia.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-border card-hover">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg mb-2">
                  <TrendingUp className="text-secondary" size={20} />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-primary">+18M€</div>
                <div className="text-xs text-muted-foreground">Invertidos</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-border card-hover">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg mb-2">
                  <Target className="text-secondary" size={20} />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-primary">+220M€</div>
                <div className="text-xs text-muted-foreground">Facturados</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-border card-hover">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg mb-2">
                  <Zap className="text-secondary" size={20} />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">Performance</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="gradient-orange text-white font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
              >
                1ª Consulta Gratis
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToResults}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg px-8 py-6"
              >
                Ver casos de éxito
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Empresas 100M+ asesoradas</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Metodología propietaria</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Image */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-3xl blur-3xl"></div>
              
              {/* Dashboard Image */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
                <img
                  src="/dashboard-hero.png"
                  alt="PPC Dashboard Analytics"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">ROAS</div>
                    <div className="text-xl font-bold text-green-600">+347%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Target className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">CPL</div>
                    <div className="text-xl font-bold text-blue-600">-62%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
