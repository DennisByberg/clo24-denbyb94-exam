# CLO24 Exam Project - Cloud Development

![ACE Group Logo](./images/ace-group-logo.png)

This repository contains the exam project for the CLO24 Cloud Development course, where students independently deepen and broaden their technical competencies by learning new technologies not previously covered in the program.

**Project:** Full-stack web platform for a booking system with user management, deployed on Azure App Service. The project involves transitioning from .NET to Python/FastAPI to prepare for an upcoming internship.

> **Note:** This project uses the fictional name "ACE Group" to avoid confusion with the real company "ESS Group" where the internship will take place. The facility, its content, and branding are simulated for educational purposes and AI-generated.

Visit the **[Project Wiki](https://github.com/DennisByberg/clo24-denbyb94-exam/wiki)** for project documentation.

## 💻 Developer Guides

- **[Frontend Documentation](frontend/README.md)** - Frontend setup and development
- **[Backend Documentation](backend/README.md)** - Backend setup and development

## 📁 Project Structure

**Note:** _Only the most important directories and files are listed below._

```bash
clo24-denbyb94-exam/
├── .github/              # GitHub Actions workflows and configuration
├── backend/              # Backend application (Python/FastAPI)
├── docs/                 # Documentation
├── frontend/             # Frontend application (Next.js)
├── infrastructure/       # Infrastructure resources and IaC
│
└── README.md             # This file
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

- **[ADR-012: FastAPI](docs/adr/ADR-012-fastapi.md)** - Modern Python web framework
- **[ADR-013: SQLAlchemy](docs/adr/ADR-013-sqlalchemy.md)** - ORM for database interactions
- **[ADR-014: Pydantic](docs/adr/ADR-014-pydantic.md)** - Data validation and serialization
- **[ADR-015: Alembic](docs/adr/ADR-015-alembic.md)** - Database migrations
- **[ADR-017: UV](docs/adr/ADR-017-uv.md)** - Python package manager
- **[ADR-018: Ruff](docs/adr/ADR-018-ruff.md)** - Python linting and formatting

### Database & Cloud

- **[ADR-011: PostgreSQL](docs/adr/ADR-011-postgresql.md)** - Relational database for booking system
- **[ADR-020: Azure Easy Auth](docs/adr/ADR-020-azure-easy-auth.md)** - Authentication with Google OAuth
- **[ADR-021: Terraform](docs/adr/ADR-021-terraform.md)** - Infrastructure as Code for Azure resources

### DevOps & Tooling

- **[ADR-001: GitHub Actions](docs/adr/ADR-001-github-actions.md)** - CI/CD pipeline
- **[ADR-006: Bun](docs/adr/ADR-006-bun.md)** - JavaScript package manager
- **[ADR-007: Husky](docs/adr/ADR-007-husky.md)** - Git hooks for code quality
- **[ADR-010: ESLint and Prettier](docs/adr/ADR-010-eslint-prettier.md)** - JavaScript linting and formatting
- **[ADR-016: Docker](docs/adr/ADR-016-docker.md)** - Containerization

## ⚙️ Environment Variables

See `.env.example` files in root, frontend and backend directories for required configuration.

## 📄 License

This project is licensed under the MIT License - see the **[LICENSE](LICENSE)** file for details.
