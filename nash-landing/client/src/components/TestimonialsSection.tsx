import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  highlight?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "José Miguel Alarcón Bermejo",
    role: "Managing Director",
    company: "Ecommerce +150K SKUs",
    text: "Llevo trabajando con Enrique casi 3 años en los que hemos dado una buena vuelta de tuerca a nuestro canal de performance. Desde la reducción de los CPP, el control absoluto de la inversión y sin sorpresas de ningún tipo y aumento de los ROAS de nuestro catálogo con más de 150K de sku.",
    highlight: "Rozando los 10M€ para este año y lo que viene!"
  },
  {
    name: "Yair Marc Martinez Palomino",
    role: "General Manager | ex-Accenture Strategy",
    company: "IESE MBA | Engineer",
    text: "Lo que más valoro es cómo entienden el negocio antes de proponer nada. No vienen con plantillas, vienen con preguntas inteligentes, análisis profundo y una obsesión real por hacer que las campañas funcionen.",
    highlight: "Si alguien busca una agencia que piense y actúe como socio estratégico, los recomiendo sin dudar."
  },
  {
    name: "Enric Romero Godó",
    role: "CEO & CoFounder",
    company: "Dribo",
    text: "Llevo años trabajando con NML desde el inicio de Dribo. Son muy competentes, ágiles en la ejecución y adaptación al cambio. Trabajar con ellos nos ha permitido escalar el marketing y los procesos que implican a lo largo de las diferentes etapas por las que ha pasado la compañía.",
    highlight: "Preferimos un trato directo con los perfiles estratégicos que gestionan las campañas."
  },
  {
    name: "Pedro Bergillos",
    role: "CoCEO",
    company: "farmaciabarata.es",
    text: "Destaco de Nash Marketing Labs su metodología de trabajo, una metodología muy avanzada centrada en objetivos. Con una filosofía de trabajo basada en la honestidad Enrique llega a decirte incluso lo que no quieres oír, él está para que vendas más, no para pasarte un fee mensual sin nada a cambio.",
    highlight: "Tanto el trabajo que hacen como la forma de realizarlo son muy top."
  },
  {
    name: "Pilar Benítez",
    role: "Emprendedora",
    company: "Menopausia sin síntomas",
    text: "Enrique es de esos profesionales que sabe cómo sacar el máximo provecho de cada euro invertido en publicidad. Con un enfoque claro y siempre basado en datos, optimiza cada campaña como si fuera suya, asegurándose de que cada acción tenga un impacto real.",
    highlight: "Un verdadero crack, innovador y siempre con ideas frescas."
  },
  {
    name: "Fabian Lopez Coloma",
    role: "Profesor y auditor eCommerce",
    company: "Fundador Ecommaster.es",
    text: "Antes de conocer a Enrique y su equipo realizaba las campañas por mi cuenta por cierta desconfianza en los resultados que he obtenido con otras agencias. Me propuso un plan, y los resultados ciertamente me sorprendieron.",
    highlight: "Si tienes un ecommerce es una de las mejores opciones que conozco."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Recomendaciones verificadas en LinkedIn
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Resultados reales de empresas que han confiado en nuestra metodología. 
              No promesas vacías, sino testimonios verificados de profesionales.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 border-border bg-white relative group"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-secondary" />
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Highlight */}
                  {testimonial.highlight && (
                    <p className="text-primary font-semibold text-sm italic border-l-4 border-secondary pl-4">
                      {testimonial.highlight}
                    </p>
                  )}

                  {/* Author */}
                  <div className="pt-4 border-t border-border">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              ¿Quieres ser el próximo caso de éxito?
            </p>
            <a 
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 gradient-orange text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Agenda tu consulta gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
