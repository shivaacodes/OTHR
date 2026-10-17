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
    shortDesc: 'Resilient distributed systems, high-throughput architectures, and fault-tolerant backends engineered for speed.',
    deepDive: 'We build critical digital infrastructure where failure is not an option. From event-driven microservices to low-latency memory caches and specialized runtime protocols, we construct systems engineered to run unattended for years.',
    deliverables: [
      'High-throughput distributed systems & APIs',
      'Event-driven asynchronous micro-architectures',
      'Database schema design, query tuning & vector storage',
      'Fault-tolerant infrastructure & automated self-healing clusters'
    ],
    techFocus: ['Rust', 'Go', 'TypeScript / Node', 'PostgreSQL', 'Redis', 'Docker / K8s'],
    philosophy: 'Code should be as simple as the problem allows, and not an ounce more complicated. We prefer deterministic simplicity over fashionable bloat.'
  },
  {
    number: '02',
    id: 'creative-web-development',
    title: 'Creative Web Development',
    shortDesc: 'Digital flagships, interactive editorial web experiences, WebGL/Three.js centerpieces, and kinetic typography.',
    deepDive: 'Websites should leave an indelible impression. We merge design engineering, custom shaders, smooth kinetic typography, and fluid micro-interactions with brutal frontend performance: 95+ Lighthouse scores and instantaneous loading.',
    deliverables: [
      'Awwwards-caliber interactive web platforms',
      'Custom Three.js & WebGL 3D interactive artifacts',
      'Kinetic typography & GSAP choreography',
      'Headless CMS integrations & static edge deployments'
    ],
    techFocus: ['Astro', 'Three.js / WebGL', 'GSAP', 'GLSL Shaders', 'Tailwind CSS', 'Web Audio API'],
    philosophy: 'Performance is the first design principle. If an animation stutters or a page takes two seconds to load, the design has failed.'
  },
  {
    number: '03',
    id: 'business-automation',
    title: 'Business Automation',
    shortDesc: 'Custom internal workflows, autonomous data pipelines, telemetry consolidation, and intelligent operational tooling.',
    deepDive: 'We automate high-friction operational bottlenecks. By linking disparate enterprise databases, building internal execution consoles, and constructing deterministic ingestion jobs, we convert manual toil into autonomous software.',
    deliverables: [
      'Custom internal operational tools & dashboards',
      'Autonomous asynchronous data ingestion pipelines',
      'Bespoke integrations between legacy and modern APIs',
      'Telemetry instrumentation, alerting & audit logging'
    ],
    techFocus: ['Python', 'TypeScript', 'Serverless Edge Workers', 'Temporal', 'PostgreSQL'],
    philosophy: 'Automate the mechanical so humans can concentrate on the creative. Never make a person do what a 50-line script can execute in 4 milliseconds.'
  },
  {
    number: '04',
    id: 'product-development',
    title: 'Product Development',
    shortDesc: 'End-to-end conception, prototyping, architectural validation, and commercial launch of specialized SaaS software.',
    deepDive: 'We do not just build client systems; we build, ship, and operate our own commercial SaaS platforms. This dual perspective means every client project benefits from battle-tested production product instincts.',
    deliverables: [
      'Zero-to-one product scoping & technical roadmapping',
      'Rapid functional prototyping with real data flows',
      'Production-ready SaaS architecture (auth, tenancy, billing)',
      'Design systems that scale across multi-platform teams'
    ],
    techFocus: ['Next.js / Astro', 'PostgreSQL', 'Stripe', 'Cloudflare Workers', 'Tailwind'],
    philosophy: 'Build software people genuinely enjoy opening every morning. If software feels like a bureaucratic chore, start over.'
  },
  {
    number: '05',
    id: 'experimental-technology',
    title: 'Experimental Technology',
    shortDesc: 'Emergent AI integrations, creative coding sandboxes, procedural audio, and prototypes exploring new digital frontiers.',
    deepDive: 'The future of software is forged in experiments. Our lab is an active playground where we stress-test emerging capabilities: local vector intelligence, generative graphics, procedural sound synthesis, and spatial interfaces.',
    deliverables: [
      'Exploratory proof-of-concepts & tech feasibility studies',
      'Custom procedural generative systems & shaders',
      'Bespoke AI embeddings & context-augmented tooling',
      'Interactive hardware-software bridges & WebHID interfaces'
    ],
    techFocus: ['WebGPU', 'WebAudio', 'GLSL', 'Local LLMs', 'Wasm', 'Canvas2D'],
    philosophy: 'Play is serious work. If you do not experiment with what is technically impossible today, you will be obsolete tomorrow.'
  }
];
