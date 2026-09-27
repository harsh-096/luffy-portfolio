# Harsh Parmar — Portfolio

A high-performance, retro-engineering developer portfolio featuring interactive anime easter eggs, real-time Spotify streaming scrobbles, live GitHub contribution heatmaps, and a full-stack project showcase.

Built with **Vite + React 19 + TypeScript + Tailwind CSS**.

---

## ✨ Features

- **Engineering Grid Visual Identity**:
  - Precision dot matrix banners and viewport edge-to-edge engineering screen lines.
  - Mathematical crosshairs (`+`) marking structural section boundaries.
  - Concentric border radiuses, optical alignments, and tactile feedback.

- **Dynamic Hero Section**:
  - Glitch and scanlines overlay on avatar hover.
  - Live availability beacon (`Building AI systems & open to opportunities`).
  - Smooth cycling taglines transitioning through engineering roles, focus areas, and location.

- **Interactive Monkey D. Luffy Meat-Catching Easter Egg**:
  - Custom SVG Monkey D. Luffy with iconic Straw Hat (Mugiwara), red vest, and scar.
  - Interactive meat stick toss: click or drag the meat bone across the feeding canvas to feed Luffy!
  - Real-time physics calculation: rubber arm stretches seamlessly from Luffy's shoulder socket (`Gomu Gomu no...`) to catch the meat.
  - One Piece dialogue states (`hungry... 💭`, `give it to me...`, `GOMU GOMU NO...`, `SHI SHI SHI !! 🍖`).

- **Live Spotify & Last.fm Integration**:
  - Live API integration with Last.fm AudioScrobbler for user `@harsh_096`.
  - Background polling every 30 seconds for real-time scrobbles.
  - Dynamic turntable: high-resolution album artwork rendered on vinyl with authentic grooves.
  - Live listening status: pulsing green indicator with spinning vinyl when playing on Spotify, or relative timestamp (`Last Played • 2h ago`) when idle.
  - Direct 1-click listener link to open the track in Spotify.

- **Live Visitor / Page Watch Counter**:
  - Persistent client-side counter displaying real-time views in the footer.
  - Automatically increments on new page visits.

- **Live GitHub Contribution Activity**:
  - Real-time GitHub commit grid synced directly with `@harsh-096`.
  - Contribution streaks, total commit count, and interactive cell tooltips.

- **Projects & Technical Arsenal**:
  - Filterable categorized project cards (AI/ML Systems, Full-Stack, Infrastructure, Autonomous Agents).
  - Deep-dives into **KIRAN** (self-learning trading agent), **Prompt-to-App** (multi-agent compiler), **Robofy.ai** (enterprise RAG), **Growby.net** (conversational agents), and **ARJUN** (execution engine).

- **Global Command Palette (`⌘K` / `Ctrl+K`)**:
  - Full keyboard navigation modal to switch sections, copy contact info, or toggle theme.

- **Dark & Light Mode**:
  - High-contrast dark engineering theme and clean light theme with anti-flash script and `localStorage` persistence.

---

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Fonts**: Geist Sans, Geist Mono, Silkscreen (Pixel)
- **APIs**: Last.fm AudioScrobbler API, GitHub Contributions API

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Installation

```bash
git clone https://github.com/harsh-096/luffy-portfolio.git
cd luffy-portfolio
npm install
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building for Production

```bash
npm run build
```

The optimized static assets will be output to the `dist/` directory.

---

## 📄 License

MIT © [Harsh Parmar](https://github.com/harsh-096)
