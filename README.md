# Arush Jain — Portfolio & Semantic RAG Copilot

A hyper-minimalist, editorial portfolio web application inspired by [Will Dzierson](https://dzierson.com), featuring an embedded grounded RAG Copilot, technical case-study showcases, and zero-compromise typography.

Built for **Arush Jain** (AI Systems & Full-Stack Engineer, IIITDM Jabalpur • Amazon ML Summer School 2026).

---

## ✦ Design Language & Visual Ethos

- **Editorial Light Canvas**: Warm, soft off-white/beige canvas (`#F9F9F6`) replacing conventional neon-accented dark themes.
- **High-Contrast Typography**: Deep charcoal (`#1A1A1A`) primary headings with tight letter-tracking, paired with airy secondary copy (`#666660`).
- **Earthy Olive Accents**: Understated olive green (`#7A8B6B`) for active status indicators, citation badges, and link transitions.
- **Anti-Bento Row Architecture**: Projects and achievements displayed as borderless wide-row lists with hairline horizontal dividers (`#E5E5DF`) rather than cluttered bento cards.
- **Micro-Interactions**: Smooth spring animations, subtle arrow glyph hover transitions, and fluid slide-over technical case-study modals powered by Framer Motion.

---

## ✦ Core Features

### 1. In-Browser Local-First RAG Copilot
- **Hybrid Retrieval**: In-memory semantic vector similarity and keyword search across chunked portfolio knowledge bases.
- **Grounded Citations**: Responses are strictly tied to verifiable project milestones, architectural trade-offs, and career events with interactive clickable citation badges.
- **API & Client Parity**: Instant sub-millisecond client queries combined with a fully typed Next.js App Router route (`/api/chat`).
- **Clean Chat Bubble Interface**: Soft gray bubbles (`#EFEFEA`), borderless AI output, and quick suggested prompt chips.

### 2. Deep-Dive Case Study Modals
- High-density technical breakdowns for featured projects with system architecture diagrams, state machines, trade-offs (e.g. latency vs. cost vs. recall), and live deployment links.

### 3. Career & Honors Timeline
- Strictly curated chronological timeline without repetitive badges:
  - **Amazon ML Summer School 2026**: Mentored by Amazon ML Scientists on LLMs and scalable deep learning architectures.
  - **Patented Safety Mechanism**: Centrifugal Speed Interlock Footrest Mechanism for Two-Wheelers (Indian Patent App. No. 202421034177).
  - **IIITDM Jabalpur**: B.Tech in Smart Manufacturing (Autonomous systems, computational intelligence).
  - **Competitive Programming**: 400+ algorithmic problems solved on [LeetCode](https://leetcode.com/u/Slash495/) & Codeforces.
  - **Production Shipments**: Live deployments including Duffy, Chambers GST-RAG, RailRoute Finder, and Velora.

### 4. Authentic About & Offline Pursuits
- Non-linear engineering story spanning physical hardware safety mechanisms to multi-agent LLM DAGs.
- Offline side quests: McLaren F1 tire degradation strategy, Liverpool FC (*YNWA*), Strava pavement miles, classic rock (AC/DC), and learning Japanese (Romaji).

---

## ✦ Featured Projects

| Project | Category | Live Demo | Repository |
| :--- | :--- | :--- | :--- |
| **LeetLens** | Full Stack / AI | [View](https://github.com/Slash-495/LeetLens) | [Slash-495/LeetLens](https://github.com/Slash-495/LeetLens) |
| **Duffy** | Full Stack / Voice | [Live Demo](https://duffy.onrender.com/) | [Slash-495/Duffy](https://github.com/Slash-495/Duffy) |
| **Velora** | Full Stack / Cloud | [Live Demo](https://velora-3jpcjj3y1-slashs-projects-1d391125.vercel.app/) | [Slash-495/Velora](https://github.com/Slash-495/Velora) |
| **RailRoute Agent** | AI Systems | [Live Demo](https://rail-route-finder.streamlit.app/) | [Slash-495/Rail-Route-Finder](https://github.com/Slash-495/Rail-Route-Finder) |
| **Chambers & Infrastructure** | AI Systems | [Live Demo](https://chambersandinfastructures.streamlit.app/) | [Slash-495/GST-RAG](https://github.com/Slash-495/GST-RAG) |
| **Conformal Demand Forecasting** | Applied ML | [View](https://github.com/Slash-495/Conformal-Demand-Forecasting) | [Slash-495/Conformal-Demand-Forecasting](https://github.com/Slash-495/Conformal-Demand-Forecasting) |
| **Two-Tower Recommender** | Applied ML | [View](https://github.com/Slash-495/Two-Tower-Recommender) | [Slash-495/Two-Tower-Recommender](https://github.com/Slash-495/Two-Tower-Recommender) |

---

## ✦ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **RAG & Search**: Custom In-Memory Vector Search Engine + BM25 keyword matching

---

## ✦ Project Structure

```text
MyPortfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/          # RAG Copilot POST route
│   │   ├── globals.css        # Custom color tokens & typography resets
│   │   ├── layout.tsx         # Root layout with editorial font settings
│   │   └── page.tsx           # Home page composition
│   ├── components/
│   │   ├── copilot/
│   │   │   └── RagCopilotWidget.tsx  # Interactive chat bubble UI
│   │   ├── layout/
│   │   │   ├── Header.tsx     # Transparent top bar with far-spaced links
│   │   │   └── Footer.tsx     # Minimalist footer with profile links
│   │   ├── portfolio/
│   │   │   ├── AboutSection.tsx        # Personal narrative & side quests
│   │   │   ├── AchievementsSection.tsx # Chronological career timeline
│   │   │   ├── Hero.tsx                # Bold typographic headline
│   │   │   ├── ProjectCard.tsx         # Borderless wide-row component
│   │   │   ├── ProjectGrid.tsx         # Filterable project showcase
│   │   │   ├── ProjectModal.tsx        # Deep-dive case study modal
│   │   │   └── SystemSpecs.tsx         # Architectural tenets reading list
│   │   └── ui/                # Base primitives (Badge, Button, Modal, Tabs)
│   └── lib/
│       ├── knowledge-base.ts  # Grounded chunks for RAG Copilot
│       ├── projects-data.ts   # Project specifications & technical details
│       ├── rag-engine.ts      # Semantic vector & keyword retrieval engine
│       └── utils.ts           # Class merging utilities
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ✦ Getting Started

### Prerequisites
- Node.js 18.17 or higher
- npm, yarn, or pnpm

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Slash-495/MyPortfolio.git
cd MyPortfolio
npm install
```

### 2. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Create an optimized production build and verify type safety:
```bash
npm run build
npm start
```

---

## ✦ Connect

- **GitHub**: [github.com/Slash-495](https://github.com/Slash-495)
- **LeetCode**: [leetcode.com/u/Slash495](https://leetcode.com/u/Slash495/)
- **Email**: [jainarush423@gmail.com](mailto:jainarush423@gmail.com)
- **Phone**: +91 91713 56822
