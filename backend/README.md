# Backend Documentation

Developer guide for setting up and working with the backend codebase. Contains setup instructions, project structure overview, and development workflow conventions.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## 📁 Backend Structure

```bash
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

## 🔐 Authentication

The application supports two authentication modes:

### Development Mode (Mock Authentication)

Set `MOCK_AUTH=true` in `.env` for local development. This returns a mock user without requiring Azure Easy Auth headers.

**Mock user data:**

- ID: `mock-user-123`
- Name: `Test User`
- Email: `mock_mail@example.com`
- Role: `customer`

**Test the endpoint:**

```bash
curl http://localhost:8000/api/auth/me
```

### Production Mode (Azure Easy Auth)

Set `MOCK_AUTH=false` in production. The application validates Azure Easy Auth headers:

- `X-MS-CLIENT-PRINCIPAL-ID` - Azure AD user ID
- `X-MS-CLIENT-PRINCIPAL-NAME` - User display name
- `X-MS-CLIENT-PRINCIPAL-EMAIL` - User email

**First-time login:** New users are automatically created with `customer` role.

**Existing users:** Name and email are updated if changed in Azure AD.

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
