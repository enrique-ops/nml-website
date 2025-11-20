import { TrendingUp, BarChart3, Cog, Mail, ShoppingBag, Monitor } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Más ROAS, Menos CPL, Mejor P&L',
    description: 'Optimización continua basada en datos reales. Reducción de costes de adquisición y maximización del retorno de inversión.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: BarChart3,
    title: 'GTM Experts & GA4 Avanzado',
    description: 'Implementación técnica profesional en empresas que facturan +100M€. Pixels, tags, eventos y feeds configurados a la perfección.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Cog,
    title: 'Servidor Propio de n8n',
    description: 'Automatización de tareas para liberar tiempo y recursos. Eficiencia operativa máxima con herramientas no-code avanzadas.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Mail,
    title: 'Sistema Propietario de Reporting',
    description: 'Informes automáticos cada mañana en tu bandeja. Configuración técnica avanzada en Meta y Google Ads con implementación de Datalayers.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: ShoppingBag,
    title: 'Clasificación NASH de SKUs',
    description: 'Metodología propietaria para ecommerce con miles de productos. Optimización de Performance Max basada en millones invertidos.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Monitor,
    title: 'Puro Performance',
    description: 'Know-how en estrategia de negocio, usabilidad web, CRO y CRM. Aportar valor al cliente es nuestra misión principal.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicios" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Servicios que marcan la diferencia
          </h2>
          <p className="text-xl text-muted-foreground">
            No somos una agencia más. Somos la primera ingeniería de PPC del mundo, con metodología propietaria y resultados probados.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-border card-hover cursor-pointer"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${service.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={service.color} size={32} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            ¿Quieres saber cómo podemos ayudarte específicamente?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contacto');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-flex items-center justify-center px-8 py-4 gradient-orange text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Agenda tu consulta gratuita
          </button>
        </div>
      </div>
    </section>
  );
}
