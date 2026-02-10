# CanChi

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-purple?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License">
</p>

A Vietnamese astrology (Tử Vi Đẩu Số) chart generator — create full natal charts online with solar/lunar calendar support.

## Features

### Chart Computation

- **14 Major Stars** — Full placement of all Tử Vi and Thiên Phủ star groups
- **60+ Minor Stars** — Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Lộc Tồn, and more
- **Tứ Hóa** — Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ based on year stem
- **Cục Calculation** — Nạp Âm lookup via Ngũ Hổ Độn (Five Tigers method)
- **Tràng Sinh Cycle** — 12-phase life cycle mapped to palaces
- **Triệt/Tuần** — Void zones with visual indicators

### Time Periods

- **Đại Hạn** — 10-year major periods with interactive timeline
- **Tiểu Hạn** — Yearly sub-periods within each Đại Hạn
- **Nguyệt Hạn** — Monthly periods mapped to palaces

### Calendar

- **Solar ↔ Lunar Conversion** — Accurate Vietnamese calendar (UTC+7)
- **Calendar Data** — Based on [Hồ Ngọc Đức's amlich](https://www.informatik.uni-leipzig.de/~duc/amlich/) (1900–2100)
- **Tý Muộn Support** — Late Tý hour (23:00) handled correctly

### Interaction

- **Tam Phương Tứ Chính** — Hover any palace to highlight its Triangle and Opposition
- **Star Tooltips** — Click any star for detailed descriptions
- **Palace Tooltips** — Ngũ Hành, Tràng Sinh, and palace meaning on hover

### Export

- **PNG Export** — Save the full chart as a high-resolution image
- **JSON Export** — Download or copy the complete chart data
- **Responsive** — Works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript 5.9 |
| **Build** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Icons** | Lucide React |
| **Export** | html-to-image |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/canchi.git
cd canchi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

This is a fully static client-side app — no backend required.

### Vercel

```bash
# Option 1: Push to GitHub → Import in Vercel → Deploy
# Option 2: CLI
npx vercel --prod
```

### Netlify

```bash
# Option 1: Push to GitHub → Import in Netlify → Deploy
# Option 2: CLI
npx netlify deploy --prod --dir=dist
```

No additional configuration needed for either platform.

## Project Structure

```
src/
├── lib/
│   ├── canchi-engine.ts    # Core computation engine (~2000 lines)
│   └── sao-data.ts         # Star descriptions and metadata
├── components/
│   ├── LasoForm.tsx         # Birth data input form
│   ├── LasoGrid.tsx         # 4×4 chart grid layout
│   ├── CungCell.tsx         # Individual palace cell
│   ├── DaiHanTimeline.tsx   # Major period timeline
│   ├── LegendPanel.tsx      # Legend + action buttons
│   ├── SaoTooltip.tsx       # Star tooltip popover
│   ├── CungTooltip.tsx      # Palace tooltip popover
│   └── VoChinhDieuTooltip.tsx # Empty palace tooltip
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## How It Works

```
┌─────────────────────────────────────┐
│  1. USER INPUT                      │
│     Date, Time, Gender              │
│     (Solar or Lunar calendar)       │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  2. CALENDAR CONVERSION             │
│     Solar → Lunar (if needed)       │
│     HND data (Vietnamese UTC+7)    │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  3. CHART COMPUTATION               │
│     • Mệnh & Thân palaces          │
│     • Cục (Nạp Âm via Ngũ Hổ Độn) │
│     • Tử Vi position               │
│     • 14 Major + 60 Minor stars    │
│     • Tứ Hóa transformations       │
│     • Tràng Sinh cycle             │
│     • Đại Hạn / Tiểu Hạn periods  │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  4. VISUAL OUTPUT                   │
│     Interactive 4×4 grid chart     │
│     with tooltips & timeline       │
└─────────────────────────────────────┘
```

## Credits

- Lunar calendar data: [Hồ Ngọc Đức](https://www.informatik.uni-leipzig.de/~duc/amlich/) © 2004
- Icons: [Lucide](https://lucide.dev/)

## License

This project is licensed under the [MIT License](LICENSE).
