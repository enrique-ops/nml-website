# Integración de Webhook Make.com

## Webhook URL Configurado
```
https://hook.eu1.make.com/51rd4vhg2lk12ginkdnjwubjmmiinej0
```

## Formularios Integrados

### 1. Formulario de Contacto
**Ubicación:** Sección de contacto en la página principal

**event_type:** `contact_form`

**Datos enviados:**
```json
{
  "event_type": "contact_form",
  "email": "cliente@ejemplo.com",
  "businessType": "Ecommerce" | "Leads" | "Otros",
  "newsletter_subscription": true | false,
  "timestamp": "2025-11-19T10:30:00.000Z",
  "source": "Nash Marketing Labs Website",
  
  // Attribution data (tracking de campañas)
  "current_url": "https://nashmarketinglabs.com/?utm_source=google&utm_medium=cpc&utm_campaign=black_friday",
  "referrer": "https://google.com" | "direct",
  "landing_page": "https://nashmarketinglabs.com/",
  "utm_source": "google" | undefined,
  "utm_medium": "cpc" | undefined,
  "utm_campaign": "black_friday" | undefined,
  "utm_term": "agencia ppc" | undefined,
  "utm_content": "anuncio_a" | undefined
}
```

**Notas:**
- `newsletter_subscription`: Indica si el usuario marcó el checkbox opcional para recibir newsletter
- `current_url`: URL completa con todos los parámetros cuando se envía el formulario
- `referrer`: De dónde vino el usuario ("direct" si vino directo)
- `landing_page`: Primera página que visitó el usuario en esta sesión
- `utm_*`: Parámetros UTM extraídos automáticamente (undefined si no existen)

---

### 2. Newsletter (Footer)
**Ubicación:** Footer de todas las páginas

**event_type:** `newsletter_subscription`

**Datos enviados:**
```json
{
  "event_type": "newsletter_subscription",
  "email": "suscriptor@ejemplo.com",
  "timestamp": "2025-11-19T10:30:00.000Z",
  "source": "Nash Marketing Labs Website - Footer",
  
  // Attribution data (tracking de campañas)
  "current_url": "https://nashmarketinglabs.com/?utm_source=facebook&utm_medium=social",
  "referrer": "https://facebook.com",
  "landing_page": "https://nashmarketinglabs.com/",
  "utm_source": "facebook" | undefined,
  "utm_medium": "social" | undefined,
  "utm_campaign": undefined,
  "utm_term": undefined,
  "utm_content": undefined
}
```

---

### 3. Formulario de Empleo
**Ubicación:** Página /empleo

**event_type:** `job_application`

**Datos enviados:**
```json
{
  "event_type": "job_application",
  "name": "Juan Pérez",
  "email": "candidato@ejemplo.com",
  "phone": "+34 600 000 000",
  "linkedin": "https://linkedin.com/in/juanperez",
  "message": "Mensaje del candidato...",
  "newsletter_subscription": true | false,
  "timestamp": "2025-11-19T10:30:00.000Z",
  "source": "Nash Marketing Labs Website - Careers Page",
  
  // Attribution data (tracking de campañas)
  "current_url": "https://nashmarketinglabs.com/empleo?utm_source=linkedin&utm_medium=job_post",
  "referrer": "https://linkedin.com",
  "landing_page": "https://nashmarketinglabs.com/empleo",
  "utm_source": "linkedin" | undefined,
  "utm_medium": "job_post" | undefined,
  "utm_campaign": undefined,
  "utm_term": undefined,
  "utm_content": undefined
}
```

**Notas:**
- `newsletter_subscription`: Indica si el candidato marcó el checkbox opcional para recibir newsletter
- Campos de atribución permiten saber de qué campaña/fuente vino el candidato

---

## Configuración en Make.com

### Paso 1: Recibir Webhook
El webhook ya está configurado y recibiendo datos. En Make.com verás un módulo "Webhooks" como primer paso.

### Paso 2: Router por Tipo de Evento
Crea un **Router** después del webhook para separar los 3 tipos de eventos:

1. **Ruta 1:** `event_type = "contact_form"`
   - Enviar email a clientes@nashmarketinglabs.com
   - Añadir a CRM
   - Crear tarea de seguimiento
   - **Si `newsletter_subscription = true`:** Añadir también a lista de newsletter

2. **Ruta 2:** `event_type = "newsletter_subscription"`
   - Añadir a MailerLite
   - Enviar email de bienvenida
   - Etiquetar como "Newsletter Website"

