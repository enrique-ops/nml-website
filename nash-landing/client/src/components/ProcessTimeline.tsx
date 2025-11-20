import { MessageSquare, Search, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Consulta Inicial Gratuita',
    description:
      'Analizamos tu situación actual, identificamos oportunidades de mejora y creamos una propuesta de valor personalizada para tu negocio.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Search,
    number: '02',
    title: 'Auditoría Técnica',
    description:
      'Revisión completa de tu configuración actual, análisis de medición y tracking, y detección de fugas de presupuesto que están afectando tu ROI.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Implementación y Optimización',
    description:
      'Configuración técnica avanzada con nuestra metodología propietaria, lanzamiento de campañas optimizadas y automatización de procesos clave.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Mejora Continua',
    description:
      'Reporting automático diario, optimización constante basada en datos reales y escalado rentable de tus campañas más exitosas.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export default function ProcessTimeline() {
  return (
    <section id="proceso" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Nuestro proceso de trabajo
          </h2>
          <p className="text-xl text-muted-foreground">
            Metodología probada en empresas que facturan +100M€. Paso a paso hacia resultados medibles.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-primary to-secondary"></div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isEven ? 'lg:text-right lg:pr-16' : 'lg:pl-16 lg:col-start-2'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-border card-hover">
                      {/* Number Badge */}
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 ${step.bgColor} rounded-xl mb-4`}
                      >
                        <span className={`text-xl font-bold ${step.color}`}>
                          {step.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon Circle (Center) */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                      <Icon className={step.color} size={32} />
                    </div>
                  </div>

                  {/* Empty space for layout (Desktop) */}
                  <div className={`hidden lg:block ${isEven ? 'lg:col-start-2' : ''}`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Listo para empezar?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Primera consulta gratuita. Sin compromiso. Analizamos tu situación y te mostramos oportunidades reales de mejora.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Agenda tu consulta ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
