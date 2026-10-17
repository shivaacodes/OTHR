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
  systemStatus: string;
}

export const studioData: StudioInfo = {
  name: 'OTHR',
  category: 'Independent Creative Engineering Studio',
  tagline: "We don't do ordinary.",
  foundingYear: '2024',
  manifesto: [
    'Most software is built to conform. It adheres to the same five Figma templates, depends on bloated component libraries, and treats engineering as an assembly line.',
    'OTHR exists because digital systems can be extraordinary. We believe high-performance engineering and radical visual design are not opposing forces—they are identical disciplines.',
    'We build websites that people screenshot, software that responds before the finger lifts, and tools that convert mundane workflows into tactile joy.',
    'Brutally fast underneath. Unreasonably polished on top.'
  ],
  principles: [
    {
      number: '01',
      headline: 'Function matters.',
      elaboration: 'A breathtaking interaction that fails to solve the underlying problem is decorative waste. We build software that performs critical work under immense load, with zero tolerance for fragility.'
    },
    {
      number: '02',
      headline: 'Details matter.',
      elaboration: 'The exact cubic-bezier curve on a drawer transition. The sub-millisecond audio click on button actuation. The 4-pixel optical compensation in typography. Quality is the accumulation of obsessive decisions.'
    },
    {
      number: '03',
      headline: 'Performance is design.',
      elaboration: 'Speed is not an optimization ticket filed before launch. Speed is the architecture. If an interface stutters or a network call hangs, the user experience collapses. We engineer for instantaneous feedback.'
    },
    {
      number: '04',
      headline: 'Experimentation creates differentiation.',
      elaboration: 'Every breakthrough tool begins as an unhinged prototype. We spend hundreds of hours in our lab breaking things, writing custom shaders, and testing unconventional ideas so our production systems stay miles ahead.'
    },
    {
      number: '05',
      headline: 'Good engineering should feel effortless.',
      elaboration: 'Underneath an elegant interface may lie lock-free ring buffers, complex vector quantizations, or WebGL shader choreography. The user should never feel that complexity. To them, it should simply feel like magic.'
    }
  ],
  stack: [
    {
      category: 'Frontend & Creative Web',
      technologies: ['Astro', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'GSAP', 'Web Audio API']
    },
    {
      category: 'Systems & Backend',
      technologies: ['Rust', 'Go', 'Node.js', 'PostgreSQL', 'Redis', 'WebAssembly']
    },
    {
      category: 'Cloud & Edge Infrastructure',
      technologies: ['Cloudflare Workers', 'Docker', 'AWS', 'Fly.io', 'eBPF']
    }
  ],
  coordinates: [
    {
      label: 'STUDIO // BASE',
      location: 'Bengaluru, India',
      timezone: 'IST',
      offset: 'UTC+5:30'
    },
    {
      label: 'ENGAGEMENTS // GLOBAL',
      location: 'Remote Worldwide',
      timezone: 'ALL REGIONS',
      offset: 'ASYNC-FIRST'
    }
  ],
  contactEmail: 'shivasajay007@gmail.com',
  systemStatus: 'STUDIO ACTIVE // ALL SYSTEMS OPERATIONAL'
};
