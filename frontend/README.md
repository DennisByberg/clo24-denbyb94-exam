# Frontend Documentation

![](../images/ace-group-logo-header.png)

Developer guide for setting up and working with the frontend codebase. Contains setup instructions, project structure overview, and development workflow conventions.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## 📁 Frontend Structure

**Note:** _Only the most important directories and files are listed below._

```bash
frontend/
├── .husky/               # Git hooks (pre-commit, etc.)
├── public/               # Public static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── lib/
│   │   ├── api/          # API client and endpoints
│   │   └── utils/        # Utility functions
│   ├── providers/        # React providers
│   ├── theme/            # Mantine theme configuration
│   └── types/            # TypeScript type definitions
├── .prettierrc           # Prettier configuration
├── bun.lock              # Locked dependency versions
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
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

## 🔌 API Communication

The frontend communicates with the backend via the `apiClient()` wrapper located in `src/lib/api/client.ts`.

**Base URL:** `http://localhost:8000/api`

**Example usage:**

```typescript
import { apiClient } from '@/lib/api/client';

const response = await apiClient('/restaurants');
```

The API client handles:

- Error handling with detailed error messages from backend
- Request/response interceptors
- Base URL configuration
- JSON parsing of error details

## 🔧 Code Quality

Code is automatically formatted and linted using Prettier and ESLint when configured in VS Code.

**Configure in `.vscode/settings.json`:**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```
