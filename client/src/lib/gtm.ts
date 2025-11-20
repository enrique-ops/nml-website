/**
 * Google Tag Manager Event Tracking Utility
 * 
 * This file provides helper functions to send events to GTM's dataLayer
 * for tracking user interactions across the website.
 */

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Send a custom event to Google Tag Manager
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
    console.log('[GTM Event]', eventName, eventParams);
  } else {
    console.warn('[GTM] dataLayer not available');
  }
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaName: string, ctaLocation: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, formData: Record<string, any> = {}) {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  });
}

/**
 * Track Calendly opens
 */
export function trackCalendlyOpen(source: string) {
  trackEvent('calendly_open', {
    source: source,
  });
}

/**
 * Track newsletter subscriptions
 */
export function trackNewsletterSubscribe(email: string) {
  trackEvent('newsletter_subscribe', {
    email_domain: email.split('@')[1], // Only send domain for privacy
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(linkName: string, linkUrl: string) {
  trackEvent('external_link_click', {
    link_name: linkName,
    link_url: linkUrl,
  });
}
