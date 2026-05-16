# ⚒️ PromptForge

**PromptForge** is a professional-grade AI prompt engineering platform designed to transform raw ideas into structured, high-performance briefs. By bridging the gap between user intent and LLM optimization, PromptForge ensures your AI interactions are context-aware, tonally consistent, and goal-oriented.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

### 🎯 Dual Forging Engines

- **Guided Mode**: A logic-first approach. Specify business type, audience, tone, and platform to generate a comprehensive 360-degree prompt brief.
- **Simple Mode**: A streamlined natural-language interface. Perfect for "thinking out loud" and letting the forge handle the structural optimization.

### ⚡ Core Functionality

- **Instant Forging**: Real-time transformation of inputs into optimized prompts via integrated API handlers.
- **Smart Summaries**: Live preview of your prompt's scope as you build it.
- **Context Awareness**: Purpose-built options for 10+ business types and 10+ task categories.
- **Seamless Integration**: One-click "Copy to Clipboard" to move your forged prompts into ChatGPT, Claude, or Gemini instantly.

### 🎨 Aesthetic & UX

- **Modern UI**: A custom "Paper Card" design system featuring glassmorphism, subtle noise textures, and high-legibility typography.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop forging.

## 🛠️ Tech Stack

| Layer          | Technology                                     |
| :------------- | :--------------------------------------------- | --- |
| **Framework**  | [Next.js 15+](<https://nextjs.org/)>           |
| **Language**   | [TypeScript](<https://www.typescriptlang.org/) | >   |
| **Styling**    | [Tailwind CSS](<https://tailwindcss.com/)>     |
| **Icons**      | [Lucide React](<https://lucide.dev/)>          |
| **Animations** | Tailwind Transitions & CSS Noise Filters       |
| **State**      | React Hooks (useMemo, useState)                |

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18.17 or later
- An API Key for your preferred LLM (OpenAI, Anthropic, or Google)

### 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/prompt-forge.git
   cd prompt-forge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Example: If using an LLM API for the /build route
   OPENAI_API_KEY=your_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

Open http://localhost:3000 to see the application.

## 📂 Project Structure

```text
├── app/                # Next.js App Router (Routes & Layouts)
│   ├── build/          # Prompt generation logic and UI
│   ├── api/            # Server-side forging logic
│   └── page.tsx        # Landing page & Mode selection
├── components/         # Reusable UI components
│   ├── layout/         # Navbar, Footer, etc.
│   └── ui/             # Atomic components
├── public/             # Static assets & Noise textures
└── tailwind.config.ts  # Custom design system configuration
```

## 🚢 Deployment

The easiest way to deploy PromptForge is via the Vercel Platform.

```bash
vercel deploy
```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
