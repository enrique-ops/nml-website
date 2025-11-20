# Documentación de Eventos GTM - Nash Marketing Labs

## Resumen

Todos los botones principales y formularios de la landing page están configurados para enviar eventos a Google Tag Manager (GTM). Esto te permite trackear conversiones, crear audiencias de remarketing y medir el rendimiento de cada elemento.

---

## Eventos Implementados

### 1. **CTA Clicks** (`cta_click`)

Se dispara cuando el usuario hace clic en cualquier botón de llamada a la acción.

**Parámetros:**
- `cta_name`: Nombre del botón clickeado
- `cta_location`: Ubicación del botón en la página

**Ejemplos de eventos:**
```javascript
{
  event: 'cta_click',
  cta_name: '1ª Consulta Gratis',
  cta_location: 'hero_section'
}

{
  event: 'cta_click',
  cta_name: '1ª Consulta Gratis',
  cta_location: 'navbar'
}

{
  event: 'cta_click',
  cta_name: 'Ver casos de éxito',
  cta_location: 'hero_section'
}
```

**Ubicaciones trackeadas:**
- Hero Section: Botón "1ª Consulta Gratis" y "Ver casos de éxito"
- Navbar Desktop: Botón "1ª Consulta Gratis"
- Navbar Mobile: Botón "1ª Consulta Gratis"

---

### 2. **Form Submissions** (`form_submit`)

Se dispara cuando el usuario envía el formulario de contacto principal.

**Parámetros:**
- `form_name`: Nombre del formulario
- `business_type`: Tipo de negocio seleccionado
- `email_domain`: Dominio del email (para privacidad, solo se envía el dominio, no el email completo)

**Ejemplo de evento:**
```javascript
{
  event: 'form_submit',
  form_name: 'contact_form',
  business_type: 'ecommerce',
  email_domain: 'empresa.com'
}
```

**Valores posibles de `business_type`:**
- `ecommerce`
- `leads`
- `both`
- `other`

---

### 3. **Calendly Opens** (`calendly_open`)

Se dispara cuando el usuario hace clic en "Agenda una llamada" y se abre Calendly.

**Parámetros:**
- `source`: Ubicación desde donde se abrió Calendly

**Ejemplo de evento:**
```javascript
{
  event: 'calendly_open',
  source: 'contact_section'
}
```

---

### 4. **Newsletter Subscriptions** (`newsletter_subscribe`)

Se dispara cuando el usuario se suscribe a la newsletter desde el footer.

**Parámetros:**
- `email_domain`: Dominio del email (para privacidad)

**Ejemplo de evento:**
```javascript
{
  event: 'newsletter_subscribe',
  email_domain: 'gmail.com'
}
```

---

### 5. **External Link Clicks** (`external_link_click`)

Se dispara cuando el usuario hace clic en enlaces a redes sociales.

**Parámetros:**
- `link_name`: Nombre de la red social
- `link_url`: URL completa del enlace

**Ejemplos de eventos:**
```javascript
{
  event: 'external_link_click',
  link_name: 'LinkedIn',
  link_url: 'https://www.linkedin.com/in/enriquenasarre/'
}

{
  event: 'external_link_click',
  link_name: 'YouTube',
  link_url: 'https://www.youtube.com/@nashmarketinglabs'
}

{
  event: 'external_link_click',
  link_name: 'Twitter/X',
  link_url: 'https://x.com/enasarrepuy'
}
```

---

## Configuración en Google Tag Manager

### Paso 1: Crear Variables Personalizadas

En GTM, ve a **Variables → Variables definidas por el usuario → Nueva**

Crea las siguientes variables de capa de datos:

1. **cta_name**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `cta_name`

2. **cta_location**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `cta_location`

3. **form_name**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `form_name`

4. **business_type**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `business_type`

5. **email_domain**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `email_domain`

6. **source**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `source`

7. **link_name**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `link_name`

8. **link_url**
   - Tipo: Variable de capa de datos
   - Nombre de variable de capa de datos: `link_url`

---

### Paso 2: Crear Activadores (Triggers)

#### Activador: CTA Clicks
- **Tipo de activador:** Evento personalizado
- **Nombre del evento:** `cta_click`
- **Este activador se activa en:** Todos los eventos personalizados

#### Activador: Form Submissions
- **Tipo de activador:** Evento personalizado
- **Nombre del evento:** `form_submit`
- **Este activador se activa en:** Todos los eventos personalizados

#### Activador: Calendly Opens
- **Tipo de activador:** Evento personalizado
- **Nombre del evento:** `calendly_open`
- **Este activador se activa en:** Todos los eventos personalizados

#### Activador: Newsletter Subscriptions
- **Tipo de activador:** Evento personalizado
- **Nombre del evento:** `newsletter_subscribe`
- **Este activador se activa en:** Todos los eventos personalizados

