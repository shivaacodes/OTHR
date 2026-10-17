export interface Experiment {
  id: string;
  code: string;
  title: string;
  category: 'Shader / GLSL' | 'Audio DSP' | 'Generative Math' | 'Physics Simulation' | 'Typography';
  status: 'LIVE PROTOTYPE' | 'IN DEVELOPMENT' | 'EXPERIMENTAL';
  description: string;
  tags: string[];
  date: string;
  interactiveType: 'fluid' | 'ascii' | 'audio' | 'torus' | 'lattice';
  instructions: string;
}

export const experiments: Experiment[] = [
  {
    id: 'exp-01',
    code: 'LAB-084',
    title: 'CHROMA-FIELD // Kinetic Vector Dye',
    category: 'Shader / GLSL',
    status: 'LIVE PROTOTYPE',
    description: 'Real-time 2D Navier-Stokes velocity advection on the GPU. Cursor velocity generates localized turbulence while acid lime dye dissipates according to viscous diffusion.',
    tags: ['WebGL', 'GLSL', 'Fluid Dynamics', 'Eulerian Simulation'],
    date: '2025.02',
    interactiveType: 'fluid',
    instructions: 'Move cursor across canvas to inject kinetic energy and trace fluid vectors.'
  },
  {
    id: 'exp-02',
    code: 'LAB-091',
    title: 'ASCII-NORMALS // Surface Luminance Raster',
    category: 'Typography',
    status: 'LIVE PROTOTYPE',
    description: 'Real-time raymarched 3D geometric solid rendered purely through high-contrast UTF-8 monospace glyphs, mapped to surface normals and specular angle calculations.',
    tags: ['Monospace Glyphs', 'Raymarching', 'Shading', 'Canvas 2D'],
    date: '2025.01',
    interactiveType: 'ascii',
    instructions: 'Drag to rotate the 3D glyph volume. Observe glyph density adapt to lighting angle.'
  },
  {
    id: 'exp-03',
    code: 'LAB-072',
    title: 'DRONE-SYNTH // Harmonic Overtone Generator',
    category: 'Audio DSP',
    status: 'LIVE PROTOTYPE',
    description: 'Algorithmic drone synthesizer built with the Web Audio API. Chains five micro-tuned sinusoidal oscillators with FM modulation and interactive resonant low-pass filter.',
    tags: ['Web Audio API', 'Additive Synthesis', 'FM Synthesis', 'BiquadFilter'],
    date: '2024.11',
    interactiveType: 'audio',
    instructions: 'Toggle audio oscillator to generate live ambient drone frequencies.'
  },
  {
    id: 'exp-04',
    code: 'LAB-065',
    title: 'TOPOLOGICAL-KNOT // Parametric Torus Weave',
    category: 'Generative Math',
    status: 'LIVE PROTOTYPE',
    description: 'Interactive visualization of (p,q) torus knots rendered with high-precision parametric curves and dynamic tube geometry extrusions.',
    tags: ['Three.js', 'Parametric Math', 'Differential Geometry'],
    date: '2024.09',
    interactiveType: 'torus',
    instructions: 'Hover and drag to deform spatial winding numbers in real-time.'
  },
  {
    id: 'exp-05',
    code: 'LAB-059',
    title: 'QUANTUM-LATTICE // Emergent Cellular Grid',
    category: 'Physics Simulation',
    status: 'EXPERIMENTAL',
    description: 'Multi-state cellular automaton simulating quantum tunneling and flocking mechanics across a 128x128 discrete spatial grid.',
    tags: ['Cellular Automata', 'Emergent Complexity', 'Particle Physics'],
    date: '2024.08',
    interactiveType: 'lattice',
    instructions: 'Click to seed particle cluster anomalies across the lattice coordinate plane.'
  }
];
