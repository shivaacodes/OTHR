export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: 'Custom Software' | 'Workflow Automation' | 'Creative Web' | 'SaaS & Products' | 'Systems Integration';
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
    title: 'Payroll Automation Platform',
    tagline: 'Automated end-to-end payslip calculation, AES-256 encrypted PDF generation, and rate-managed WhatsApp dispatch.',
    category: 'Workflow Automation',
    year: '2025',
    featured: true,
    draft: false,
    scope: ['Asynchronous Batch Pipelines', 'WhatsApp Cloud API Integration', 'PDF Cryptography', 'Redis Token Bucket Queue'],
    technologies: ['Go', 'Redis', 'WhatsApp Cloud API', 'PostgreSQL', 'Docker', 'AES-256'],
    overview: 'An autonomous month-end payroll execution microservice designed to replace a 4-day manual spreadsheet reconciliation and email dispatch process. The platform processes thousands of employee salary files, computes deductions, generates password-protected PDFs, and distributes them via verified WhatsApp template messages.',
    problem: 'The finance operations team spent 30+ hours each month downloading CSVs, calculating progressive tax withholdings, and individually emailing unencrypted PDFs. Email delivery had high failure rates on mobile, resulting in continuous employee friction and sensitive tax documents floating in unencrypted mailboxes.',
    approach: 'We engineered an immutable Go batch daemon that ingests payroll records, runs concurrent mathematical validation, writes encrypted documents to secure temporary storage, and meters delivery using a distributed token-bucket rate limiter matching WhatsApp Cloud API Tier 1 constraints.',
    architecture: {
      title: 'Decoupled Compute & Paced Delivery Pipeline',
      description: 'Separation of the CPU-bound PDF rendering core from the I/O-bound WhatsApp webhook dispatch queue.',
      points: [
        'Single-binary Go microservice with fixed-point integer arithmetic to prevent floating-point rounding anomalies.',
        'Redis-backed distributed Token Bucket limiter clamping outbound requests to 15 msg/sec to avoid Meta account quality demotions.',
        'Per-employee AES-256 PDF encryption seeded with dynamic cryptographic credentials.',
        'Self-healing dead-letter queue with exponential backoff and jitter for transient 429 and network timeouts.'
      ]
    },
    challenges: [
      {
        challenge: 'WhatsApp API burst velocity limits',
        resolution: 'Implemented atomic Redis Lua scripts to pace message dispatch under 15 requests per second, maintaining maximum sender quality status.'
      },
      {
        challenge: 'Memory bloat during concurrent PDF rasterization',
        resolution: 'Bounded concurrent rendering worker pools to available CPU cores and streamed outputs directly to private object storage rather than buffering in memory.'
      }
    ],
    outcomes: [
      'Month-end payroll execution reduced from 4 business days to under 5 minutes of automated runtime.',
      '99.8% first-attempt document delivery rate directly to mobile devices.',
      'Complete elimination of manual spreadsheet calculation errors and sensitive email leaks.'
    ],
    relatedSlugs: ['recruitment-management-system', 'inventory-stock-workflows']
  },
  {
    slug: 'recruitment-management-system',
    title: 'Recruitment Management System',
    tagline: 'High-throughput candidate parsing, pipeline stage transitions, and automated interviewer calendar synchronization.',
    category: 'Custom Software',
    year: '2024',
    featured: true,
    draft: false,
    scope: ['Relational Data Modeling', 'Résumé Parsing Engine', 'Google/Outlook Calendar Sync', 'Role-Based Access Control'],
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'OAuth2'],
    overview: 'A bespoke applicant tracking and interview coordination platform engineered for a fast-growing recruitment consultancy. Built to replace a sprawling collection of disjointed Airtable bases and manual email threads with a single unified operational dashboard.',
    problem: 'Candidate data was fragmented across multiple third-party tools. Interviewers regularly double-booked interview slots, candidate feedback was lost across private Slack channels, and tracking hiring funnel conversion rates required hours of manual spreadsheet assembly.',
    approach: 'We designed a normalized PostgreSQL database schema with role-based permissions, an intuitive Kanban hiring pipeline interface, and bidirectional calendar synchronization using webhooks to handle interview scheduling with zero human friction.',
    architecture: {
      title: 'Event-Driven Candidate Lifecycle Hub',
      description: 'An architectural hub synchronizing incoming job applications, resume embeddings, and interviewer availability.',
      points: [
        'Strict PostgreSQL relational schema with cascade protections and optimistic concurrency locking.',
        'Asynchronous résumé parsing daemon extracting contact details, employment history, and key skill vectors.',
        'Bidirectional Google Calendar and Microsoft Graph calendar webhooks resolving timezone collisions automatically.',
        'Automated candidate status notifications triggered directly by pipeline stage transitions.'
      ]
    },
    challenges: [
      {
        challenge: 'Timezone anomalies across global candidates and hiring managers',
        resolution: 'Normalized all timestamp storage to UTC with strict IANA timezone translation handled at the presentation layer.'
      },
      {
        challenge: 'Preventing concurrent interviewer double-booking',
        resolution: 'Implemented PostgreSQL transactional advisory locks on candidate interview slot reservations.'
      }
    ],
    outcomes: [
      'Eliminated 100% of calendar scheduling conflicts across 15+ weekly interview panels.',
      'Average time-to-first-interview decreased by 48% due to automated candidate self-scheduling links.',
      'Single source of truth established for all candidate records with full audit trails.'
    ],
    relatedSlugs: ['payroll-automation-platform', 'inventory-stock-workflows']
  },
  {
    slug: 'inventory-stock-workflows',
    title: 'Inventory & Stock Workflows',
    tagline: 'Multi-location inventory tracking, automated supplier re-ordering triggers, and mobile barcode audit tool.',
    category: 'Workflow Automation',
    year: '2024',
    featured: true,
    draft: false,
    scope: ['Multi-Warehouse Inventory', 'Hardware Barcode Scanning', 'Automated Re-Order Logic', 'Audit Ledger'],
    technologies: ['PostgreSQL', 'Go', 'WebSockets', 'HTML5 Barcode API', 'Tailwind CSS'],
    overview: 'A tailored warehouse inventory management system built for a regional distributor. It tracks real-time stock levels across three central warehouses and fifteen retail branches, replacing legacy paper manifests with handheld mobile barcode verification.',
    problem: 'Stock discrepancies between physical shelves and accounting spreadsheets caused frequent out-of-stock cancellations and costly emergency shipments. Weekly stock takes required entire warehouse shutdowns on Sundays.',
    approach: 'We developed a lightweight, mobile-first progressive web application capable of scanning hardware barcodes using standard smartphone cameras, paired with an append-only inventory ledger in PostgreSQL.',
    architecture: {
      title: 'Append-Only Ledger Architecture',
      description: 'Every inventory adjustment is stored as an immutable debit or credit ledger entry, preventing untraceable stock alterations.',
      points: [
        'Double-entry inventory ledger model ensuring physical balance always reconciles with stock movements.',
        'WebAssembly-based barcode scanner running client-side at 30 FPS on low-cost Android smartphones.',
        'Real-time WebSocket event broadcaster updating inventory counters across all active terminal screens simultaneously.',
        'Automated supplier purchase order generation when stock levels cross dynamic velocity thresholds.'
      ]
    },
    challenges: [
      {
        challenge: 'Spotty cellular connectivity inside reinforced concrete warehouses',
        resolution: 'Implemented offline-first IndexedDB local storage that queues barcode scans and synchronizes with server ledgers upon reconnection.'
      },
      {
        challenge: 'Handling simultaneous barcode scans of the final stock unit',
        resolution: 'Employed PostgreSQL row-level locks (`SELECT FOR UPDATE`) on the inventory item record during checkout validation.'
      }
    ],
    outcomes: [
      'Stock discrepancy rate decreased from 14.2% down to under 0.4% within 60 days of rollout.',
      'Sunday warehouse shutdowns completely eliminated; cycle counting now happens continuously during operational hours.',
      'Automated reorder triggers prevented stock-outs on primary high-velocity SKUs.'
    ],
    relatedSlugs: ['payroll-automation-platform', 'recruitment-management-system']
  },
  {
    slug: 'tedx-treasure-hunt',
    title: 'TEDx Interactive Treasure Hunt',
    tagline: 'Real-time geofenced WebGL treasure hunt web app with live WebSocket leaderboard for 1,200+ conference attendees.',
    category: 'Creative Web',
    year: '2024',
    featured: true,
    draft: false,
    scope: ['Real-Time Geolocation', 'Interactive WebGL Canvas', 'High-Concurrency WebSockets', 'Zero-Install Mobile PWA'],
    technologies: ['Astro', 'TypeScript', 'Three.js', 'WebSockets', 'Tailwind CSS', 'Redis Pub/Sub'],
    overview: 'A high-engagement digital interactive treasure hunt designed for a flagship TEDx conference. Attendees navigated campus landmarks using GPS geofencing, solved cryptographic riddles, unlocked 3D artifacts, and competed on a live main-stage projection leaderboard.',
    problem: 'The conference needed an interactive physical-digital experience to drive attendee networking and campus exploration during intermissions. Downloading a native app from the App Store was a major barrier with high drop-off rates.',
    approach: 'We engineered a zero-install progressive web application accessible via QR code badges, featuring an interactive 3D compass in Three.js and real-time live scoring backed by a high-concurrency WebSocket cluster.',
    architecture: {
      title: 'Low-Latency Geofencing & Event Mesh',
      description: 'An edge-optimized mobile web architecture designed to survive 1,000+ simultaneous mobile requests during coffee breaks.',
      points: [
        'Client-side HTML5 Geolocation API with Haversine distance calculations and spoofing detection heuristics.',
        'Three.js procedural gyroscope compass orienting players toward physical beacon coordinates in 3D space.',
        'Redis Pub/Sub cluster broadcasting score updates to the main-stage projector with sub-50ms latency.',
        'Static-first asset caching allowing instantaneous loads over congested conference Wi-Fi networks.'
      ]
    },
    challenges: [
      {
        challenge: 'Severe cellular network congestion during 30-minute conference intermissions',
        resolution: 'Pre-cached all 3D assets, audio clips, and riddle data in the Service Worker cache, communicating only tiny 80-byte WebSocket score deltas over the wire.'
      },
      {
        challenge: 'GPS drift between multi-story indoor campus buildings',
        resolution: 'Paired GPS coordinates with localized optical QR micro-markers to verify precise waypoint arrivals.'
      }
    ],
    outcomes: [
      'Over 920 active conference participants engaged with zero App Store friction.',
      'Zero server downtime or socket disconnects during peak intermission surges.',
      'Awarded Best Interactive Community Experience by the conference organizing committee.'
    ],
    relatedSlugs: ['wrapforge', 'recruitment-management-system']
  },
  {
    slug: 'wrapforge',
    title: 'WrapForge 3D Packaging Studio',
    tagline: 'Parametric dieline folding engine and physically based 3D packaging visualization platform running in the browser.',
    category: 'SaaS & Products',
    year: '2025',
    featured: true,
    draft: false,
    statusText: 'IN ACTIVE DEVELOPMENT // PRIVATE ALPHA',
    scope: ['Parametric CAD Geometry', 'Custom GLSL PBR Shaders', 'Rust WebAssembly', 'Client-Side Vector Export'],
    technologies: ['Three.js', 'Rust / Wasm', 'GLSL', 'Next.js', 'Tailwind CSS', 'WebGPU Ready'],
    overview: 'WrapForge is OTHR’s proprietary flagship SaaS product currently in private alpha. It bridges the gap between flat 2D packaging dielines and photorealistic 3D physical mockups, allowing designers to map folds, foils, and varnishes in real time.',
    problem: 'Packaging designers waste days manually cutting, folding, and photographing physical paper mockups to test vector artwork alignment. Existing desktop 3D software requires steep learning curves and heavy workstation GPUs.',
    approach: 'We are engineering a zero-install browser studio using a compiled Rust WebAssembly dieline parsing kernel and custom Three.js physically based rendering shaders.',
    architecture: {
      title: 'Browser-Native Parametric CAD Pipeline',
      description: 'A multi-tier WebGL architecture running procedural folding physics directly on client GPUs.',
      points: [
        'Rust Wasm geometry kernel executing constrained Delaunay triangulation and kinematic hinge transformations.',
        'Custom GLSL fragment shaders simulating micro-roughness for hot foil stamping, spot UV gloss, and kraft cardstock.',
        'Zero-dependency vector roundtrip export generating print-ready PDF/X files with bleed margins.',
        'Progressive Level-of-Detail (LOD) rendering maintaining 60 FPS on mobile and tablet touchscreens.'
      ]
    },
    challenges: [
      {
        challenge: 'Real-time folding animation without geometric self-intersection',
        resolution: 'Formulated a rigid-body kinematic hierarchy where child panels inherit rotational transformation matrices from parent hinge edges.'
      },
      {
        challenge: 'Accurate optical simulation of metallic foils in WebGL',
        resolution: 'Authored multi-channel shader masks that modulate clear-coat roughness and specular intensity within Three.js physical material loops.'
      }
    ],
    outcomes: [
      'Successfully folded complex 6-panel tuck boxes and cartons in under 40 milliseconds.',
      'Private alpha waitlist active with select packaging design studios and physical product brands.',
      'Architected for future enterprise licensing and digital subscription tiers.'
    ],
    relatedSlugs: ['tedx-treasure-hunt', 'payroll-automation-platform']
  }
];
