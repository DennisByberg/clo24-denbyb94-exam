# CLO24 Exam Project - Cloud Development

This repository contains the exam project for the CLO24 Cloud Development course, where students independently deepen and broaden their technical competencies by learning new technologies not previously covered in the program.

**Project:** Full-stack web platform for ESS Group's new facility, transitioning from .NET to Python/FastAPI to prepare for upcoming internship (LIA). The project involves building a booking system with user management, deployed on Azure App Service.

Visit the **[Project Wiki](https://github.com/DennisByberg/clo24-denbyb94-exam/wiki)** for comprehensive project documentation including weekly summaries, course checklists, time tracking, project plan, and resources.

## ‍💻 Developer Guides

- **[Frontend Developer Guide](frontend/README.md)** - Setup and development workflow for frontend

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
├── backend/
├── frontend/
├── docs/
│   ├── adr/
│   ├── resources/
│   └── weekly-logs/
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Tech Stack / ADRs

### Frontend

- **[ADR-002: React](docs/adr/ADR-002-react.md)** - Component-based UI library
- **[ADR-003: TypeScript](docs/adr/ADR-003-typescript.md)** - Static type checking
- **[ADR-004: Next.js](docs/adr/ADR-004-nextjs.md)** - SSR/SSG and routing
- **[ADR-005: Mantine](docs/adr/ADR-005-mantine.md)** - UI component library
- **[ADR-008: TanStack Query](docs/adr/ADR-008-tanstack-query.md)** - Data fetching and caching
- **[ADR-009: Zod](docs/adr/ADR-009-zod.md)** - Runtime validation and type safety

### Backend

_backend tech stack / adrs coming soon..._

### DevOps & Tools

- **[ADR-001: GitHub Actions](docs/adr/ADR-001-github-actions.md)** - CI/CD pipeline
- **[ADR-006: Bun](docs/adr/ADR-006-bun.md)** - Fast package management
- **[ADR-007: Husky](docs/adr/ADR-007-husky.md)** - Automated code quality checks
- **[ADR-010: ESLint and Prettier](docs/adr/ADR-010-eslint-prettier.md)** - Code quality and formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
