# NEOJLPT Master 🇯🇵

A modern, responsive, and comprehensive **JLPT Japanese Study App** built with React 18, TypeScript, Tailwind CSS, and Vite. Designed to prepare learners systematically for the **JLPT N5, N4, N3, N2, and N1** examinations from beginner to advanced mastery.

---

## 🌟 Key Features

### 1. 📚 Complete JLPT Level Coverage (N5 – N1)
- **N5 Beginner**: 800+ Vocabulary, 100+ Kanji, 80+ Grammar patterns.
- **N4 Elementary**: 1,500+ Vocabulary, 300+ Kanji, 150+ Grammar patterns.
- **N3 Intermediate**: 3,500+ Vocabulary, 650+ Kanji, 250+ Grammar patterns.
- **N2 Upper-Intermediate**: 6,000+ Vocabulary, 1,000+ Kanji, 350+ Grammar patterns.
- **N1 Advanced**: 10,000+ Vocabulary, 2,000+ Kanji, 500+ Grammar patterns.

### 2. 🌍 100% Offline Multilingual System (19 Languages)
Zero external API dependencies. All UI navigation, grammar formulas, in-depth explanations, kanji meanings, and exercise translations instantaneously switch into 19 supported languages:
- 🇺🇸 English (`en`)
- 🇯🇵 Japanese (`ja`)
- 🇲🇲 Burmese (`my`)
- 🇹🇭 Thai (`th`)
- 🇨🇳 Chinese (`zh`)
- 🇰🇷 Korean (`ko`)
- 🇪🇸 Spanish (`es`)
- 🇫🇷 French (`fr`)
- 🇻🇳 Vietnamese (`vi`)
- 🇮🇩 Indonesian (`id`)
- 🇹🇷 Turkish (`tr`)
- 🇩🇪 German (`de`)
- 🇵🇹 Portuguese (`pt`)
- 🇳🇱 Dutch (`nl`)
- 🇮🇳 Hindi (`hi`)
- 🇧🇩 Bengali (`bn`)
- 🇲🇾 Malay (`ms`)
- 🇸🇦 Arabic (`ar`)
- 🇵🇭 Filipino / Tagalog (`tl`)

### 3. 👁️ Interactive Translation Toggle (Show / Off Mode)
- **Global Show/Hide**: Toggle all translations on or off with a single click in Grammar and practice views.
- **Per-Sentence Reveal**: Tap individual example sentences to reveal the translation after testing your reading comprehension without spoiling the answer.

### 4. 🧠 Intelligent Spaced Repetition (SRS)
- Leitner-based SRS algorithm tracking review intervals (`Again`, `Hard`, `Good`, `Easy`).
- Interactive flashcards with flip animations, furigana toggle, audio pronunciation, and mastery status.

### 5. ✍️ Kanji Studio & Stroke Visualization
- Detailed stroke order information, radicals, stroke counts, and Onyomi / Kunyomi readings.
- Interactive stroke drawing and recognition canvas for tactile muscle memory practice.

### 6. 📖 Reading & Listening Comprehension
- Passages paired with audio narration, ruby furigana toggles, vocabulary popover hints, and comprehension questions.
- Realistic audio dialogues with playback speed controls (0.75x, 1.0x, 1.25x, 1.5x) and transcript toggles.

### 7. 📝 Adaptive Practice Drills & Official Mock Exams
- Timed mock examinations adhering to official JLPT scoring algorithms and passing criteria.
- Instant error diagnostics and mistake review notebooks.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Hosting**: [Vercel](https://vercel.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio & Animations**: Web Speech API, [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Persistence**: Hybrid offline `localStorage` + real-time Supabase cloud synchronization

---

## ⚡ Deployment to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwinlwinhtay%2FNEOJLPT-Master&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY)

### Option 1: Automatic via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"** and select repository **`winlwinhtay/NEOJLPT-Master`**.
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: `https://rhidvvfdbilagdgzzzzg.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Click **Deploy**. Vercel will build and deploy your app with instant global CDN coverage.

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🗄️ Supabase Database Setup

1. Open your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab.
3. Open [`supabase/schema.sql`](./supabase/schema.sql), paste the SQL commands into the editor, and click **Run**.
4. This will create:
   - `profiles` (User settings, JLPT target level, themes, daily goals, XP, streaks)
   - `srs_items` (Spaced Repetition cards, review intervals, due dates)
   - `mock_test_attempts` (Official score records and question diagnostics)
   - `mistake_logs` (Error review notebook entries)
   - `completed_lessons` (Curriculum progress tracking)
   - Row Level Security (RLS) policies protecting each user's data.

---

## 🚀 Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/winlwinhtay/NEOJLPT-Master.git

# Navigate to the project directory
cd NEOJLPT-Master

# Install dependencies
npm install

# Copy environment template and configure Supabase
cp .env.example .env.local

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000/`.

### Production Build
```bash
# Compile TypeScript and bundle production assets
npm run build

# Preview the production build locally
npm run preview
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

