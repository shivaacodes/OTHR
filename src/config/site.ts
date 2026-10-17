/**
 * OTHR Studio - Central Site Configuration
 * Controls site metadata, social links, analytics, and contact endpoints.
 * Only configured social links with non-empty URLs are displayed across the site.
 */

export interface SocialLink {
  platform: 'github' | 'x' | 'linkedin' | 'medium';
  label: string;
  url: string | null;
  handle?: string;
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
  tagline: "We don't do ordinary.",
  description: 'We design and engineer websites, software, and automations that make businesses work better. Independent by design. Experimental by nature.',
  category: 'Creative Engineering Studio',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://othr.shivasajay007.workers.dev',
  contactEmail: import.meta.env.CONTACT_EMAIL_TO || 'shivasajay007@gmail.com',
  foundingYear: 2024,

  // Social Presences - Only non-null / non-empty URLs will be displayed
  socials: [
    {
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/shivaacodes/OTHR',
      handle: 'shivaacodes/OTHR'
    },
    {
      platform: 'x',
      label: 'X (Twitter)',
      url: null,
      handle: undefined
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: null,
      handle: undefined
    },
    {
      platform: 'medium',
      label: 'Medium',
      url: null,
      handle: undefined
    }
  ] as SocialLink[],

  // Cloudflare Analytics & Security
  analytics: {
    cloudflareToken: import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN || null
  },
  turnstile: {
    siteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || null
  },

  // Indicative Commercial Pricing Guides (Transparent, non-binding estimates)
  pricing: [
    {
      serviceId: 'digital-upgrade',
      title: 'Digital Upgrade',
      startingRange: '$4,500 – $12,000',
      unit: 'per engagement',
      typicalTimeline: '3–6 weeks',
      note: 'Scope-dependent. Based on technical complexity, 3D/WebGL requirements, and CMS depth.'
    },
    {
      serviceId: 'workflow-fix',
      title: 'Workflow Fix',
      startingRange: '$3,500 – $9,500',
      unit: 'per automation system',
      typicalTimeline: '2–4 weeks',
      note: 'Based on integration surface area, data pipeline volume, and custom interface requirements.'
    },
    {
      serviceId: 'custom-software',
      title: 'Custom Software & SaaS MVP',
      startingRange: '$8,000 – $25,000',
      unit: 'per milestone phase',
      typicalTimeline: '6–12 weeks',
      note: 'Full-stack architecture, database design, API engineering, and production deployment.'
    }
  ] as IndicativePricing[]
};
