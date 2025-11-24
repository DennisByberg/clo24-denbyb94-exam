# CLO24 Exam Project - Cloud Development

This repository contains the exam project for the CLO24 Cloud Development course, where students independently deepen and broaden their technical competencies by learning new technologies not previously covered in the program.

**Project:** Full-stack web platform for ESS Group's new facility, transitioning from .NET to Python/FastAPI to prepare for upcoming internship. The project involves building a booking system with user management, deployed on Azure App Service.

> **Note:** This is a simulated project scenario for educational purposes. The facility and its content are fictional and AI-generated.

Visit the **[Project Wiki](https://github.com/DennisByberg/clo24-denbyb94-exam/wiki)** for project documentation.

## 💻 Developer Guides

- **[Frontend Documentation](frontend/README.md)** - Frontend setup and development
- **[Backend Documentation](backend/README.md)** - Backend setup and development

## 📁 Project Structure

```bash
clo24-denbyb94-exam/
├── .github/              # GitHub configuration
├── backend/              # Backend application (Python/FastAPI)
├── frontend/             # Frontend application (Next.js)
├── docs/                 # Documentation
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── docker-compose.yml    # Docker services configuration
├── LICENSE               # MIT License
└── README.md             # (this file)
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

### DevOps & Tooling

- **[ADR-001: GitHub Actions](docs/adr/ADR-001-github-actions.md)** - CI/CD pipeline
- **[ADR-006: Bun](docs/adr/ADR-006-bun.md)** - JavaScript package manager
- **[ADR-007: Husky](docs/adr/ADR-007-husky.md)** - Git hooks for code quality
- **[ADR-010: ESLint and Prettier](docs/adr/ADR-010-eslint-prettier.md)** - JavaScript linting and formatting
- **[ADR-016: Docker](docs/adr/ADR-016-docker.md)** - Containerization

## 🔧 Making Changes

1. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the relevant directory

3. **Test locally** using the commands in the respective README files

4. **Commit your changes:**

   ```bash
   git add .
   git commit -m "feat: your feature description #<issue number>"
   ```

   Pre-commit hooks will automatically run ESLint and Prettier (frontend only).

5. **Push and create PR:**

   ```bash
   git push origin feature/your-feature-name
   ```

## ⚙️ Environment Variables

See `.env.example` files in root, frontend and backend directories for required configuration.

## 📄 License

This project is licensed under the MIT License - see the **[LICENSE](LICENSE)** file for details.
