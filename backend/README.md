# Backend Documentation

Developer guide for setting up and working with the backend codebase. Contains setup instructions, project structure overview, and development workflow conventions.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## 📁 Backend Structure

```
backend/
├── alembic/              # Database migrations
├── app/
│   ├── db/               # Database configuration and session
│   ├── models/           # SQLAlchemy models
│   ├── routers/          # API endpoints
│   ├── schemas/          # Pydantic schemas
│   ├── config.py         # Application configuration
│   └── main.py           # FastAPI application entry point
├── .dockerignore         # Docker ignore rules
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── .python-version       # Python version specification
├── alembic.ini           # Alembic configuration
├── Dockerfile            # Docker image configuration
├── pyproject.toml        # Project dependencies and configuration
├── README.md             # (this file)
└── uv.lock               # UV dependency lock file
```

## ⚙️ Environment Variables

See `.env.example` for required configuration.

## 🚀 Quick Start

**Prerequisites:** Docker Desktop must be running

1. **Start backend services:**

   ```bash
   cd clo24-denbyb94-exam
   docker-compose up -d
   ```

2. **Access the API:**

- **API:** [http://localhost:8000](http://localhost:8000)
- **API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

## 🔧 Code Quality

Run these commands before committing:

```bash
cd backend

# Lint code
docker-compose exec backend uv run ruff check .

# Format code
docker-compose exec backend uv run ruff format .
```

**Auto-fix linting issues:**

```bash
docker-compose exec backend uv run ruff check --fix .
```