#### Activador: External Link Clicks
- **Tipo de activador:** Evento personalizado
- **Nombre del evento:** `external_link_click`
- **Este activador se activa en:** Todos los eventos personalizados

---

### Paso 3: Crear Etiquetas (Tags)

#### Ejemplo: Google Analytics 4 - CTA Click Event

1. **Tipo de etiqueta:** Google Analytics: Evento de GA4
2. **ID de medición:** Tu ID de GA4 (G-XXXXXXXXXX)
3. **Nombre del evento:** `cta_click`
4. **Parámetros del evento:**
   - Nombre del parámetro: `cta_name` | Valor: `{{cta_name}}`
   - Nombre del parámetro: `cta_location` | Valor: `{{cta_location}}`
5. **Activación:** Activador "CTA Clicks"

#### Ejemplo: Google Analytics 4 - Form Submit Event

1. **Tipo de etiqueta:** Google Analytics: Evento de GA4
2. **ID de medición:** Tu ID de GA4
3. **Nombre del evento:** `form_submit`
4. **Parámetros del evento:**
   - Nombre del parámetro: `form_name` | Valor: `{{form_name}}`
   - Nombre del parámetro: `business_type` | Valor: `{{business_type}}`
   - Nombre del parámetro: `email_domain` | Valor: `{{email_domain}}`
5. **Activación:** Activador "Form Submissions"

Repite este proceso para cada tipo de evento.

---

### Paso 4: Configurar Conversiones en Google Ads

Una vez que los eventos estén en GA4, puedes marcarlos como conversiones:

1. Ve a **Google Analytics 4 → Configurar → Eventos**
2. Encuentra el evento (ej: `form_submit`)
3. Activa "Marcar como conversión"
4. En Google Ads, importa las conversiones desde GA4

---

## Eventos Recomendados para Conversiones

### Conversiones Principales:
1. **`form_submit`** - Lead caliente (alguien que solicita consulta)
2. **`calendly_open`** - Lead muy caliente (agenda directamente)

### Conversiones Secundarias:
3. **`newsletter_subscribe`** - Lead frío (interés inicial)
4. **`cta_click`** - Micro-conversión (interacción)

---

## Audiencias de Remarketing Recomendadas

### Audiencia 1: "Visitantes que no completaron formulario"
- **Incluir:** Usuarios que vieron la página de contacto
- **Excluir:** Usuarios que dispararon `form_submit` o `calendly_open`
- **Duración:** 30 días

### Audiencia 2: "Leads que agendaron llamada"
- **Incluir:** Usuarios que dispararon `calendly_open`
- **Duración:** 90 días
- **Uso:** Remarketing con ofertas premium

### Audiencia 3: "Suscriptores de newsletter"
- **Incluir:** Usuarios que dispararon `newsletter_subscribe`
- **Excluir:** Usuarios que dispararon `form_submit`
- **Duración:** 180 días
- **Uso:** Nurturing con contenido de valor

---

## Testing y Debugging

### Verificar que los eventos se disparan correctamente:

1. **Modo de Vista Previa de GTM:**
   - En GTM, haz clic en "Vista previa"
   - Abre tu sitio web
   - Interactúa con botones y formularios
   - Verifica que aparezcan los eventos en el panel de depuración

2. **Consola del Navegador:**
   - Abre DevTools (F12)
   - Ve a la pestaña "Console"
   - Deberías ver logs como: `[GTM Event] cta_click {cta_name: "1ª Consulta Gratis", cta_location: "hero_section"}`

3. **Google Tag Assistant:**
   - Instala la extensión "Tag Assistant Legacy" de Chrome
   - Verifica que GTM se carga correctamente
   - Comprueba que los eventos se envían a GA4

---

## Métricas Clave a Monitorear

### En Google Analytics 4:

1. **Tasa de conversión del formulario:**
   - Eventos `form_submit` / Visitas a la página

2. **Tasa de apertura de Calendly:**
   - Eventos `calendly_open` / Clics en CTAs

3. **CTAs más efectivos:**
   - Comparar `cta_click` por `cta_location`

4. **Tipos de negocio más interesados:**
   - Analizar `business_type` en `form_submit`

### En Google Ads:

1. **Coste por lead (CPL):**
   - Gasto / Conversiones `form_submit`

2. **ROAS de remarketing:**
   - Ingresos / Gasto en audiencias de remarketing

---

## Soporte

Si tienes dudas sobre la configuración de GTM o necesitas ayuda para crear audiencias personalizadas, consulta la documentación oficial:

- [Google Tag Manager](https://support.google.com/tagmanager)
- [Google Analytics 4 Events](https://support.google.com/analytics/answer/9322688)
- [Google Ads Conversions](https://support.google.com/google-ads/answer/6095821)

---

**Última actualización:** 19 de noviembre de 2025
