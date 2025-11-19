# Backend Developer Guide

Developer guide for setting up and working with the backend codebase. Contains setup instructions, project structure overview, and development workflow conventions.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## Code Quality

Run these commands before committing:

```bash
cd backend

# Lint code
uv run ruff check .

# Format code
uv run ruff format .
```

**Auto-fix linting issues:**

```bash
uv run ruff check --fix .
```
