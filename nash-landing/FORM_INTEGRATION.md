# Integración del Formulario de Contacto

El formulario de contacto está preparado para integrarse con **Make.com** o **MailerLite**. Actualmente funciona en modo simulación.

## Opción 1: Integración con Make.com (Recomendado)

### Paso 1: Crear Webhook en Make
1. Ve a [Make.com](https://www.make.com)
2. Crea un nuevo escenario
3. Añade el módulo "Webhooks" → "Custom webhook"
4. Copia la URL del webhook generada

### Paso 2: Configurar el formulario
1. Abre el archivo: `client/src/components/ContactSection.tsx`
2. Busca la línea 24 que dice: `// const webhookUrl = 'YOUR_MAKE_WEBHOOK_URL'`
3. Descomenta y reemplaza con tu URL:
   ```typescript
   const webhookUrl = 'https://hook.eu1.make.com/tu-webhook-id';
   ```
4. Descomenta las líneas 27-31 (el bloque de fetch para Make.com)
5. Comenta o elimina la línea 49 (simulación temporal)

### Paso 3: Configurar acciones en Make
El webhook recibirá estos datos:
```json
{
  "email": "cliente@ejemplo.com",
  "businessType": "ecommerce",
  "timestamp": "2025-11-19T12:00:00.000Z"
}
```

Acciones sugeridas en Make:
- Enviar email a clientes@nashmarketinglabs.com
- Añadir a Google Sheets
- Crear tarea en tu CRM
- Enviar notificación a Slack/Teams

---

## Opción 2: Integración con MailerLite

### Paso 1: Obtener API Key
1. Ve a [MailerLite](https://www.mailerlite.com)
2. Settings → Developer API → Generate new token
3. Copia la API key

### Paso 2: Configurar el formulario
1. Abre el archivo: `client/src/components/ContactSection.tsx`
2. Busca la línea 34 que dice: `// const response = await fetch('https://api.mailerlite.com/api/v2/subscribers'`
3. Descomenta las líneas 34-44
4. Reemplaza `'YOUR_API_KEY'` con tu API key de MailerLite
5. Comenta o elimina la línea 49 (simulación temporal)

### Paso 3: Crear grupo en MailerLite
1. Crea un grupo llamado "Leads - Consulta Gratuita"
2. Los contactos se añadirán automáticamente con el campo `business_type`

---

## Opción 3: Integración con Zapier

Similar a Make.com:
1. Crea un Zap con trigger "Webhooks by Zapier"
2. Usa la URL del webhook en lugar de la de Make
3. Configura acciones (email, CRM, sheets, etc.)

---

## Testing

Después de configurar, prueba el formulario:
1. Abre la consola del navegador (F12)
2. Envía el formulario
3. Verifica que no hay errores en la consola
4. Confirma que recibes los datos en Make/MailerLite

---

## Soporte

Si necesitas ayuda con la integración, consulta:
- [Documentación de Make.com](https://www.make.com/en/help/webhooks)
- [Documentación de MailerLite API](https://developers.mailerlite.com/)
