/**
 * OTHR Studio - Central Site Configuration
 * Controls site metadata, social links, analytics, and contact endpoints.
 */

export interface SocialLink {
  platform: 'github' | 'x' | 'linkedin';
  label: string;
  url: string;
  handle: string;
}

export interface IndicativePricing {
  serviceId: string;
  title: string;
  startingRange: string;
  usdRange: string;
  inrRange: string;
  unit: string;
  typicalTimeline: string;
  note: string;
}

export const siteConfig = {
  name: 'OTHR',
  legalName: 'OTHR Engineering Studio',
  tagline: 'Engineering high-performance software, digital flagships, and original products',
  description: 'Independent creative engineering studio building web flagships, internal automation systems, and original software products.',
  category: 'Creative Engineering Studio',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://othr.shivasajay007.workers.dev',
  contactEmail: import.meta.env.CONTACT_EMAIL_TO || 'shivasajay23@gmail.com',
  foundingYear: 2024,

  // Social Presences
  socials: [
    {
      platform: 'x',
      label: 'X (Twitter)',
      url: 'https://x.com/othrbuilds',
      handle: '@othrbuilds'
    },
    {
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/shivaacodes/OTHR',
      handle: 'shivaacodes/OTHR'
    }
  ] as SocialLink[],

  // Cloudflare Analytics & Security
  analytics: {
    cloudflareToken: import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN || null
  },
  turnstile: {
    siteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || null
  },

  // Indicative Commercial Pricing Guides (Accessible early-stage studio pricing)
  pricing: [
    {
      serviceId: 'digital-upgrade',
      title: 'Digital Flagships & Web',
      startingRange: '$950 – $2,500',
      usdRange: '$950 – $2,500',
      inrRange: '₹45,000 – ₹1,20,000',
      unit: 'per project',
      typicalTimeline: '2–4 weeks',
      note: 'Scope-dependent. High-performance Astro/TypeScript flagships with sub-second edge speeds and kinetic typography.'
    },
    {
      serviceId: 'workflow-fix',
      title: 'Workflow Automation & Ops',
      startingRange: '$750 – $1,800',
      usdRange: '$750 – $1,800',
      inrRange: '₹35,000 – ₹90,000',
      unit: 'per system',
      typicalTimeline: '1–3 weeks',
      note: 'Custom operational portals and automated pipelines replacing fragile spreadsheets and manual data entry.'
    },
    {
      serviceId: 'custom-software',
      title: 'Custom Software & SaaS MVP',
      startingRange: '$1,800 – $4,500',
      usdRange: '$1,800 – $4,500',
      inrRange: '₹90,000 – ₹2,50,000',
      unit: 'per milestone',
      typicalTimeline: '4–8 weeks',
      note: 'Full-stack software architecture, PostgreSQL schemas, clean APIs, and production deployment.'
    }
  ] as IndicativePricing[]
};
