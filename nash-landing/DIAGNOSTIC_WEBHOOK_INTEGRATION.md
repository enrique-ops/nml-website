# Integración Webhook - Diagnóstico Pure Performance

## Descripción General

El diagnóstico Pure Performance envía datos completos a Make.com cuando un usuario completa el quiz de 10 preguntas. Esto permite automatizar la generación de PDF personalizado, envío de emails y seguimiento de leads.

---

## URL del Webhook

**IMPORTANTE:** Este diagnóstico usa un webhook SEPARADO de los formularios simples (contacto, newsletter, empleo) porque envía mucha más información y requiere automatización diferente.

**Debes crear un webhook específico en Make.com para el diagnóstico** y reemplazar la URL en el código antes de publicar.

Archivo: `client/src/pages/Diagnostico.tsx`

Línea a modificar (aproximadamente línea 185):
```typescript
await fetch("https://hook.eu2.make.com/DIAGNOSTIC-WEBHOOK-URL-HERE", {
```

Reemplaza `DIAGNOSTIC-WEBHOOK-URL-HERE` con tu webhook real de Make.com.

**¿Por qué webhook separado?**
- Payload mucho más complejo (10 respuestas + puntuaciones por paso)
- Automatización diferente (generación de PDF, segmentación por score)
- Métricas específicas del diagnóstico
- Facilita debugging y análisis independiente

---

## Estructura de Datos Enviados

### Event Type
```
event_type: "pure_performance_diagnostic"
```

### Datos del Formulario Inicial
```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "businessType": "ecommerce",  // o "leads"
  "monthlyBudget": "10k-25k"
}
```

### Puntuaciones
```json
{
  "total_score": 75,  // Suma total (0-100)
  "step_scores": {
    "step1": 15,  // Objetivos y Restricciones (0-20)
    "step2": 10,  // Calibrar la Medición (0-20)
    "step3": 20,  // Control Macro (0-20)
    "step4": 15,  // Fine Tuning (0-20)
    "step5": 15   // Iterar, Pivotar, Escalar (0-20)
  }
}
```

### Respuestas Detalladas
```json
{
  "answers": {
    "1": "10",  // Pregunta 1: valor 0, 5 o 10
    "2": "5",   // Pregunta 2: valor 0, 5 o 10
    "3": "0",   // Pregunta 3: valor 0, 5 o 10
    // ... hasta pregunta 10
  }
}
```

### Datos de Atribución (UTMs)
```json
{
  "current_url": "https://nashmarketinglabs.com/diagnostico-pure-performance?utm_source=linkedin",
  "referrer": "https://linkedin.com",
  "landing_page": "https://nashmarketinglabs.com/",
  "utm_source": "linkedin",
  "utm_medium": "cpc",
  "utm_campaign": "diagnostic_launch",
  "utm_term": null,
  "utm_content": null
}
```

### Timestamp
```json
{
  "timestamp": "2024-11-20T15:30:00.000Z"
}
```

---

## Ejemplo Completo de Payload

```json
{
  "event_type": "pure_performance_diagnostic",
  "name": "María González",
  "email": "maria@ecommerce.com",
  "businessType": "ecommerce",
  "monthlyBudget": "25k-50k",
  "total_score": 65,
  "step_scores": {
    "step1": 15,
    "step2": 10,
    "step3": 15,
    "step4": 10,
    "step5": 15
  },
  "answers": {
    "1": "10",
    "2": "5",
    "3": "5",
    "4": "5",
    "5": "10",
    "6": "5",
    "7": "5",
    "8": "5",
    "9": "10",
    "10": "5"
  },
  "current_url": "https://nashmarketinglabs.com/diagnostico-pure-performance?utm_source=linkedin&utm_campaign=diagnostic",
  "referrer": "https://linkedin.com",
  "landing_page": "https://nashmarketinglabs.com/",
  "utm_source": "linkedin",
  "utm_medium": "cpc",
  "utm_campaign": "diagnostic",
  "utm_term": null,
  "utm_content": null,
  "timestamp": "2024-11-20T15:30:00.000Z"
}
```

