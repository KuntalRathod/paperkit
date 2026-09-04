<div align="center">

# Paperkit

### 34 PDF tools that run entirely in your browser. No uploads. No watermarks. No sign-up.

Your files never touch a server. Every operation — merge, compress, OCR, redact, encrypt, even AI chat — happens on your own device.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-14b8a6.svg)](#license)

[Live Demo](https://paperkit-cyan.vercel.app) · [Report Bug](https://github.com/KuntalRathod/paperkit/issues) · [Request Feature](https://github.com/KuntalRathod/paperkit/issues)

</div>

---

## Why Paperkit

Most free PDF tools online upload your documents to a server, stamp them with a watermark, or gate features behind a sign-up. That is a privacy problem the moment a document contains anything sensitive — a contract, an ID, a medical record, a bank statement.

Paperkit takes a different position: **the file never leaves the browser.** All processing runs client-side using WebAssembly and the browser's own APIs. There is no upload step, no account, no server-side storage, and nothing to trust beyond the code you can read in this repository.

- **Private by architecture, not by policy.** Files are processed in-memory on the client. There is no backend that ever sees them.
- **No watermarks, no paywalls, no ads.**
- **Installable & offline-capable.** Ships as a PWA — install it once and it works without a connection.
- **Fast.** No network round-trip means most operations complete in milliseconds.

---

## Features

**34 tools across 6 categories**, all client-side unless noted.

| Category | Tools |
| --- | --- |
| **Organize** | Merge · Split · Compress · Rotate · Organize Pages · Crop & Resize |
| **Convert** | PDF ⇆ JPG · Images → PDF · Word ⇆ PDF · Excel → PDF · HTML → PDF · Markdown → PDF · PDF → EPUB · PDF → Audio |
| **Edit** | Edit text · Watermark · Page Numbers · Headers & Footers · Redact · Extract Text · OCR · Repair · Flatten |
| **Security** | Encrypt (AES) · Remove Password · Privacy Scanner (metadata) · Fingerprint |
| **AI** | Chat with PDF · Summarize · Compare PDFs |
| **Business** | GST Invoice · POS Billing |

> The three AI tools (Chat, Summarize, Compare) send **extracted text only** to Google Gemini through a serverless proxy that keeps the API key off the client. The source PDF itself never leaves the browser.

---

## Tech Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 15** (App Router) | Static-first pages, route groups, serverless functions for the AI proxy |
| Language | **TypeScript** | End-to-end type safety across tools and the shared processing layer |
| Styling | **Tailwind CSS v4** + CSS design tokens | Single source of truth for theme; light/dark via OKLCH variables |
| Animation | **Framer Motion** | Micro-interactions on the dropzone, results, and transitions |
| PDF core | **pdf-lib** + **pdfjs-dist** | Create/modify documents (pdf-lib) and render/parse them (PDF.js) |
| OCR | **Tesseract.js** | In-browser OCR via WebAssembly — no server |
| Office formats | **Mammoth**, **docx**, **SheetJS (xlsx)** | Word and Excel conversion, fully client-side |
| Generation | **jsPDF**, **html2canvas** | HTML/Markdown/image → PDF |
| AI | **Google Gemini** (`@google/generative-ai`) | Streaming responses; key hidden behind a serverless route |
| Deployment | **Vercel** | Zero-config, edge-served static assets |

---

## Architecture

The design goal was to add a new tool without rewriting state, upload, progress, or error logic every time. That is solved by a single composition pattern:

```
┌──────────────────────────────────────────────────────────┐
│  Tool Page (e.g. /merge-pdf)                               │
│  ─ declares only its processing function                   │
│                                                            │
│   usePdfTool()  ← one hook: files, status, progress, error │
│        │                                                   │
│   ┌────┴───────────────┬──────────────┬─────────────────┐ │
│   ▼                    ▼              ▼                 ▼  │
│ FileDropzone      ProcessButton   DownloadCard      ToolShell
│                                                            │
│        │  calls                                            │
│        ▼                                                   │
│   lib/pdf/*  ·  lib/convert/*  ·  lib/ai/*                 │
│   (pure functions: File[] → Blob, no UI, no state)         │
└──────────────────────────────────────────────────────────┘
```

- **`hooks/usePdfTool.ts`** — the master hook. Owns file state, `idle → processing → done → error` status, progress, and reset. Every tool page consumes it, so a new tool is roughly *"render the shell + wire one processing function."*
- **`lib/`** — the processing layer is pure, framework-free functions (`File[] → Blob`). They have no knowledge of React, which keeps them testable and reusable.
- **`config/tools.ts`** — a single registry (slug, name, description, icon, category) that drives the homepage grid, search, and sitemap. One edit adds a tool everywhere.
- **`components/shared/`** — `FileDropzone`, `ProcessButton`, `DownloadCard`, and `ToolShell` give every tool an identical, polished UX for free.
- **`app/api/gemini/`** — the only server code. It proxies AI requests so the API key is never exposed, and streams tokens back to the client.

```
app/
├── (tools)/            route group — one folder per tool, shared layout
├── api/gemini/         serverless proxy for AI (streams Gemini responses)
├── manifest.ts         PWA manifest
└── layout.tsx          root layout, fonts, theme, SW registration
components/
├── ui/                 design-system primitives (Button, Input, Badge…)
├── shared/             cross-tool building blocks (Dropzone, ProcessButton…)
├── home/               Hero, ToolGrid, CategoryFilter
└── layout/             Navbar, Footer
lib/
├── pdf/                merge, split, compress, ocr, encrypt, watermark…
├── convert/            word/excel/html/image → pdf
├── ai/                 Gemini streaming client
└── utils/              file, download, class-name helpers
config/tools.ts         single source of truth for the tool catalog
hooks/                  usePdfTool and friends
```

---

## Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. (Optional) enable the AI tools
cp .env.example .env.local
# then add your key — free from https://aistudio.google.com/apikey
#   GEMINI_API_KEY=your_key_here

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The AI tools (Chat/Summarize/Compare) require a `GEMINI_API_KEY`. Every other tool works with no configuration at all.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (needed to test the PWA install/offline mode) |
| `npm run lint` | Run ESLint |

---

## Deployment

Paperkit deploys to Vercel with zero configuration:

1. Push the repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add the `GEMINI_API_KEY` environment variable (only if you want the AI tools).
4. Deploy.

Because nearly everything is static and client-side, it runs comfortably on Vercel's free tier.

---

## Privacy

- Documents are read into memory and processed on the client. There is **no upload** and **no server-side storage**.
- The **only** outbound request that includes document content is the optional AI feature, which sends **extracted text** (not the file) to Google Gemini via a serverless proxy. If you never use the AI tools, no document data ever leaves your device.
- No analytics on file contents. No tracking of what you process.

---

## License

Released under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Built by [Kuntal Rathod](https://github.com/KuntalRathod) · [LinkedIn](https://www.linkedin.com/in/kuntalrathod/) · [X](https://x.com/kuntalrathod77)

</div>
