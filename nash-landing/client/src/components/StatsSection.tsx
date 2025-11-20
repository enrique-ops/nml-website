import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Target, Zap, Award, Clock, Database } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: 18,
    suffix: 'M€',
    label: 'Invertidos en campañas',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Target,
    value: 220,
    suffix: 'M€',
    label: 'Facturados por clientes',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Award,
    value: 86,
    suffix: '',
    label: 'Empresas asesoradas',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Zap,
    value: 100,
    suffix: '%',
    label: 'Performance puro',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'Reporting automático',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Database,
    value: 1,
    suffix: '',
    label: 'Metodología NASH propietaria',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-black">
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="resultados" className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Números que hablan por sí solos
          </h2>
          <p className="text-xl text-white/90">
            Resultados reales de años de experiencia optimizando campañas de PPC para empresas de todos los tamaños.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-2xl card-hover"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-6`}>
                  <Icon className={stat.color} size={32} />
                </div>

                {/* Value */}
                <div className={`${stat.color} mb-2`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
