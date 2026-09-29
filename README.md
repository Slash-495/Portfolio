# Arush Jain — Portfolio & Engineering Showcase

A personal developer portfolio and case-study showcase built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features technical deep-dives into multi-agent systems, data analytics pipelines, and full-stack applications, alongside an embedded local-first retrieval copilot.

**Live Application**: [portfolio-slash.vercel.app](https://github.com/Slash-495/Portfolio)  
**Author**: Arush Jain (B.Tech Smart Manufacturing @ IIITDM Jabalpur • Amazon ML Summer School 2026)

---

## Technical Highlights

- **Anti-Bento Editorial Layout**: Clean, borderless list-based project navigation with tight-tracked typography, subtle forest olive status indicators, and extreme whitespace inspired by minimalist editorial portfolios.
- **In-Memory Grounded Search Copilot**: A client-side lexical BM25 retrieval engine with token-weighted scoring, returning verified citations and refusing off-topic queries without external LLM dependencies.
- **Case-Study Modals**: Deep technical breakdowns for each system, covering architecture diagrams, execution lifecycles, trade-off matrices, and interactive client-side simulators.
- **Data & Analytics Specialization**: Dedicated coverage of dimensional data warehouses (PostgreSQL 15 + Metabase), statistical A/B experimentation engines (SciPy + Power BI), and customer retention CRM logic (PostgreSQL RFM window functions).
- **Accessibility & Performance**: WCAG AA compliant color contrast (4.8:1+), native `prefers-reduced-motion` support, OpenGraph metadata, and zero layout shift.

---

## Featured Engineering Projects

| Project | Category | Live Demo | Repository | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **RailRoute Agent** | AI Systems | [Live Streamlit ↗](https://rail-route-finder.streamlit.app/) | [Slash-495/Rail-Route-Finder](https://github.com/Slash-495/Rail-Route-Finder) | 3-agent train routing DAG (100% pass rate, n=12 scenarios) *(Free tier: ~30s cold wake)* |
| **Chambers & Infrastructure** | AI Systems | [Live Streamlit ↗](https://chambersandinfastructures.streamlit.app/) | [Slash-495/GST-RAG](https://github.com/Slash-495/GST-RAG) | Dual-stream FAISS + BM25 legal RAG (94.2% Precision@4, n=20 benchmark) *(Free tier: ~30s cold wake)* |
| **Roznamcha** | Data & Analytics | [Live Vercel ↗](https://roznamcha-ivj4.vercel.app/) | [Slash-495/Roznamcha](https://github.com/Slash-495/Roznamcha) | Customer Analytics CRM powered by PostgreSQL `NTILE(5)` RFM views |
| **Olist Analytics Engine** | Data & Analytics | — | [Slash-495/Olist-Analytics-Engine](https://github.com/Slash-495/Olist-Analytics-Engine) | Containerized PostgreSQL 15 ELT warehouse over 100k+ Brazilian orders |
| **OptiMetrics** | Data & Analytics | — | [Slash-495/OptiMetrics](https://github.com/Slash-495/OptiMetrics) | Statistical A/B testing platform detecting mobile conversion crashes & novelty decay (projected $96,300 avoided loss) |
| **LeetLens** | Full Stack | — | [Slash-495/LeetLens](https://github.com/Slash-495/LeetLens) | Manifest V3 Chrome Extension with BYOK local-first AST visualizer |
| **Duffy** | Full Stack | [Live Render ↗](https://duffy.onrender.com/) | [Slash-495/Duffy](https://github.com/Slash-495/Duffy) | AI-powered real-time communication platform with Whisper transcription *(~30s cold wake)* |
| **Velora** | Full Stack | [Live Vercel ↗](https://velora-3jpcjj3y1-slashs-projects-1d391125.vercel.app/) | [Slash-495/Velora](https://github.com/Slash-495/Velora) | AI resume builder & ATS job tracking platform |
| **Two-Tower Recommender** | Applied ML | — | [Slash-495](https://github.com/Slash-495) | PyTorch dual-encoder candidate retrieval with hard-negative InfoNCE (+4.2% Recall@10) |
| **Conformal Demand Forecasting** | Applied ML | — | [Slash-495/Conformal-Demand-Forecasting](https://github.com/Slash-495/Conformal-Demand-Forecasting) | LightGBM + split conformal intervals with Newsvendor optimization |

---

## Architectural Notes

### 1. In-Memory Retrieval Copilot (`/api/chat` & Client Engine)
To maintain fast, deterministic, zero-cost operation without exposing third-party LLM keys:
- **Retrieval Mechanism**: Tokenized lexical BM25 scoring over structured knowledge chunks (`src/lib/knowledge-base.ts`), evaluating exact keyword matches (4.5x), title tokens (3.0x), and body phrases.
- **Safety & Guardrails**: Queries scoring below a strict confidence threshold (< 2.5) or lacking technical context trigger an automated refusal:
  > *"I don't have information on that topic. I am a specialized portfolio assistant strictly dedicated to answering questions about Arush Jain's engineering projects, data analytics pipelines, and technical background."*
- **Execution Location**: Runs instantaneously inside the client browser (`queryRagCopilot`) with a parallel Next.js App Router POST endpoint at `/api/chat` for headless testing and external integrations.

### 2. Free-Tier Cloud Hosting Disclaimers
Live demonstration links for Streamlit Cloud and Render free tiers automatically sleep during inactivity. A note indicator (`sleep tier`) is displayed in the UI to notify visitors that cold boots may take ~30 seconds to spin up.

---

## Career Milestones & Published Applications

- **Amazon ML Summer School 2026**: Selective admission across premier Indian institutions; direct mentorship by Amazon ML Scientists in foundation models, deep learning, and generative AI.
- **Patent Application Published**: *Automatic Footrest Assembly for Two Wheeler* (Indian Patent Application No. 202421034177, Published 2025). Sensor-based automation system using embedded controllers and pressure sensors with fail-safe operational logic.
- **Competitive Programming**: 400+ algorithmic problems solved on [LeetCode](https://leetcode.com/u/Slash495/) & Codeforces. Author of open-source LeetLens AST visualizer.
- **Academic Standing**: Final Year B.Tech in Smart Manufacturing at IIITDM Jabalpur (2023 - Present).

---

## Project Structure

```text
Portfolio/
├── public/
│   └── resume.pdf             # Static resume document for direct download
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts  # Fallback JSON endpoint for portfolio retrieval
│   │   ├── globals.css        # CSS variables, WCAG AA tokens, reduced-motion rules
│   │   ├── layout.tsx         # OpenGraph, Twitter, and SEO metadata configuration
│   │   └── page.tsx           # Main single-page composition
│   ├── components/
│   │   ├── copilot/           # Chat interface & floating copilot trigger
│   │   ├── layout/            # Top transparent navigation bar & footer
│   │   ├── portfolio/         # Hero, ProjectGrid, Achievements, About, SystemSpecs
│   │   │   └── demos/         # Interactive browser simulators (Olist, OptiMetrics, etc.)
│   │   └── ui/                # Accessible primitives (Modal, Tabs, Badge, Button)
│   └── lib/
│       ├── knowledge-base.ts  # Grounded knowledge chunks for search
│       ├── projects-data.ts   # Project specifications & technical metrics
│       └── rag-engine.ts      # Token-weighted BM25 search engine with guardrails
├── tailwind.config.ts         # WCAG AA forest olive tokens & typography
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18.17 or higher
- npm, pnpm, or yarn

### 1. Clone & Install
```bash
git clone https://github.com/Slash-495/Portfolio.git
cd Portfolio
npm install
```

### 2. Development
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Verify TypeScript types and compile the static build:
```bash
npm run build
npm start
```

---

## Connect

- **Email**: [jainarush423@gmail.com](mailto:jainarush423@gmail.com)
- **GitHub**: [github.com/Slash-495](https://github.com/Slash-495)
- **LinkedIn**: [linkedin.com/in/arushjain495](https://www.linkedin.com/in/arushjain495)
- **LeetCode**: [leetcode.com/u/Slash495](https://leetcode.com/u/Slash495/)
