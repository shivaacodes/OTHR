export interface Product {
  id: string;
  name: string;
  version: string;
  status: 'IN ACTIVE DEVELOPMENT' | 'INTERNAL ALPHA' | 'PLANNED';
  tagline: string;
  description: string;
  category: string;
  features: {
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
    version: '0.4.2-alpha',
    status: 'IN ACTIVE DEVELOPMENT',
    isFlagship: true,
    tagline: 'Precision 3D packaging visualization and parametric dieline engineering platform.',
    category: '3D Mockup & Packaging Platform',
    description: 'WrapForge bridges the gap between 2D vector packaging dielines and hyper-realistic 3D physical mockups. Designers upload flat artwork, map folds and finishes (hot foil, embossing, spot UV, holographic laminates) in real-time WebGL, and export production-ready dielines and cinematic renders in seconds.',
    features: [
      {
        title: 'Parametric Dieline Folding',
        detail: 'Automatic folding physics simulation converting flat CAD / AI cut lines into closed 3D geometric boxes without manual rigging.'
      },
      {
        title: 'Physically Based Finishes (PBR)',
        detail: 'Accurate optical simulation of foil stamping, matte soft-touch coatings, spot gloss varnish, and textured cardstocks with realistic lighting.'
      },
      {
        title: 'Instant 3D Client Share Links',
        detail: 'Zero-install interactive browser links allowing clients to inspect packaging in full 360-degree rotation on mobile or desktop.'
      },
      {
        title: 'Vector Roundtrip Export',
        detail: 'Export updated dielines with bleed margins, fold calibrations, and spot-varnish separation layers directly back to Illustrator or PDF/X.'
      }
    ],
    techStack: ['Next.js', 'Three.js / WebGL', 'WebAssembly', 'Rust Dieline Engine', 'Tailwind CSS'],
    specs: [
      { label: 'Render Engine', value: 'Custom Three.js PBR Pipeline' },
      { label: 'Dieline Parser', value: 'Rust Wasm CAD Geometry Kernel' },
      { label: 'Export Formats', value: 'GLTF, USDZ, Print-Ready PDF/X, 4K WebP' },
      { label: 'Target Availability', value: 'Private Alpha Q3 2025' }
    ],
    ctaText: 'REQUEST ALPHA ACCESS'
  },
  {
    id: 'glyphgrid',
    name: 'GlyphGrid',
    version: '1.2.0',
    status: 'INTERNAL ALPHA',
    isFlagship: false,
    tagline: 'Variable typography stress-testing and dynamic optical-size specimen compiler.',
    category: 'Typography & Editorial Tool',
    description: 'An internal studio utility built to test variable font axes, kerning anomalies, sub-pixel rasterization, and kinetic type animations across varying viewport densities.',
    features: [
      {
        title: 'Multi-Axis Sliders',
        detail: 'Simultaneous scrubbing of weight, width, slant, and custom font variation axes with millisecond response.'
      },
      {
        title: 'Kerning Matrix Inspector',
        detail: 'Automated identification of awkward glyph pairings across hundreds of unicode combinations.'
      }
    ],
    techStack: ['Vanilla TypeScript', 'Canvas2D', 'OpenType.js'],
    specs: [
      { label: 'Engine', value: 'Hardware-accelerated 2D Canvas' },
      { label: 'Supported Formats', value: 'WOFF2, TTF, OTF' }
    ],
    ctaText: 'STUDIO INTERNAL TOOL'
  },
  {
    id: 'pulselog',
    name: 'PulseLog',
    version: '0.9.1',
    status: 'INTERNAL ALPHA',
    isFlagship: false,
    tagline: 'Zero-overhead telemetry, real-user performance profiling, and error trace recorder.',
    category: 'Developer Infrastructure',
    description: 'A 1.8KB instrumentation snippet built for our client deployments. Records Core Web Vitals, frame rate drops, unhandled exceptions, and network watermarks without third-party tracking scripts.',
    features: [
      {
        title: 'Zero Third-Party Cookies',
        detail: 'Privacy-first telemetry compliant with strictest data mandates; zero fingerprinting.'
      },
      {
        title: 'FPS & Long-Task Heatmaps',
        detail: 'Captures precise millisecond duration of main-thread freezes and GPU redraw stalls.'
      }
    ],
    techStack: ['Rust Cloudflare Worker', 'PerformanceObserver', 'ClickHouse'],
    specs: [
      { label: 'Payload Footprint', value: '1.8 KB gzipped' },
      { label: 'Runtime Cost', value: '< 0.2ms per beacon' }
    ],
    ctaText: 'STUDIO INTERNAL TOOL'
  }
];
