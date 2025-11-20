import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { APP_LOGO } from "@/const";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAttributionData } from "@/lib/tracking";
import { toast } from "sonner";

// Definición de preguntas del diagnóstico con imágenes
const questions = [
  {
    id: 1,
    step: "Paso 1: Objetivos y Restricciones",
    image: "/diagnostic-step1.webp",
    context: "Sin objetivos claros alineados con el negocio, es imposible saber si tu inversión en Paid Media es rentable.",
    question: "¿Tienes definidos tus KPIs de negocio alineados con Paid Media?",
    options: [
      { value: "10", label: "Sí, tenemos CAC objetivo, LTV, márgenes y ROI mínimo", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Tenemos algunos KPIs pero no están alineados con P&L", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Solo miramos ROAS/CPL sin contexto de negocio", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 2,
    step: "Paso 1: Objetivos y Restricciones",
    image: "/diagnostic-step1.webp",
    context: "Conocer cuánto puedes gastar por cliente/pedido/lead es la base para tomar decisiones de inversión inteligentes.",
    question: "¿Conoces tu unit economics?",
    options: [
      { value: "10", label: "Sí, hemos calculado exactamente cuánto podemos gastar por cliente, pedido, lead...", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Tenemos una idea aproximada", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "No lo tenemos calculado", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 3,
    step: "Paso 2: Calibrar la Medición",
    image: "/diagnostic-step2.webp",
    context: "Si tu medición no es fiable, estás tomando decisiones basándote en datos incorrectos. Garbage in, garbage out.",
    question: "¿Tu medición de conversiones es fiable?",
    options: [
      { value: "10", label: "Tenemos GTM auditado, sin duplicados, eventos standard con los parámetros correctos y eventos personalizados", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Usamos píxeles básicos pero no estamos seguros de la precisión", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Sabemos que hay conversiones duplicadas o perdidas", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 4,
    step: "Paso 2: Calibrar la Medición",
    image: "/diagnostic-step2.webp",
    context: "Las discrepancias entre plataformas son normales, pero debes entender por qué existen y cuál es tu fuente de verdad.",
    question: "¿Comparas datos entre plataformas (Google Ads vs GA4 vs CRM)?",
    options: [
      { value: "10", label: "Sí, y las discrepancias están identificadas y documentadas", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "A veces, pero no sistemáticamente", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Cada plataforma muestra números diferentes y no sabemos por qué", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 5,
    step: "Paso 3: Control Macro",
    image: "/diagnostic-step3.webp",
    context: "El control macro te permite detectar problemas antes de que se conviertan en crisis y aprovechar oportunidades rápidamente.",
    question: "¿Recibes reporting automático diario de métricas clave?",
    options: [
      { value: "10", label: "Sí, dashboard automático cada mañana con alertas", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Revisamos manualmente 2-3 veces por semana", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Solo miramos cuando hay tiempo", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 6,
    step: "Paso 3: Control Macro",
    image: "/diagnostic-step3.webp",
    context: "La velocidad de toma de decisiones es una ventaja competitiva. Mientras tú dudas, tu competencia está escalando.",
    question: "¿Puedes pausar/escalar campañas cada día basándote en datos?",
    options: [
      { value: "10", label: "Sí, tenemos proceso definido y lo ejecutamos", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Las decisiones tardan días", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Las decisiones tardan semanas", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 7,
    step: "Paso 4: Fine Tuning",
    image: "/diagnostic-step4.webp",
    context: "El análisis multidimensional te permite identificar qué combinaciones de variables generan los mejores resultados.",
    question: "¿Analizas performance por múltiples dimensiones?",
    options: [
      { value: "10", label: "Sí, analizamos por país / canal / campaña / anuncio / dispositivo / audiencia / producto semanalmente", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Solo miramos métricas generales por campaña", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Solo vemos totales agregados", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 8,
    step: "Paso 4: Fine Tuning",
    image: "/diagnostic-step4.webp",
    context: "No todos los productos/servicios/canales son igual de rentables. Identificar ganadores y perdedores es clave para optimizar ROI.",
    question: "¿Identificas qué productos/servicios/canales son rentables vs cuáles queman presupuesto?",
    options: [
      { value: "10", label: "Sí, clasificamos en categorías (por ejemplo: Estrellas/Promedio/Suprimir) y ajustamos presupuesto", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Sabemos cuáles venden más, pero no cuáles son rentables", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Invertimos igual en todo", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 9,
    step: "Paso 5: Iterar, Pivotar, Escalar",
    image: "/diagnostic-step5.webp",
    context: "Sin experimentación sistemática, te estancas. Los mejores resultados vienen de probar hipótesis y aprender rápido.",
    question: "¿Pruebas nuevas estrategias/creativos/audiencias sistemáticamente?",
    options: [
      { value: "10", label: "Sí, calendario de tests con hipótesis validadas y métricas de éxito claras", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "Probamos cosas cuando se nos ocurre", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Llevamos meses con la misma configuración", icon: TrendingDown, color: "text-red-600" },
    ],
  },
  {
    id: 10,
    step: "Paso 5: Iterar, Pivotar, Escalar",
    image: "/diagnostic-step5.webp",
    context: "Escalar ganadores y pausar perdedores es la diferencia entre un sistema rentable y una cuenta estancada.",
    question: "¿Escalas lo que funciona y cortas lo que no basándote en datos?",
    options: [
      { value: "10", label: "Sí, proceso claro: escalado horizontal/vertical y priorización de presupuesto", icon: CheckCircle2, color: "text-green-600" },
      { value: "5", label: "A veces, pero nos da miedo pausar cosas", icon: Minus, color: "text-orange-600" },
      { value: "0", label: "Mantenemos todo activo 'por si acaso'", icon: TrendingDown, color: "text-red-600" },
    ],
  },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  businessType: string;
  monthlyInvestment: string;
}

export default function Diagnostico() {
  const [stage, setStage] = useState<"intro" | "form" | "quiz" | "results">("intro");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    businessType: "",
    monthlyInvestment: "",
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStartQuiz = () => {
    setStage("form");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }
    setStage("quiz");
  };

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      toast.error("Por favor, selecciona una respuesta");
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitDiagnostic();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitDiagnostic = async () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + parseInt(val), 0);
    
    // Calcular puntuaciones por paso
    const stepScores = {
      "Objetivos y Restricciones": parseInt(answers[1] || "0") + parseInt(answers[2] || "0"),
      "Calibrar la Medición": parseInt(answers[3] || "0") + parseInt(answers[4] || "0"),
      "Control Macro": parseInt(answers[5] || "0") + parseInt(answers[6] || "0"),
      "Fine Tuning": parseInt(answers[7] || "0") + parseInt(answers[8] || "0"),
      "Iterar, Pivotar, Escalar": parseInt(answers[9] || "0") + parseInt(answers[10] || "0"),
    };

    // Enviar a webhook
    try {
      const attribution = getAttributionData();
      await fetch("https://hook.eu1.make.com/1llfokq3pjnv90kicwhb8kzeodtt716x", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "pure_performance_diagnostic",
          timestamp: new Date().toISOString(),
          // Datos del formulario
          ...formData,
          // Puntuaciones
          total_score: totalScore,
          score_level: getScoreLevel(totalScore).level,
          step_scores: stepScores,
          // Respuestas detalladas
          answers: Object.entries(answers).map(([qId, value]) => ({
            question_id: parseInt(qId),
            question: questions.find(q => q.id === parseInt(qId))?.question,
            answer_value: parseInt(value),
            answer_label: questions.find(q => q.id === parseInt(qId))?.options.find(o => o.value === value)?.label,
          })),
          // Attribution data
          ...attribution,
        }),
      });
    } catch (error) {
      console.error("Error sending diagnostic:", error);
    }

    setStage("results");
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { 
      level: "Sistema Rentable", 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      description: "¡Felicidades! Tu Paid Media funciona como un sistema rentable. Estás en el top 10% de empresas.",
      nextSteps: [
        "Documenta tu sistema para escalar sin perder calidad",
        "Busca oportunidades de expansión a nuevos mercados/canales",
        "Considera automatización avanzada con IA/ML"
      ]
    };
    if (score >= 60) return { 
      level: "En Camino", 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      description: "Tienes buenas bases pero hay gaps críticos que te impiden escalar de forma rentable.",
      nextSteps: [
        "Prioriza los pasos con puntuación más baja (mira el desglose)",
        "Implementa reporting automático si no lo tienes",
        "Define proceso claro de toma de decisiones"
      ]
    };
    if (score >= 40) return { 
      level: "Gestión de Campañas", 
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      description: "Estás gestionando campañas pero no tienes un sistema. Probablemente estás quemando presupuesto.",
      nextSteps: [
        "URGENTE: Define tus unit economics (cuánto puedes gastar por cliente)",
        "Audita tu medición (GTM, píxeles, conversiones)",
        "Implementa dashboard básico de control diario"
      ]
    };
    return { 
      level: "Modo Supervivencia", 
      color: "text-red-600", 
      bgColor: "bg-red-50",
      description: "Tu Paid Media está en modo reactivo. Sin bases sólidas, cada euro invertido es una apuesta.",
      nextSteps: [
        "CRÍTICO: Para de invertir hasta tener medición fiable",
        "Define objetivos de negocio claros (no solo ROAS)",
        "Contrata ayuda externa o forma a tu equipo en fundamentos"
      ]
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const totalScore = Object.values(answers).reduce((sum, val) => sum + parseInt(val), 0);
  const scoreInfo = getScoreLevel(totalScore);

  if (stage === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />

        <div className="container mx-auto px-4 py-16 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
              Diagnóstico Gratuito
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Tu Paid Media es un <span className="text-primary">sistema rentable</span> o solo estás gestionando campañas?
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Descubre en 3 minutos qué tan cerca estás de tener un sistema Pure Performance™ que genere resultados predecibles y escalables.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">10 preguntas estratégicas</h3>
                <p className="text-sm text-gray-600">Basadas en los 5 pasos de Pure Performance</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Descubre tu puntuación</h3>
                <p className="text-sm text-gray-600">Tu nivel y gaps críticos por paso</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="text-green-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Descarga tu roadmap</h3>
                <p className="text-sm text-gray-600">PDF personalizado con prioridades y próximos pasos</p>
              </Card>
            </div>

            <Button onClick={handleStartQuiz} size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6">
              Empezar diagnóstico gratuito
              <ArrowRight className="ml-2" size={20} />
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              ⏱️ 3 minutos • 🔒 Sin compromiso • 📊 Resultados inmediatos
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (stage === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />

        <div className="container mx-auto px-4 py-16 pt-24">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Antes de empezar...</h2>
              <p className="text-gray-600 mb-8 text-center">
                Necesitamos algunos datos para personalizar tu diagnóstico y enviarte los resultados.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email corporativo *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan@empresa.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">Empresa *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Mi Empresa SL"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="businessType">Tipo de negocio</Label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecciona...</option>
                    <option value="ecommerce">Ecommerce</option>
                    <option value="lead_generation">Generación de Leads</option>
                    <option value="both">Ambos</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="monthlyInvestment">Inversión mensual en Paid Media</Label>
                  <select
                    id="monthlyInvestment"
                    value={formData.monthlyInvestment}
                    onChange={(e) => setFormData({ ...formData, monthlyInvestment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecciona...</option>
                    <option value="<5k">&lt; 5.000€/mes</option>
                    <option value="5k-15k">5.000€ - 15.000€/mes</option>
                    <option value="15k-50k">15.000€ - 50.000€/mes</option>
                    <option value="50k-100k">50.000€ - 100.000€/mes</option>
                    <option value=">100k">&gt; 100.000€/mes</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white" size="lg">
                  Continuar al diagnóstico
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "quiz") {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />

        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Pregunta {currentQuestion + 1} de {questions.length}
              </p>
            </div>

            <Card className="p-8">
              {/* Imagen del paso */}
              {currentQ.image && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={currentQ.image} 
                    alt={currentQ.step} 
                    className="w-full h-auto max-w-md mx-auto"
                  />
                </div>
              )}

              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  {currentQ.step}
                </div>
                <h2 className="text-2xl font-bold mb-3">{currentQ.question}</h2>
                {currentQ.context && (
                  <p className="text-gray-600 italic border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded">
                    💡 {currentQ.context}
                  </p>
                )}
              </div>

              <RadioGroup
                value={answers[currentQ.id]?.toString()}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
                className="space-y-4"
              >
                {currentQ.options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.value}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary ${
                        answers[currentQ.id] === option.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleAnswer(currentQ.id, option.value)}
                    >
                      <RadioGroupItem value={option.value} id={`option-${option.value}`} className="mt-1" />
                      <Label
                        htmlFor={`option-${option.value}`}
                        className="flex-1 cursor-pointer flex items-start gap-3"
                      >
                        <Icon className={`flex-shrink-0 mt-0.5 ${option.color || ''}`} size={20} />
                        <span>{option.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="mr-2" size={16} />
                  Anterior
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {currentQuestion === questions.length - 1 ? "Ver resultados" : "Siguiente"}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Results stage
  const stepScores = {
    "Objetivos y Restricciones": parseInt(answers[1] || "0") + parseInt(answers[2] || "0"),
    "Calibrar la Medición": parseInt(answers[3] || "0") + parseInt(answers[4] || "0"),
    "Control Macro": parseInt(answers[5] || "0") + parseInt(answers[6] || "0"),
    "Fine Tuning": parseInt(answers[7] || "0") + parseInt(answers[8] || "0"),
    "Iterar, Pivotar, Escalar": parseInt(answers[9] || "0") + parseInt(answers[10] || "0"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-block px-6 py-3 ${scoreInfo.bgColor} ${scoreInfo.color} rounded-full text-lg font-bold mb-4`}>
              Tu nivel: {scoreInfo.level}
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Tu puntuación: <span className={scoreInfo.color}>{totalScore}/100</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {scoreInfo.description}
            </p>
          </div>

          {/* Desglose por pasos */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Desglose por paso Pure Performance™</h2>
            <div className="space-y-4">
              {Object.entries(stepScores).map(([step, score]) => (
                <div key={step}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{step}</span>
                    <span className={`font-bold ${score >= 16 ? 'text-green-600' : score >= 10 ? 'text-orange-600' : 'text-red-600'}`}>
                      {score}/20
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        score >= 16 ? 'bg-green-500' : score >= 10 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(score / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Próximos pasos */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tus próximos pasos recomendados</h2>
            <ul className="space-y-4">
              {scoreInfo.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Mensaje de valor */}
          <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
            <p className="text-gray-700 text-center">
              💡 <strong>Este diagnóstico te da una visión general de tu sistema.</strong> Si quieres profundizar en plataformas específicas (Google Ads, Meta Ads, TikTok) o revisar configuraciones técnicas concretas, agenda tu consulta gratuita de 60 minutos donde analizaremos tu cuenta en detalle.
            </p>
          </Card>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Quieres convertir tu Paid Media en un sistema rentable?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Agenda una consulta gratuita de 60 minutos y te mostraremos cómo mejorar tu puntuación
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("https://calendly.com/nasarre/60min", "_blank")}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Agendar consulta gratuita
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Volver al inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
