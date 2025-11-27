# Frontend Documentation

![](../images/ace-group-logo.png)

Developer guide for setting up and working with the frontend codebase. Contains setup instructions, project structure overview, and development workflow conventions.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## 📁 Frontend Structure

**Note:** _Only the most important directories and files are listed below._

```bash
frontend/
├── public/               # Public static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── constants/        # Application constants
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # API client and utilities
│   ├── providers/        # React providers
│   ├── theme/            # Mantine theme configuration
│   └── types/            # TypeScript type definitions
├── package.json          # Project dependencies
│
└── README.md             # This file
```

## 🗺️ Site Navigation

![Site Navigation Structure](../images/site-navigation-structure-v2.png)

[Edit diagram in Excalidraw](https://excalidraw.com/#json=m3Dmc4u8ZSZGAGFjH_iu9,A8OGVGdCE6UbIjuc1FSyLg)

## 🎨 Color Scheme

Application uses a custom Mantine theme with defined color palettes.

See `src/theme/theme.ts` for complete color definitions and usage.

## ⚙️ Environment Variables

See `.env.example` for required configuration.

## 🚀 Quick Start

**Prerequisites:** Docker Desktop must be running

1. **Clone and navigate to frontend:**

   ```bash
   git clone https://github.com/DennisByberg/clo24-denbyb94-exam.git
   cd clo24-denbyb94-exam/frontend
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Start backend services:**

   ```bash
   cd ..
   docker-compose up -d
   ```

4. **Start development server:**

   ```bash
   cd frontend
   bun run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.
