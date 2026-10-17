export interface Product {
  id: string;
  name: string;
  version: string;
  status: 'IN ACTIVE DEVELOPMENT' | 'PROTOTYPE' | 'ROADMAP';
  tagline: string;
  description: string;
  category: string;
  implementedFeatures: {
    title: string;
    detail: string;
  }[];
  roadmapFeatures: {
    title: string;
    detail: string;
  }[];
  techStack: string[];
  specs: {
    label: string;
    value: string;
  }[];
  ctaText: string;
  isFlagship: boolean;
}

export const products: Product[] = [
  {
    id: 'wrapforge',
    name: 'WrapForge',
    version: '0.2.1-prototype',
    status: 'IN ACTIVE DEVELOPMENT',
    isFlagship: true,
    tagline: 'WebGL 3D packaging visualization and real-time box fold simulation prototype.',
    category: '3D Mockup & Packaging Platform',
    description: 'WrapForge is an experimental studio tool bridging 2D flat packaging artwork and interactive 3D physical mockups. Currently in active prototype development, it allows designers to preview box fold kinematics and material finishes directly in modern desktop and mobile browsers.',
    implementedFeatures: [
      {
        title: 'Interactive 3D Box Kinematics',
        detail: 'Real-time procedural folding simulation in WebGL with interactive 360-degree orbit rotation.'
      },
      {
        title: 'Physically Based Shaders (PBR)',
        detail: 'Optical simulation of foil stamping, spot gloss UV varnish, and matte cardstock textures under dynamic lighting.'
      },
      {
        title: 'Zero-Install Browser Inspection',
        detail: 'Instant client review links that run client-side on mobile and desktop without plugins or 3D software.'
      }
    ],
    roadmapFeatures: [
      {
        title: 'Parametric Vector Dieline Parser',
        detail: 'Direct parsing of AI / CAD cut & crease vectors to generate arbitrary 3D packaging topologies.'
      },
      {
        title: 'Vector Roundtrip Export',
        detail: 'Export calibrated crease marks and varnish separation masks back to print-ready PDF/X.'
      }
    ],
    techStack: ['Three.js', 'WebGL', 'GLSL Shaders', 'TypeScript', 'Astro'],
    specs: [
      { label: 'Render Pipeline', value: 'Custom Three.js PBR Shaders' },
      { label: 'Current Phase', value: 'Internal Working Prototype' },
      { label: 'Client Requirement', value: 'WebGL 2.0 Browser' },
      { label: 'Alpha Target', value: 'Late 2026' }
    ],
    ctaText: 'REQUEST ALPHA PREVIEW'
  }
];