3. **Ruta 3:** `event_type = "job_application"`
   - Enviar email a RRHH
   - Guardar en Google Sheets
   - Crear notificación en Slack
   - **Si `newsletter_subscription = true`:** Añadir también a lista de newsletter

### Paso 3: Ejemplo de Filtro en Make
Para cada ruta del router, añade un filtro:

**Filtro para Contact Form:**
```
event_type = contact_form
```

**Filtro para Newsletter:**
```
event_type = newsletter_subscription
```

**Filtro para Job Application:**
```
event_type = job_application
```

---

## Tracking GTM Integrado

Además del webhook, todos los formularios también envían eventos a Google Tag Manager:

- **contact_form** → Evento GTM: `form_submit`
- **newsletter_subscription** → Evento GTM: `newsletter_subscribe`
- **job_application** → Evento GTM: `form_submit` (careers_form)

Esto te permite trackear conversiones en Google Analytics y Google Ads.

---

## Testing

### Probar Formulario de Contacto
1. Ve a la página principal
2. Scroll hasta la sección de contacto
3. Rellena email y tipo de negocio
4. Acepta privacidad
5. Envía
6. Verifica en Make.com que llegó con `event_type: "contact_form"`

### Probar Newsletter
1. Ve al footer de cualquier página
2. Introduce un email
3. Acepta privacidad
4. Haz clic en "Me suscribo"
5. Verifica en Make.com que llegó con `event_type: "newsletter_subscription"`

### Probar Formulario de Empleo
1. Ve a /empleo
2. Rellena todos los campos
3. Acepta privacidad
4. Envía
5. Verifica en Make.com que llegó con `event_type: "job_application"`

---

## Solución de Problemas

### El webhook no recibe datos
- Verifica que el webhook esté activo en Make.com
- Abre la consola del navegador (F12) y busca errores
- Verifica que no haya bloqueadores de anuncios interfiriendo

### Los datos llegan pero no se procesan
- Verifica que los filtros del Router estén correctamente configurados
- Comprueba que el campo `event_type` se esté leyendo correctamente

### Error de CORS
- No debería ocurrir con Make.com, pero si sucede, verifica que el webhook acepte peticiones desde cualquier origen

---

## Próximos Pasos Recomendados

1. **Configurar respuestas automáticas:** Envía un email automático de confirmación cuando alguien rellene el formulario de contacto

2. **Integrar con CRM:** Conecta Make.com con tu CRM (HubSpot, Pipedrive, etc.) para crear leads automáticamente

3. **Notificaciones en tiempo real:** Configura notificaciones en Slack o Telegram cuando llegue un nuevo lead caliente

4. **Secuencias de nurturing:** Para newsletter, crea una secuencia automática de emails de bienvenida en MailerLite


---

## 📊 Datos de Atribución y Tracking de Campañas

### ¿Qué son los datos de atribución?

Todos los formularios ahora envían automáticamente datos de atribución que te permiten saber:

1. **De dónde vino el lead:** Referrer (Google, Facebook, LinkedIn, directo)
2. **Qué campaña lo trajo:** Parámetros UTM extraídos automáticamente
3. **Primera página visitada:** Landing page de la sesión
4. **URL completa:** Con todos los parámetros cuando envió el formulario

### Campos de atribución incluidos

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `current_url` | URL completa cuando se envía el formulario | `https://nashmarketinglabs.com/?utm_source=google&utm_campaign=ppc` |
| `referrer` | De dónde vino el usuario | `https://google.com` o `direct` |
| `landing_page` | Primera página visitada en la sesión | `https://nashmarketinglabs.com/` |
| `utm_source` | Fuente de tráfico | `google`, `facebook`, `linkedin` |
| `utm_medium` | Medio de la campaña | `cpc`, `email`, `social` |
| `utm_campaign` | Nombre de la campaña | `black_friday_2024`, `leads_q1` |
| `utm_term` | Palabra clave (para búsqueda) | `agencia ppc madrid` |
| `utm_content` | Variante del anuncio | `anuncio_a`, `banner_hero` |

### Casos de uso en Make.com

#### 1. Calcular ROI por campaña
```
Filtro: utm_campaign = "black_friday_2024"
Acción: Sumar +1 al contador de leads de Black Friday
```

#### 2. Segmentar por fuente
```
Filtro: utm_source = "google"
Acción: Etiquetar en CRM como "Google Ads Lead"
```