---

## Automatización en Make.com

### Escenario Recomendado

#### Módulo 1: Webhook Receiver
- Recibe el payload del diagnóstico

#### Módulo 2: Router (Segmentación por Puntuación)
**Ruta A: Score 0-39 (Modo Supervivencia)**
- Generar PDF con prioridades urgentes
- Email: "Tu sistema necesita atención urgente"
- Tag CRM: "Diagnostic_Critical"
- Asignar a: Sales Manager senior

**Ruta B: Score 40-59 (Gestión de Campañas)**
- Generar PDF con roadmap estructurado
- Email: "Cómo pasar de campañas a sistema"
- Tag CRM: "Diagnostic_Medium"
- Secuencia nurturing: "Sistema vs Campañas"

**Ruta C: Score 60-79 (En Camino)**
- Generar PDF con optimizaciones avanzadas
- Email: "Estás cerca del top 10%"
- Tag CRM: "Diagnostic_Good"
- Secuencia nurturing: "Optimización Avanzada"

**Ruta D: Score 80-100 (Sistema Rentable)**
- Generar PDF con estrategias de escalado
- Email: "Ya estás en el top 10%, hablemos de escalar"
- Tag CRM: "Diagnostic_Excellent"
- Email directo a CEO para oferta premium

#### Módulo 3: Generación de PDF
Usar plantilla con variables:
- `{{name}}`
- `{{total_score}}`
- `{{score_level}}` (calculado según score)
- `{{step_scores.step1}}` ... `{{step_scores.step5}}`
- Radar chart (generar con Chart.js o similar)
- Top 3 prioridades (condicional según respuestas)

#### Módulo 4: Envío de Email
Plantilla personalizada según puntuación:
- Asunto: "Tu diagnóstico Pure Performance: {{score_level}}"
- Adjunto: PDF generado
- CTA: Botón a Calendly

#### Módulo 5: CRM Integration
Añadir lead a CRM (HubSpot, Pipedrive, etc.) con:
- Datos de contacto
- Tags según puntuación
- Custom fields: total_score, businessType, monthlyBudget
- Fuente: utm_source

#### Módulo 6: Google Sheets (Opcional)
Registrar en hoja de cálculo para análisis:
- Timestamp
- Nombre, Email
- Puntuación total y por paso
- Tipo de negocio
- Presupuesto
- UTM source/campaign

---

## Niveles de Puntuación

| Score | Nivel | Color | Descripción |
|-------|-------|-------|-------------|
| 80-100 | Sistema Rentable | Verde | Top 10%, sistema estructurado |
| 60-79 | En Camino | Azul | Bases sólidas pero hay gaps |
| 40-59 | Gestión de Campañas | Naranja | Falta sistema estructurado |
| 0-39 | Modo Supervivencia | Rojo | Urgente implementar metodología |

---

## Mapeo de Respuestas a Recomendaciones

### Si step1 (Objetivos) < 10:
**Prioridad:** Definir KPIs de negocio
**Acción:** Calcular CAC objetivo, LTV, márgenes

### Si step2 (Medición) < 10:
**Prioridad:** Auditoría de medición
**Acción:** Verificar GTM, eliminar duplicados, implementar server-side

### Si step3 (Control Macro) < 10:
**Prioridad:** Reporting automático
**Acción:** Dashboard diario con métricas clave

### Si step4 (Fine Tuning) < 10:
**Prioridad:** Análisis multidimensional
**Acción:** Identificar productos/geos/audiencias rentables

### Si step5 (Iterar/Escalar) < 10:
**Prioridad:** Proceso de testing
**Acción:** Calendario de tests con hipótesis claras

---

## Casos de Uso Avanzados

### 1. Lead Scoring Automático
```
Score 80-100 + monthlyBudget ">50k" → Lead Score: A (Hot)
Score 60-79 + monthlyBudget "25k-50k" → Lead Score: B (Warm)
Score 40-59 → Lead Score: C (Cold)
Score 0-39 → Lead Score: D (Nurture)
```

