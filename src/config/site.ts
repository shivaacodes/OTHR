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
  contactPhone: '+91 9995228904',
  contactPhoneDisplay: '+91 99952 28904',
  contactPhoneTel: 'tel:+919995228904',
  whatsappUrl: 'https://wa.me/919995228904',
  author: 'Shiva Sajay',
  location: 'Kochi, Kerala, India',
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
      serviceId: 'flagship-web',
      title: 'Flagship Web Development',
      startingRange: '$450 – $950',
      usdRange: '$450 – $950',
      inrRange: '₹25,000 – ₹55,000',
      unit: 'per project',
      typicalTimeline: '1–3 weeks',
      note: 'Scope-dependent. High-performance Astro/TypeScript flagships with sub-second edge speeds and kinetic typography.'
    },
    {
      serviceId: 'software-automation',
      title: 'Software & Automation',
      startingRange: '$650 – $1,400',
      usdRange: '$650 – $1,400',
      inrRange: '₹35,000 – ₹85,000',
      unit: 'per system',
      typicalTimeline: '2–4 weeks',
      note: 'Scope-dependent. Custom operational tools, robust backend APIs, and automated pipelines eliminating spreadsheet toil.'
    }
  ] as IndicativePricing[]
};
