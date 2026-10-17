/**
 * Privacy-Conscious Studio Analytics Dispatcher
 * Dispatches non-invasive behavioral telemetry without storing personal data or setting cookies.
 * Adheres strictly to Do-Not-Track (DNT) flags.
 */

export type AnalyticsEventType =
  | 'cta_click'
  | 'project_view'
  | 'inquiry_submitted'
  | 'product_interest'
  | 'journal_read'
  | 'theme_toggled';

export interface AnalyticsPayload {
  name: AnalyticsEventType;
  properties?: Record<string, string | number | boolean>;
}

export function trackEvent(name: AnalyticsEventType, properties?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return;

  // Respect Do Not Track
  if (navigator.doNotTrack === '1' || (window as any).doNotTrack === '1') {
    return;
  }

  // Sanitize properties to prevent accidental inclusion of PII
  const sanitizedProps: Record<string, any> = {};
  if (properties) {
    for (const [key, val] of Object.entries(properties)) {
      if (['name', 'email', 'phone', 'message', 'description', 'password'].includes(key.toLowerCase())) {
        continue; // Never track PII
      }
      sanitizedProps[key] = val;
    }
  }

  // Broadcast custom event for Cloudflare / custom edge sinks
  try {
    const event = new CustomEvent('othr_analytics', {
      detail: {
        event: name,
        properties: sanitizedProps,
        timestamp: Date.now(),
        path: window.location.pathname
      }
    });
    window.dispatchEvent(event);

    // If Cloudflare Web Analytics or custom collector is configured:
    if ((window as any).__CF_ANALYTICS_COLLECTOR__) {
      (window as any).__CF_ANALYTICS_COLLECTOR__(name, sanitizedProps);
    }
  } catch (e) {
    // Fail silently without disrupting UI
  }
}
