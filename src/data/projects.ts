export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: 'Custom Software' | 'Workflow Automation' | 'Creative Web' | 'SaaS & Products';
  year: string;
  featured: boolean;
  draft?: boolean;
  statusText?: string;
  scope: string[];
  technologies: string[];
  overview: string;
  problem: string;
  approach: string;
  architecture: {
    title: string;
    description: string;
    points: string[];
  };
  challenges: {
    challenge: string;
    resolution: string;
  }[];
  outcomes: string[];
  relatedSlugs: string[];
}

export const projects: CaseStudy[] = [
  {
    slug: 'payroll-automation-platform',
    title: 'Payroll Automation & WhatsApp Dispatch',
    tagline: 'Automating monthly payslip generation, encrypted PDF delivery, and solving WhatsApp Cloud API burst limits in Go.',
    category: 'Workflow Automation',
    year: '2024',
    featured: true,
    draft: false,
    scope: ['Go Batch Processing', 'WhatsApp Cloud API Integration', 'PDF Encryption', 'Queue Pacing & Retry Handling'],
    technologies: ['Go', 'WhatsApp Cloud API', 'PostgreSQL', 'Docker'],
    overview: 'A month-end payroll pipeline built to automate the calculation of salary deductions, generate password-protected PDF payslips, and deliver them directly to employees over WhatsApp. The project proved to be an invaluable masterclass in third-party API velocity limits and queue pacing.',
    problem: 'The finance desk spent days manually exporting spreadsheets, computing tax withholdings, and individually emailing unencrypted PDFs. Email open rates on mobile were low, leading to constant requests for resends. The goal was to automate document generation and deliver directly to employees on WhatsApp.',
    approach: 'We built a Go batch daemon to validate payroll records and compile encrypted PDFs concurrently, paired with an API dispatch worker to communicate with Meta’s WhatsApp Cloud API.',
    architecture: {
      title: 'Batch Generation & Paced Queue Pipeline',
      description: 'A two-stage architecture isolating document compilation from external API delivery.',
      points: [
        'Go microservice using goroutines for concurrent, in-memory PDF generation and encryption.',
        'Single-binary architecture deployed in a lightweight Docker container.',
        'Token-bucket dispatch queue pacing outbound requests to stay below Meta API burst thresholds.',
        'Asynchronous status webhooks tracking message delivery states (Sent, Delivered, Read, Failed).'
      ]
    },
    challenges: [
      {
        challenge: 'WhatsApp Cloud API burst rate limit failure',
        resolution: 'During the first large run, unthrottled concurrent goroutines flooded Meta’s Graph endpoint within seconds. The API returned HTTP 429, and Meta downgraded the sender quality rating from High to Medium. We rebuilt the dispatcher around a strict token-bucket rate limiter clamped to 12 messages/second, paired with exponential backoff for transient failures.'
      },
      {
        challenge: 'Handling phone number formatting anomalies',
        resolution: 'Inconsistent country codes and missing leading zeros in legacy spreadsheets caused silent delivery drops. We added a pre-validation stage using Google libphonenumber standards before generating documents.'
      }
    ],
    outcomes: [
      'Automated document compilation reduced generation time from days of manual work to under 15 minutes.',
      'Document delivery moved directly to employee mobile phones, dramatically reducing payroll support tickets.',
      'Established a resilient rate-pacing pattern now used as a standard for all our outbound messaging integrations.'
    ],
    relatedSlugs: ['recruitment-management-system']
  },
  {
    slug: 'recruitment-management-system',
    title: 'Recruitment Management System',
    tagline: 'Custom candidate pipeline tracking, stage transitions, and interviewer scheduling built with FastAPI and PostgreSQL.',
    category: 'Custom Software',
    year: '2024',
    featured: true,
    draft: false,
    scope: ['FastAPI Backend', 'PostgreSQL Data Modeling', 'Interview Scheduling', 'Kanban Pipeline UI'],
    technologies: ['Python / FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Tailwind CSS', 'Docker'],
    overview: 'A bespoke candidate management application built to replace messy spreadsheets and fragmented email chains with a clean, centralized operational platform.',
    problem: 'Hiring coordinators were managing candidate stages across multiple shared sheets. Interview notes were lost in email threads, coordinators accidentally double-booked interview panels, and status reporting required hours of manual spreadsheet reconciliation.',
    approach: 'We engineered a focused web application using FastAPI and PostgreSQL, featuring an intuitive stage-pipeline interface, structured interview note logging, and relational integrity constraints.',
    architecture: {
      title: 'Normalized Relational Workflow Engine',
      description: 'A type-safe architecture tracking candidate progress from application to final offer.',
      points: [
        'Normalized PostgreSQL schema enforcing relational integrity across jobs, candidates, and interview slots.',
        'FastAPI asynchronous REST endpoints with Pydantic schema validation for all incoming payloads.',
        'Kanban pipeline interface providing clear visual visibility into candidate status.',
        'Audit log table recording every stage transition with author timestamps.'
      ]
    },
    challenges: [
      {
        challenge: 'Preventing concurrent interview scheduling collisions',
        resolution: 'Coordinators frequently opened the same candidate record simultaneously. We implemented database-level transaction locks (`SELECT FOR UPDATE`) on interview slots to ensure a slot could not be booked twice in the same window.'
      },
      {
        challenge: 'Managing flexible interview stages per job role',
        resolution: 'Designed a configurable stage configuration table allowing technical roles and operational roles to have distinct interview tracks while sharing a unified candidate pool.'
      }
    ],
    outcomes: [
      'Replaced 4 disconnected spreadsheets with a single, role-secured operational web app.',
      'Eliminated interviewer double-booking errors through database-level slot validation.',
      'Reduced weekly status reporting preparation time from 3 hours to an instant filter view.'
    ],
    relatedSlugs: ['payroll-automation-platform', 'tedx-treasure-hunt']
  },
  {
    slug: 'tedx-treasure-hunt',
    title: 'TEDx Interactive Event Platform',
    tagline: 'Real-time geofenced interactive treasure hunt web app with live leaderboard for ~180+ conference participants.',
    category: 'Creative Web',
    year: '2024',
    featured: true,
    draft: false,
    scope: ['HTML5 Geolocation', 'WebGL Compass Canvas', 'Real-time WebSocket Leaderboard', 'Mobile Web App'],
    technologies: ['Astro', 'TypeScript', 'Three.js / Canvas', 'WebSockets', 'Tailwind CSS'],
    overview: 'A browser-based interactive scavenger hunt built for ~180+ attendees at an annual TEDx conference. Attendees navigated campus landmarks using GPS geofencing, solved riddles, and competed on a live main-stage projection leaderboard.',
    problem: 'The organizing team wanted an engaging activity during intermissions to encourage attendees to explore campus landmarks. Asking participants to download a native app from the App Store would result in high drop-off rates due to mobile data friction.',
    approach: 'We engineered a zero-install mobile web application accessible instantly via QR badge scanning, using the browser Geolocation API and real-time WebSockets to broadcast scores to the main-stage projector.',
    architecture: {
      title: 'Lightweight Mobile Edge Architecture',
      description: 'Engineered for rapid mobile loading and live event concurrency.',
      points: [
        'Zero-install Astro static frontend cached aggressively on the client device.',
        'HTML5 Geolocation API with Haversine distance calculations verifying proximity to waypoint coordinates.',
        'Interactive Three.js 3D compass orienting players toward the next landmark in physical space.',
        'WebSocket server broadcasting real-time score updates to the auditorium projector.'
      ]
    },
    challenges: [
      {
        challenge: 'Indoor GPS drift and multi-story signal occlusion',
        resolution: 'Satellite GPS signal drifted significantly near multi-story campus buildings. We added secondary optical QR checkpoint codes at each waypoint that players could scan if GPS accuracy degraded.'
      },
      {
        challenge: 'Concurrent mobile socket traffic during 20-minute intermissions',
        resolution: 'Minimized WebSocket frame payloads to compact JSON deltas under 120 bytes, preventing bandwidth saturation over congested venue Wi-Fi.'
      }
    ],
    outcomes: [
      '180+ conference attendees participated seamlessly without requiring any native app store download.',
      'Main-stage leaderboard updated live throughout intermissions with zero server crashes.',
      'Praised by the organizing committee as the most engaging attendee activity of the conference.'
    ],
    relatedSlugs: ['recruitment-management-system', 'wrapforge']
  },
  {
    slug: 'wrapforge',
    title: 'WrapForge 3D Packaging Studio',
    tagline: 'In-development 3D packaging visualization prototype exploring browser-based dieline folding and realistic PBR materials.',
    category: 'SaaS & Products',
    year: '2026',
    featured: true,
    draft: false,
    statusText: 'IN PROTOTYPE // EXPERIMENTAL',
    scope: ['Three.js WebGL Viewport', 'PBR Packaging Shaders', '3D Dieline Folding Kinematics', 'Product Roadmap'],
    technologies: ['Three.js', 'WebGL', 'TypeScript', 'Tailwind CSS'],
    overview: 'WrapForge is an internal studio prototype exploring browser-based 3D packaging visualization. It aims to make it easier for packaging designers to visualize how flat artwork looks when folded into a physical 3D box with realistic finishes.',
    problem: 'Packaging designers typically print and hand-fold physical paper mockups to test whether panel artwork aligns correctly across seams. Standard 3D CAD tools are overly complex for quick packaging visualization.',
    approach: 'We are prototyping a zero-install WebGL viewer using Three.js that renders parametric folding animations and physically based finishes like foil stamping and matte coating.',
    architecture: {
      title: 'Browser 3D Viewport Prototype',
      description: 'An interactive WebGL pipeline testing real-time box geometry folding.',
      points: [
        'Interactive Three.js viewport with OrbitControls and realistic studio directional lighting.',
        'CSS 3D and WebGL prototype models demonstrating animated folding along panel crease lines.',
        'Multi-pass PBR material shaders simulating metallic foil reflection and matte paper roughness.',
        'Active design exploration for future vector SVG/DXF dieline import capabilities.'
      ]
    },
    challenges: [
      {
        challenge: 'Accurate optical simulation of foil finishes in the browser',
        resolution: 'Standard WebGL materials lack local clearcoat roughness channels. We authored custom shader passes that modulate specular highlight and metalness based on finish selection.'
      },
      {
        challenge: 'Maintaining smooth performance on mobile devices',
        resolution: 'Optimized polygon geometry and implemented progressive rendering that pauses the GPU loop when the viewport is idle.'
      }
    ],
    outcomes: [
      'Interactive 3D folding box preview running at smooth frame rates directly in modern browsers.',
      'Currently active as an internal studio R&D prototype informing our product development roadmap.',
      'Future capabilities (dieline parser, vector export) planned for future testing phases.'
    ],
    relatedSlugs: ['tedx-treasure-hunt', 'payroll-automation-platform']
  }
];
