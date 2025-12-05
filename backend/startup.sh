#!/bin/bash
# Azure App Service startup script for FastAPI with UV package manager
# This script installs UV, syncs dependencies, and starts the application

set -e

echo "Starting ACE Group Backend..."

# Install UV if not already installed
if ! command -v uv &> /dev/null; then
    echo "Installing UV package manager..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
fi

# Sync dependencies
echo "Installing dependencies with UV..."
uv sync --frozen

# Run Alembic migrations (optional - can be done in GitHub Actions instead)
# Uncomment if you want migrations to run on startup:
# echo "Running database migrations..."
# uv run alembic upgrade head

# Start the application
echo "Starting FastAPI application..."
exec uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
