# Backend Documentation

![](../images/ace-group-logo.png)

Developer guide for setting up and working with the backend codebase. Contains setup instructions, project structure overview, and development workflow conventions.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## 📁 Backend Structure

**Note:** _Only the most important directories and files are listed below._

```bash
backend/
├── alembic/              # Database migrations
│   ├── versions/         # Migration scripts
│   ├── env.py            # Migration environment configuration
│   └── script.py.mako    # Migration template
├── app/
│   ├── db/               # Database configuration and session
│   ├── dependencies/     # Dependency injection
│   ├── models/           # SQLAlchemy models
│   ├── routers/          # API endpoints
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Business logic
│   ├── config.py         # Application configuration
│   └── main.py           # FastAPI application entry point
├── .python-version       # Python version specification
├── alembic.ini           # Alembic configuration
├── Dockerfile            # Docker container configuration for backend
├── pyproject.toml        # Project dependencies and configuration
├── uv.lock               # Locked dependency versions
│
└── README.md             # This file
```

## ⚙️ Environment Variables

See `.env.example` for required configuration.

## 🔐 Authentication

The application supports two authentication modes:

- **Development:** Set `MOCK_AUTH=true` - Returns mock user without Azure headers
- **Production:** Set `MOCK_AUTH=false` - Validates Azure Easy Auth headers

New users are automatically created with `customer` role on first login.

## 🚀 Quick Start

**Prerequisites:** Docker Desktop must be running

From `clo24-denbyb94-exam`:  
**Start backend services:**

```bash
docker-compose up -d
```

From `clo24-denbyb94-exam/backend`:  
**Run database migrations:**

```bash
uv run alembic upgrade head
```

From `clo24-denbyb94-exam/backend`:  
**Seed the database:**

```bash
uv run python -m app.db.seed_restaurant_data
```

**Note:** Running the seed script multiple times is safe - it clears old data before creating new data.

## 📖 API Documentation

FastAPI automatically generates interactive API documentation at [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI).

## 🗄️ Database Migrations

From `clo24-denbyb94-exam/backend`:  
**Create a new migration after schema changes:**

```bash
uv run alembic revision --autogenerate -m "description of changes"
```

**Apply the new migration:**

```bash
uv run alembic upgrade head
```

**Rollback the last migration:**

```bash
uv run alembic downgrade -1
```

## 🔧 Code Quality

Code is automatically formatted and linted using Ruff when configured as default formatter in VS Code.

**Configure in `.vscode/settings.json`:**

```json
{
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": "explicit",
      "source.organizeImports": "explicit"
    }
  }
}
```
