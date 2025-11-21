# Production-ready Dockerfile for FastAPI application
# Uses Python 3.13 with uv package manager for fast dependency installation
# Exposes port 8000 and runs FastAPI with Uvicorn ASGI server

FROM python:3.13-slim

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev

COPY . .

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]