### 2. Asignación Inteligente
```
businessType "ecommerce" + Score >60 → Asignar a: Ecommerce Specialist
businessType "leads" + Score >60 → Asignar a: B2B Specialist
Score <40 → Asignar a: Junior Account Manager (nurturing)
```

### 3. Alertas VIP
```
Si utm_campaign contiene "enterprise" O monthlyBudget ">50k":
  → Enviar Slack a CEO
  → Email inmediato a Sales Director
  → Marcar como "VIP Lead"
```

### 4. Retargeting Segmentado
```
Score 60-79 → Añadir a audiencia LinkedIn "Casi listos"
Score 40-59 → Añadir a audiencia Google "Educación"
Score 0-39 → Añadir a audiencia Meta "Awareness"
```

---

## Plantilla de Email Ejemplo

### Para Score 40-59 (Gestión de Campañas)

**Asunto:** Tu diagnóstico Pure Performance: Gestión de Campañas

**Cuerpo:**
```
Hola {{name}},

Gracias por completar el diagnóstico Pure Performance™.

Tu puntuación: {{total_score}}/100
Nivel: Gestión de Campañas

Esto significa que estás gestionando campañas, pero aún no tienes un sistema rentable estructurado.

📊 Tus puntuaciones por paso:
• Objetivos y Restricciones: {{step_scores.step1}}/20
• Calibrar la Medición: {{step_scores.step2}}/20
• Control Macro: {{step_scores.step3}}/20
• Fine Tuning: {{step_scores.step4}}/20
• Iterar, Pivotar, Escalar: {{step_scores.step5}}/20

📥 Descarga tu roadmap personalizado (PDF adjunto)

🎯 Próximo paso recomendado:
Agenda una consulta gratuita de 30 minutos y te mostraremos cómo implementar Pure Performance en tu negocio.

[Agendar consulta] → https://calendly.com/nashmarketinglabs/consulta

Un saludo,
Enrique Nasarre
CEO, Nash Marketing Labs
```

---

## Testing

### Probar el Webhook

1. Visita: `https://tu-dominio.com/diagnostico-pure-performance?utm_source=test&utm_campaign=prueba`
2. Completa el formulario con datos de prueba
3. Responde las 10 preguntas
4. Verifica en Make.com que llegan todos los campos

### Verificar Datos Recibidos

En Make.com, inspecciona el payload y confirma:
- ✅ `event_type` = "pure_performance_diagnostic"
- ✅ `total_score` es un número entre 0-100
- ✅ `step_scores` tiene 5 valores entre 0-20
- ✅ `answers` tiene 10 pares clave-valor
- ✅ UTMs se capturan correctamente
- ✅ `businessType` es "ecommerce" o "leads"
- ✅ `monthlyBudget` tiene el rango seleccionado

---

## Métricas a Trackear

1. **Tasa de conversión landing → formulario:** % de visitantes que empiezan
2. **Tasa de conversión formulario → quiz:** % que completan datos iniciales
3. **Tasa de abandono por pregunta:** Identificar preguntas difíciles
4. **Tasa de conversión quiz → PDF:** % que completan las 10 preguntas
5. **Distribución de puntuaciones:** Cuántos en cada nivel
6. **Tasa de conversión PDF → consulta:** % que agendan después
7. **CPL por fuente:** Coste por lead según utm_source
8. **ROI por campaña:** Leads generados vs inversión

---

## Optimizaciones Futuras

1. **A/B Testing:** Probar diferentes headlines en intro
2. **Personalización:** Mostrar ejemplos según businessType
3. **Gamificación:** Añadir badges por puntuación alta
4. **Social Proof:** "X personas han completado el diagnóstico"
5. **Urgencia:** "Consulta gratuita solo para primeros 50"
6. **Retargeting:** Pixel para quienes abandonan en quiz
7. **Lead Magnet Upgrade:** Ofrecer "Análisis 1-on-1" para scores altos

---

## Soporte

Para dudas sobre la integración:
- Documentación Make.com: https://www.make.com/en/help/webhooks
- Soporte Nash Marketing Labs: clientes@nashmarketinglabs.com
