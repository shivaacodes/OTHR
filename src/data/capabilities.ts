export interface Capability {
  number: string;
  id: string;
  title: string;
  shortDesc: string;
  deepDive: string;
  deliverables: string[];
  techFocus: string[];
  philosophy: string;
}

export const capabilities: Capability[] = [
  {
    number: '01',
    id: 'software-engineering',
    title: 'Software Engineering',
    shortDesc: 'Reliable backend services, transactional APIs, and robust relational database architectures built for speed.',
    deepDive: 'We build dependable backend software and web systems designed for throughput and consistency. From transactional APIs in Go and Python to relational schemas and worker queues, we construct software that handles real operational loads with zero fuss.',
    deliverables: [
      'Production REST & event-driven APIs (Go / FastAPI)',
      'Relational database architecture & schema tuning (PostgreSQL)',
      'Background task queues with deterministic rate limiting (Redis)',
      'Dockerized container deployments & cloud edge hosting'
    ],
    techFocus: ['Go', 'Python / FastAPI', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    philosophy: 'Code should be as simple as the problem allows, and not an ounce more complicated. We prefer deterministic simplicity over fashionable bloat.'
  },
  {
    number: '02',
    id: 'creative-web-development',
    title: 'Creative Web Development',
    shortDesc: 'Digital flagships, interactive editorial web experiences, WebGL/Three.js centerpieces, and kinetic typography.',
    deepDive: 'Websites should leave an indelible impression. We merge design engineering, custom shaders, smooth kinetic typography, and fluid micro-interactions with brutal frontend performance: 95+ Lighthouse scores and instantaneous loading.',
    deliverables: [
      'Bespoke interactive brand flagships & web experiences',
      'Custom Three.js & WebGL 3D interactive centerpieces',
      'Kinetic typography & smooth GSAP choreography',
      'Sub-second static edge deployments on Cloudflare'
    ],
    techFocus: ['Astro', 'Three.js / WebGL', 'GSAP', 'Tailwind CSS', 'TypeScript'],
    philosophy: 'Performance is the first design principle. If an animation stutters or a page takes two seconds to load, the design has failed.'
  },
  {
    number: '03',
    id: 'business-automation',
    title: 'Business Automation',
    shortDesc: 'Custom internal workflows, automated document pipelines, and messaging API integrations that eliminate spreadsheet toil.',
    deepDive: 'We automate high-friction operational bottlenecks. By linking disparate databases, creating custom execution consoles, and constructing deterministic document pipelines, we convert manual spreadsheet toil into autonomous software.',
    deliverables: [
      'Custom internal operational tools & dashboards',
      'Automated batch document generation (encrypted payslips, PDFs, CSVs)',
      'WhatsApp Cloud API & third-party webhook integrations',
      'Database synchronization & transactional audit logging'
    ],
    techFocus: ['Go', 'Python', 'PostgreSQL', 'WhatsApp Cloud API', 'Redis'],
    philosophy: 'Automate the mechanical so humans can concentrate on the creative. Never make a person do what a 50-line script can execute in 4 milliseconds.'
  },
  {
    number: '04',
    id: 'product-development',
    title: 'Product Development',
    shortDesc: 'End-to-end conception, rapid prototyping, and production launch of specialized web applications and SaaS MVPs.',
    deepDive: 'We build, prototype, and ship real digital products. We work with founders to turn ideas into working MVPs with robust authentication, billing, database schemas, and clean user interfaces.',
    deliverables: [
      'Zero-to-one product scoping & technical roadmapping',
      'Rapid functional prototyping with real data flows',
      'Production full-stack architecture (auth, database, billing)',
      'Responsive, accessible design systems'
    ],
    techFocus: ['Astro', 'FastAPI / Go', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    philosophy: 'Build software people genuinely enjoy opening every morning. If software feels like a bureaucratic chore, start over.'
  },
  {
    number: '05',
    id: 'experimental-technology',
    title: 'Experimental Technology',
    shortDesc: 'Interactive 3D graphics, creative coding sandboxes, procedural audio, and prototypes exploring new digital frontiers.',
    deepDive: 'The future of software is forged in experiments. Our lab is an active playground where we stress-test emerging browser capabilities: WebGL shaders, Canvas2D physics simulations, procedural sound synthesis, and spatial interfaces.',
    deliverables: [
      'Interactive 3D prototypes & WebGL graphics',
      'Procedural 2D/3D physics simulations & shaders',
      'Web Audio API synthesizers & sound design',
      'Exploratory browser proof-of-concepts & tech feasibility studies'
    ],
    techFocus: ['WebGL / Three.js', 'Canvas2D', 'Web Audio API', 'TypeScript', 'GLSL'],
    philosophy: 'Play is serious work. If you do not experiment with what is technically impossible today, you will be obsolete tomorrow.'
  }
];
