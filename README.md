# Oryzo — AI-Powered Rice Farming Platform

A high-performance 3D product website built with Next.js 16, React 19, Three.js, and GSAP. Features smooth scroll animations, WebGL canvas, interactive particle systems, and a fully responsive dark UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| 3D / WebGL | Three.js + React Three Fiber + Drei |
| Animations | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| Post-processing | @react-three/postprocessing |
| Styling | Inline styles + Tailwind CSS v4 |
| Font | Geist Variable |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/Aimen254/3DSite.git
cd 3DSite
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles, CSS variables, fonts
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page composition
├── components/
│   ├── canvas/            # Three.js / WebGL components
│   │   ├── Scene.tsx
│   │   ├── Particles.tsx
│   │   └── SectionBackgrounds.tsx
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── MagneticButton.tsx
│   │   └── TextReveal.tsx
│   └── providers/
│       ├── GSAPProvider.tsx
│       └── SmoothScrollProvider.tsx
├── hooks/
├── lib/                   # GSAP setup, utilities
└── shaders/               # GLSL shader strings
```

---

## Deploying to Vercel

### Step 1 — Push your code to GitHub

```bash
git add .
git commit -m "your message"
git push origin main
```

### Step 2 — Create a Vercel account

Go to [vercel.com](https://vercel.com) and sign up with your **GitHub account**.

### Step 3 — Import your repository

1. From the Vercel dashboard click **"Add New… → Project"**
2. Under **"Import Git Repository"** find `Aimen254/3DSite` and click **Import**

### Step 4 — Configure the project

Vercel auto-detects Next.js. The defaults are correct — no changes needed:

| Setting | Value |
|---|---|
| Framework Preset | Next.js (auto-detected) |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `.next` |

### Step 5 — Deploy

Click **"Deploy"**. Vercel installs dependencies, runs `next build`, and publishes to a live `.vercel.app` URL in ~60–90 seconds.

### Step 6 — Automatic deploys

After the first deploy, every `git push` to `main` automatically triggers a new production deployment. Pull requests get their own preview URL automatically.

### Custom Domain (optional)

1. Vercel project → **Settings → Domains**
2. Add your domain (e.g. `oryzo.com`)
3. Update your DNS with the CNAME/A records Vercel provides

---

## Environment Variables

No environment variables are required for the base project. If you add API keys later:

1. Vercel dashboard → **Settings → Environment Variables**
2. Add key/value pairs
3. Redeploy (auto-applies on the next push)

---

## License

MIT
