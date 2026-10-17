# OTHR // Independent Creative Engineering Studio

> **"We don't do ordinary."**  
> *Brutally fast underneath. Unreasonably polished on top.*

OTHR is an independent creative engineering studio that builds digital flagships, resilient distributed software, business automations, and original SaaS products.

---

## ⚡ Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation, zero unnecessary client-side JavaScript)
- **Language**: TypeScript (Strict configuration with zero compiler warnings)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties & dynamic theme switching
- **Motion**: [GSAP](https://gsap.com/) & ScrollTrigger for kinetic typography and reveals
- **3D Interactive Centerpiece**: [Three.js](https://threejs.org/) (Procedural parametric topological sculpture with progressive enhancement)
- **Content Collections**: Astro 5 Content Collections for engineering journal with Zod schema validation
- **Page Transitions**: Astro View Transitions (`ClientRouter`)
- **Icons**: [Lucide](https://lucide.dev/) (Zero-runtime SVG component)
- **Backend API**: Cloudflare Pages Functions (`functions/api/inquiry.ts`) for serverless contact dispatch
- **Micro-haptics**: Web Audio API tactile mechanical audio synthesizer (zero external audio files)

---

## 🚀 Where & How to Deploy OTHR

### Top Recommendation: **Cloudflare Pages** (Best Performance & Zero Cost)

OTHR was architected specifically for **Cloudflare Pages**.

#### Why Cloudflare Pages?
1. **Edge Network**: Sub-50ms TTFB across 330+ cities worldwide.
2. **Native Serverless Functions**: The inquiry endpoint in `functions/api/inquiry.ts` executes automatically on Cloudflare Workers without any SSR adapters or Docker containers.
3. **Turnstile & Web Analytics**: Built-in privacy-first web analytics and anti-bot spam protection.
4. **Zero Cost Tier**: Unlimited bandwidth, 100,000 function requests/day on the free tier.

#### One-Click Deployment via Git
1. Push this repository to GitHub or GitLab.
2. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Configure the build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Add environment variables in **Settings > Environment variables** (see `.env.example`).
5. Click **Save and Deploy**.

#### CLI Deployment (Instant)
```bash
# Build the static site
npm run build

# Deploy directly via Wrangler
npx wrangler pages deploy dist --project-name=othr-studio
```

---

### Alternative Deployment Options

| Platform | Build Command | Output Directory | Notes |
| :--- | :--- | :--- | :--- |
| **Vercel** | `npm run build` | `dist` | Fast global edge, easy GitHub sync |
| **Netlify** | `npm run build` | `dist` | Automatic HTTPS & forms integration |
| **Self-Hosted (Caddy/Nginx)** | `npm run build` | `dist` | Serve `dist/` as static assets |

---

## 🗂 Project Architecture

```
OTHR/
├── functions/
│   └── api/
│       └── inquiry.ts          # Native Cloudflare Pages serverless inquiry handler
├── docs/
│   └── payments-architecture.md # Future Dodo Payments integration blueprint
├── public/
│   ├── favicon.svg             # Minimalist architectural vector monogram
│   └── robots.txt              # Search engine directives referencing sitemap.xml
├── src/
│   ├── components/
│   │   ├── navigation/
│   │   │   └── Header.astro    # Sticky header with Work/Services/Lab/Journal/Studio/Contact
│   │   ├── hero/
│   │   │   ├── Hero.astro      # Editorial hero with non-blocking 3D mount
│   │   │   └── HeroObject.ts   # Three.js procedural parametric sculpture
│   │   ├── work/
│   │   │   └── ProjectCard.astro # Verified case study preview cards
│   │   ├── journal/
│   │   │   └── JournalPreviewSection.astro # Homepage engineering journal showcase
│   │   ├── lab/
│   │   │   ├── InteractiveShader.astro # Real-time fluid velocity canvas
│   │   │   └── LabSection.astro
│   │   ├── products/
│   │   │   └── WrapForgeSection.astro # Interactive 3D package mockup visualizer
│   │   ├── studio/
│   │   │   ├── CapabilitiesSection.astro # 5 core disciplines & links to services
│   │   │   └── PhilosophySection.astro   # 5 foundational engineering principles
│   │   ├── contact/
│   │   │   └── ContactSection.astro      # Multi-step project inquiry form
│   │   ├── footer/
│   │   │   └── Footer.astro    # Brand monolith, live studio clocks, social presences, legal
│   │   └── ui/
│   │       ├── Button.astro    # Tactile magnetic buttons with micro-arrows
│   │       ├── Badge.astro     # Monospace technical badges
│   │       ├── Icon.astro      # Zero-runtime Lucide SVG renderer
│   │       └── StudioClock.astro # Real-time global timezone clocks (BLR/NYC/UTC)
│   ├── config/
│   │   └── site.ts             # Central configuration (socials, metadata, pricing)
│   ├── content/
│   │   └── journal/            # 6 verified engineering essays & post-mortems
│   │       ├── we-automated-2575-payslips.md
│   │       ├── why-i-chose-go-for-payroll-automation.md
│   │       ├── hidden-cost-of-shipping-software-too-fast.md
│   │       ├── building-a-3d-packaging-editor-in-the-browser.md
│   │       ├── your-business-doesnt-need-another-spreadsheet.md
│   │       └── why-we-built-othr.md
│   ├── data/
│   │   ├── projects.ts         # Verified case studies (Payroll, RMS, Inventory, TEDx, WrapForge)
│   │   ├── capabilities.ts     # Core studio disciplines
│   │   ├── experiments.ts      # The Lab interactive prototypes
│   │   ├── products.ts         # WrapForge, GlyphGrid, PulseLog specs
│   │   └── studio.ts           # Manifesto, principles, active node coordinates
│   ├── layouts/
│   │   └── BaseLayout.astro    # View Transitions, JSON-LD schemas, SEO, cursor follower
│   ├── pages/
│   │   ├── index.astro         # Homepage with all sections
│   │   ├── work/
│   │   │   ├── index.astro     # Category-filterable project gallery
│   │   │   └── [slug].astro    # Verified case study deep-dives with architecture breakdowns
│   │   ├── services.astro      # Digital Upgrade, Workflow Fix, & 5 core disciplines
│   │   ├── lab.astro           # Playable sandboxes (fluid, ASCII raymarcher, drone synth)
│   │   ├── products.astro      # WrapForge deep-dive & studio SaaS tools
│   │   ├── journal/
│   │   │   ├── index.astro     # Engineering journal index with topic filters
│   │   │   └── [slug].astro    # Long-form article reading view with TOC & share
│   │   ├── studio.astro        # Manifesto, principles, stack, coordinates
│   │   ├── contact.astro       # Start a Project inquiry hub & FAQs
│   │   ├── privacy.astro       # Zero-tracker Privacy Policy
│   │   ├── terms.astro         # Commercial Terms of Use & IP rights
│   │   ├── sitemap.xml.ts      # Dynamic XML sitemap
│   │   └── 404.astro           # Custom "Reality Not Found" 404 page
│   ├── styles/
│   │   └── global.css          # Design tokens (Acid Lime & Exa Deep Blue palettes)
│   ├── utils/
│   │   ├── analytics.ts        # Privacy-conscious event dispatcher (DNT compliant)
│   │   ├── audio.ts            # Web Audio mechanical micro-clicks & chirps
│   │   └── motion.ts           # GSAP scroll animations & reveals
│   └── content.config.ts       # Astro 5 content collections schema
├── .env.example                # Sample environment variables
├── astro.config.mjs            # Astro 5 + Tailwind v4 Vite integration
├── tsconfig.json               # Strict TypeScript config
└── package.json
```

---

## 🛠 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) to explore the site.

### Safe Development Mode for Inquiries
When `RESEND_API_KEY` is not present in your local `.env`, submitting the project inquiry form automatically activates **Safe Local Development Mode**. The inquiry payload is validated and logged to the browser/server console with a simulated reference code (`INQ-DEV-XXXX`). No third-party network requests are made, allowing complete end-to-end testing without external credentials.

---

## 🎨 Theme Palette Switching

The site uses CSS variables with support for dynamic palette switching:
- **Acid Lime (Default)**: `#080B0A` background, `#C6FF3D` accent, `#F5F6F0` text.
- **Deep Blue (Exa-inspired)**: `#060913` background, `#38BDF8` accent, `#F0F4FC` text.

Click the theme toggle in the header or mobile drawer to live-swap the visual palette.

---

## 🧪 The Journal Articles

1. **We Automated 2,575 Payslips. Then WhatsApp's API Limits Hit Us.** *(Rate limiting, Token Bucket queues in Go)*
2. **Why I Chose Go for a Payroll Automation System.** *(Fixed-point math, single-binary containers, concurrency)*
3. **The Hidden Cost of Shipping Software Too Fast.** *(Schema debt, dependency obesity, sustainable architecture)*
4. **Building a 3D Packaging Editor in the Browser.** *(Rust Wasm kinematics, custom GLSL PBR foil shaders)*
5. **Your Business Doesn't Need Another Spreadsheet.** *(Moving operational databases from Excel to custom web apps)*
6. **Why We Built OTHR.** *(The founding manifesto: fighting digital conformity through craft and performance)*