#### 3. Alertas para campañas específicas
```
Filtro: utm_campaign = "vip_enterprise"
Acción: Enviar notificación urgente a Slack + Email al CEO
```

#### 4. Atribución multi-touch
```
Guardar en base de datos:
- Landing page (primer toque)
- Current URL (último toque)
- Referrer (fuente de tráfico)

→ Análisis completo del customer journey
```

### Ejemplo de análisis en Google Sheets

Puedes enviar los datos a Google Sheets y crear un dashboard:

| Fecha | Email | Campaña | Fuente | Medio | Conversión |
|-------|-------|---------|--------|-------|------------|
| 2024-11-20 | cliente@empresa.com | black_friday | google | cpc | ✅ |
| 2024-11-20 | otro@empresa.com | retargeting | facebook | social | ❌ |

**Métricas calculables:**
- Leads por campaña
- Tasa de conversión por fuente
- ROI por UTM
- Mejor performing ad (utm_content)

### Persistencia de UTMs

Los UTMs se almacenan en `sessionStorage` cuando el usuario llega al sitio, por lo que:

✅ **Ventaja:** Si el usuario navega por varias páginas sin UTMs en la URL, los UTMs originales se mantienen

**Ejemplo:**
1. Usuario llega a: `/?utm_source=google&utm_campaign=ppc`
2. Navega a: `/empleo` (sin UTMs en URL)
3. Envía formulario → **Los UTMs de Google se envían igualmente**

### Testing de atribución

Para probar que funciona correctamente:

1. **Visita con UTMs:**
   ```
   https://tu-dominio.com/?utm_source=test&utm_medium=manual&utm_campaign=prueba
   ```

2. **Rellena un formulario**

3. **Verifica en Make.com** que recibes:
   ```json
   {
     "utm_source": "test",
     "utm_medium": "manual",
     "utm_campaign": "prueba",
     "referrer": "direct",
     "current_url": "https://tu-dominio.com/?utm_source=test&utm_medium=manual&utm_campaign=prueba"
   }
   ```

### URLs de ejemplo para tus campañas

**Google Ads:**
```
https://nashmarketinglabs.com/?utm_source=google&utm_medium=cpc&utm_campaign=performance_max&utm_term=agencia+ppc
```

**Facebook Ads:**
```
https://nashmarketinglabs.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=leads_q4&utm_content=video_testimonios
```

**LinkedIn Ads:**
```
https://nashmarketinglabs.com/?utm_source=linkedin&utm_medium=cpc&utm_campaign=b2b_enterprise&utm_content=carousel_casos_exito
```

**Email Marketing:**
```
https://nashmarketinglabs.com/?utm_source=mailerlite&utm_medium=email&utm_campaign=newsletter_noviembre&utm_content=cta_principal
```

---

## 🎯 Mejores Prácticas

### Nomenclatura de UTMs

**utm_source:** Plataforma específica
- ✅ `google`, `facebook`, `linkedin`, `twitter`
- ❌ `ads`, `social` (demasiado genérico)

**utm_medium:** Tipo de tráfico
- ✅ `cpc`, `email`, `organic`, `referral`, `paid_social`
- ❌ `campaign`, `ad` (confuso)

**utm_campaign:** Nombre descriptivo de campaña
- ✅ `black_friday_2024`, `leads_ecommerce_q1`, `retargeting_carritos`
- ❌ `campaign1`, `test` (poco descriptivo)

**utm_content:** Variante específica del anuncio
- ✅ `anuncio_a`, `banner_hero`, `video_testimonios`, `cta_azul`
- ❌ `1`, `test` (no identificable)

### Automatizaciones recomendadas en Make.com

1. **Lead scoring automático:**
   - Leads de `utm_source=google` + `utm_campaign=enterprise` → Score +50
   - Leads de `referrer=linkedin` → Score +30
   - Leads directos → Score +10

2. **Asignación inteligente:**
   - Leads de campañas enterprise → Asignar a Account Manager senior
   - Leads de campañas SMB → Asignar a equipo junior
   - Leads sin UTMs → Asignar a pool general

3. **Reporting automático:**
   - Cada lunes enviar email con:
     * Total de leads por campaña
     * Top 3 fuentes de tráfico
     * Tasa de conversión por medio

4. **Alertas de oportunidades:**
   - Si `utm_campaign=vip` → Notificación inmediata
   - Si `referrer` contiene "forbes" o "techcrunch" → Alerta especial
