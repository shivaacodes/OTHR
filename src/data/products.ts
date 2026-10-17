export interface ProductPricingPlan {
  name: string;
  price: string;
  priceUsd: string;
  priceInr: string;
  billing: string;
  billingUsd: string;
  billingInr: string;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
}

export interface ProductWorkflowStep {
  step: string;
  title: string;
  description: string;
  formats?: string[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  category: string;
  status: string;
  url: string;
  demoUrl: string;
  designerUrl: string;
  accentColor: string;
  accentGlow: string;
  description: string;
  proofBadge: string;
  workflow: ProductWorkflowStep[];
  exportFormats: { name: string; label: string }[];
  featuredModel: {
    name: string;
    description: string;
    material: string;
    dimensions: string;
    interactiveUrl: string;
  };
  pricingPlans: ProductPricingPlan[];
  highlights: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: 'mockgen',
    name: 'MockGen',
    tagline: 'AI Generated 3D Mockups Ready for Print',
    subtitle: 'A professional asset pipeline for physical products. Precision outputs with zero guesswork',
    category: 'AI 3D Packaging Pipeline',
    status: 'LIVE PRODUCT // PRODUCTION',
    url: 'https://trymockgen.vercel.app/',
    demoUrl: 'https://trymockgen.vercel.app/#demo',
    designerUrl: 'https://trymockgen.vercel.app/dashboard?model=%2Fmodels%2Fsoda_can.glb',
    accentColor: '#FFE500',
    accentGlow: 'rgba(255, 229, 0, 0.45)',
    proofBadge: 'FROM IDEA TO PRINTER FILE IN 45 SECONDS',
    description: 'Unlike normal AI images that produce flat, distorted approximations, MockGen generates print-ready packaging files with exact dimensions, bleed margins, and isolated layers. Perfect for freelance designers, agile agencies, and D2C brands who need to send files straight to manufacturing.',
    workflow: [
      {
        step: '01',
        title: 'Describe The Vibe',
        description: 'Input your vision. The AI understands physical texture, optical lighting, and material properties.'
      },
      {
        step: '02',
        title: 'Inspect & Edit Layers',
        description: 'Generates a complete layered project file, not just a flat image. Edit logos, condensation, and base materials individually.'
      },
      {
        step: '03',
        title: 'Real-Time Visualization',
        description: 'Instant, photorealistic 3D feedback on complex curved cylindrical surfaces. Stop guessing with flat vector mockups.'
      },
      {
        step: '04',
        title: 'Export Production Files',
        description: 'Download the exact assets you need for manufacturing, client presentations, or 3D web integration.',
        formats: ['PSD Photoshop', 'OBJ 3D Object', 'GLB Web Ready', 'KITS / UV Maps']
      }
    ],
    exportFormats: [
      { name: 'PSD', label: 'Photoshop Layered' },
      { name: 'OBJ', label: '3D Geometry' },
      { name: 'GLB', label: 'Web-Ready 3D' },
      { name: 'UV MAPS', label: 'Print Dieline' }
    ],
    featuredModel: {
      name: 'Full Wrap Beverage Can',
      description: 'Print-ready wrap for cold drinks, energy drinks, soda, or small-batch beverage brands. Perfect for breweries and café-branded cans.',
      material: 'Standard / Metallic Specular',
      dimensions: 'Production Ready Exact Bleed',
      interactiveUrl: 'https://trymockgen.vercel.app/dashboard?model=%2Fmodels%2Fsoda_can.glb'
    },
    pricingPlans: [
      {
        name: 'Starter',
        price: '$0',
        priceUsd: '$0',
        priceInr: '₹0',
        billing: 'free trial',
        billingUsd: 'free trial',
        billingInr: 'free trial',
        description: 'Ideal for testing concepts and personal packaging explorations.',
        features: [
          '100 FREE Credits (one-time)',
          'About 2 full projects',
          'Low-Res Renders (72 DPI)',
          'Watermarked Results',
          'Community Support'
        ],
        ctaText: 'START CREATING FREE',
        ctaUrl: 'https://trymockgen.vercel.app/?auth=signup'
      },
      {
        name: 'Creator',
        price: '$5',
        priceUsd: '$5',
        priceInr: '₹299',
        billing: 'per month',
        billingUsd: 'per month',
        billingInr: 'per month',
        badge: 'BEST VALUE',
        description: 'For freelance designers, art directors, and packaging pros.',
        features: [
          '1,000 Credits / Month',
          'About 20–25 projects/mo',
          'High-Res 4K Renders',
          'Commercial Usage License',
          'Access to Advanced Materials (Metallic, Foil)',
          'Priority Generation Queue'
        ],
        ctaText: 'GET CREATOR',
        ctaUrl: 'https://trymockgen.vercel.app/?auth=signup'
      },
      {
        name: 'Agency',
        price: '$15',
        priceUsd: '$15',
        priceInr: '₹899',
        billing: 'per month',
        billingUsd: 'per month',
        billingInr: 'per month',
        badge: 'FOR TEAMS',
        description: 'For agile design teams, brand studios, and fast-growing D2C agencies.',
        features: [
          '3,000 Credits / Month',
          'About 60–70 projects/mo',
          'Team Seats (2 Included)',
          'API Access (Beta)',
          'Discounted Credit Top-Ups',
          'Dedicated Account Support'
        ],
        ctaText: 'GO AGENCY',
        ctaUrl: 'https://trymockgen.vercel.app/?auth=signup'
      }
    ],
    highlights: [
      { label: 'WORKFLOW VELOCITY', value: '45 SECONDS' },
      { label: 'OUTPUT RESOLUTION', value: '4K PRINT-READY' },
      { label: 'PRODUCTION EXPORTS', value: 'PSD + OBJ + GLB' },
      { label: 'PRICING START', value: '$0 FREE TRIAL' }
    ]
  }
];
