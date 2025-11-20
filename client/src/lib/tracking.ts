/**
 * Utilidad para capturar parámetros UTM y datos de atribución
 * Extrae UTMs de la URL actual y almacena información de referrer
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface AttributionData {
  current_url: string;
  referrer: string;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Extrae parámetros UTM de la URL actual
 */
export function getUTMParams(): UTMParams {
  const params = new URLSearchParams(window.location.search);
  
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };
}

/**
 * Obtiene la URL completa actual
 */
export function getCurrentURL(): string {
  return window.location.href;
}

/**
 * Obtiene el referrer (de dónde vino el usuario)
 */
export function getReferrer(): string {
  return document.referrer || 'direct';
}

/**
 * Obtiene la landing page (primera página visitada)
 * Se almacena en sessionStorage para persistir durante la sesión
 */
export function getLandingPage(): string {
  // Intentar obtener de sessionStorage
  const stored = sessionStorage.getItem('landing_page');
  
  if (stored) {
    return stored;
  }
  
  // Si no existe, la página actual es la landing page
  const landingPage = window.location.href;
  sessionStorage.setItem('landing_page', landingPage);
  
  return landingPage;
}

/**
 * Almacena UTMs en sessionStorage cuando el usuario llega al sitio
 * Esto permite mantener los UTMs aunque el usuario navegue por el sitio
 */
export function storeUTMParams(): void {
  const utms = getUTMParams();
  
  // Solo almacenar si hay al menos un parámetro UTM
  if (Object.values(utms).some(value => value !== undefined)) {
    sessionStorage.setItem('utm_params', JSON.stringify(utms));
  }
}

/**
 * Recupera UTMs almacenados en sessionStorage
 * Útil cuando el usuario navega a otra página sin UTMs en la URL
 */
export function getStoredUTMParams(): UTMParams {
  const stored = sessionStorage.getItem('utm_params');
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  
  return {};
}

/**
 * Obtiene todos los datos de atribución para enviar en webhooks
 * Combina URL actual, referrer, landing page y UTMs
 */
export function getAttributionData(): AttributionData {
  // Intentar obtener UTMs de la URL actual
  let utms = getUTMParams();
  
  // Si no hay UTMs en la URL actual, usar los almacenados
  if (!Object.values(utms).some(value => value !== undefined)) {
    utms = getStoredUTMParams();
  }
  
  return {
    current_url: getCurrentURL(),
    referrer: getReferrer(),
    landing_page: getLandingPage(),
    ...utms,
  };
}

/**
 * Inicializa el tracking de atribución
 * Debe llamarse al cargar la página para almacenar UTMs y landing page
 */
export function initAttributionTracking(): void {
  storeUTMParams();
  getLandingPage(); // Esto almacena la landing page si no existe
}
