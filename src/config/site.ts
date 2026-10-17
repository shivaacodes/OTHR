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

  // Indicative Commercial Pricing Guides
  pricing: [
    {
      serviceId: 'digital-upgrade',
      title: 'Digital Flagships & Web',
      startingRange: '$4,500 – $12,000',
      unit: 'per engagement',
      typicalTimeline: '3–6 weeks',
      note: 'Scope-dependent. High-performance Astro/Next.js flagships with 3D WebGL and sub-second edge speeds.'
    },
    {
      serviceId: 'workflow-fix',
      title: 'Workflow Automation & Ops',
      startingRange: '$3,500 – $9,500',
      unit: 'per system',
      typicalTimeline: '2–4 weeks',
      note: 'Custom operational portals replacing fragile spreadsheets and manual workflows.'
    },
    {
      serviceId: 'custom-software',
      title: 'Custom Software & SaaS MVP',
      startingRange: '$8,000 – $25,000',
      unit: 'per milestone',
      typicalTimeline: '6–12 weeks',
      note: 'Full-stack software architecture, PostgreSQL schemas, clean APIs, and production deployment.'
    }
  ] as IndicativePricing[]
};
