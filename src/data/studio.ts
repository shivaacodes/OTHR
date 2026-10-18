export interface Principle {
  number: string;
  headline: string;
  elaboration: string;
}

export interface StudioInfo {
  name: string;
  category: string;
  tagline: string;
  foundingYear: string;
  manifesto: string[];
  principles: Principle[];
  stack: {
    category: string;
    technologies: string[];
  }[];
  coordinates: {
    label: string;
    location: string;
    timezone: string;
    offset: string;
  }[];
  contactEmail: string;
  contactPhone: string;
  systemStatus: string;
}

export const studioData: StudioInfo = {
  name: 'OTHR',
  category: 'Independent Creative Engineering Studio',
  tagline: 'Engineering high-performance software, digital flagships, and original products',
  foundingYear: '2024',
  manifesto: [
    'Most software is built to conform. It adheres to generic corporate templates, depends on bloated dependencies, and treats engineering as an assembly line.',
    'OTHR exists because digital systems can be extraordinary. We believe high-performance engineering and radical visual design are the same discipline.',
    'We build websites that stand out, software that responds before the finger lifts, and tools that convert mundane workflows into tactile joy.',
    'Brutally fast underneath. Unreasonably polished on top.'
  ],
  principles: [
    {
      number: '01',
      headline: 'Function matters',
      elaboration: 'A breathtaking interaction that fails to solve the underlying problem is decorative waste. We build software that performs critical work under load, with zero tolerance for fragility.'
    },
    {
      number: '02',
      headline: 'Details matter',
      elaboration: 'The exact easing curve on a transition. Sub-millisecond feedback on button clicks. Optical compensation in typography. Quality is the accumulation of obsessive decisions.'
    },
    {
      number: '03',
      headline: 'Performance is design',
      elaboration: 'Speed is not an optimization ticket filed before launch. Speed is the architecture. If an interface stutters or a network call hangs, the user experience collapses.'
    },
    {
      number: '04',
      headline: 'Experimentation creates differentiation',
      elaboration: 'Every breakthrough tool begins as an unhinged prototype. We test unconventional ideas and creative code so our production systems stay miles ahead.'
    },
    {
      number: '05',
      headline: 'Good engineering feels effortless',
      elaboration: 'Underneath an elegant interface lie robust relational schemas, deterministic queues, and WebGL choreography. The user should never feel that complexity: to them, it just works.'
    }
  ],
  stack: [
    {
      category: 'Frontend & Creative Web',
      technologies: ['Astro', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'GSAP']
    },
    {
      category: 'Systems & Backend',
      technologies: ['Go', 'Python / FastAPI', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      category: 'Cloud & Edge Infrastructure',
      technologies: ['Cloudflare Workers', 'Docker', 'AWS', 'Vercel']
    }
  ],
  coordinates: [
    {
      label: 'Studio Base',
      location: 'Kochi, India',
      timezone: 'IST',
      offset: 'UTC+5:30'
    },
    {
      label: 'Global Engagements',
      location: 'Remote Worldwide',
      timezone: 'All Regions',
      offset: 'Async-First'
    }
  ],
  contactEmail: 'shivasajay23@gmail.com',
  contactPhone: '+91 99952 28904',
  systemStatus: 'Studio Active'
};
