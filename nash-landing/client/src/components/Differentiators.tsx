import { Code2, Briefcase, Heart } from 'lucide-react';

const differentiators = [
  {
    icon: Code2,
    title: 'No somos una agencia más de marketing',
    description:
      'Somos la primera ingeniería de PPC del mundo. No nos asusta la parte técnica del Marketing Digital, la amamos. Leemos documentación, encontramos soluciones y resolvemos problemas que abundan en otros servicios. Nos sentimos como pez en el agua con cualquier pixel, tag, evento o problema con el feed.',
    image: '/automation-bg.webp',
    reverse: false,
  },
  {
    icon: Briefcase,
    title: 'Experiencia que marca la diferencia',
    description:
      'Hemos participado en proyectos de startups y empresas que facturan más de 100M€. Millones de euros invertidos de forma rentable nos dan un know-how único en estrategia, usabilidad y optimización. Exponernos a muchas situaciones nos permite aportar valor en CRO, CRM, lean startup y estrategia de negocio.',
    platforms: [
      { name: 'Google Ads', logo: '/google-ads-logo.png' },
      { name: 'Meta Ads', logo: '/meta-logo.png' },
      { name: 'TikTok Ads', logo: '/tiktok-ads-logo.png' },
      { name: 'Google Analytics 4', logo: '/ga4-logo.png' },
      { name: 'Google Tag Manager', logo: '/gtm-logo.png' },
      { name: '+100 plataformas más', logo: '✨', isSpecial: true },
    ],
    reverse: true,
  },
];

export default function Differentiators() {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Más que una agencia, un equipo comprometido con tu éxito
          </h2>
          <p className="text-xl text-muted-foreground">
            Optimización basada en datos. Ingeniería de performance al nivel de las mejores agencias del mundo.
          </p>
        </div>

        {/* Differentiators */}
        <div className="space-y-24">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  item.reverse ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`space-y-6 ${item.reverse ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl">
                    <Icon className="text-secondary" size={32} />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-primary">
                    {item.title}
                  </h3>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Platforms (only for experience section) */}
                  {item.platforms && (
                    <div className="pt-4">
                      <p className="text-sm font-semibold text-foreground mb-4">
                        Plataformas con las que trabajamos:
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                         {item.platforms.map((platform, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center space-x-2 rounded-lg p-3 transition-colors ${
                              platform.isSpecial
                                ? 'bg-gradient-to-r from-secondary/10 to-primary/10 hover:from-secondary/20 hover:to-primary/20 border border-secondary/30'
                                : 'bg-slate-50 hover:bg-slate-100'
                            }`}
                          >
                            {platform.isSpecial ? (
                              <span className="text-2xl">{platform.logo}</span>
                            ) : (
                              <img
                                src={platform.logo}
                                alt={platform.name}
                                className="w-8 h-8 object-contain"
                              />
                            )}
                            <span className={`text-xs sm:text-sm font-medium ${
                              platform.isSpecial ? 'text-primary font-semibold' : 'text-foreground'
                            }`}>
                              {platform.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className={item.reverse ? 'lg:order-1' : ''}>
                  {item.image ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-3xl blur-2xl"></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="relative rounded-3xl shadow-2xl w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-12 shadow-xl">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-lg font-semibold text-foreground">
                            Valores fundamentales
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-2xl font-bold text-primary mb-2">
                              Lifelong Learning
                            </div>
                            <p className="text-muted-foreground">
                              Aprendizaje continuo y actualización constante
                            </p>
                          </div>
                          <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-2xl font-bold text-primary mb-2">
                              Kaizen
                            </div>
                            <p className="text-muted-foreground">
                              Mejora continua en cada proyecto
                            </p>
                          </div>
                          <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-2xl font-bold text-primary mb-2">
                              Win-Win
                            </div>
                            <p className="text-muted-foreground">
                              Relaciones mutuamente beneficiosas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
