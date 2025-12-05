#!/bin/bash
# Azure App Service startup script for FastAPI with UV package manager
# This script installs UV, syncs dependencies, and starts the application

set -e

echo "Starting ACE Group Backend..."

# Install UV if not already installed
if ! command -v uv &> /dev/null; then
    echo "Installing UV package manager..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    # Add UV to PATH (installed to ~/.local/bin by default)
    export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
fi

# Ensure UV is in PATH for this session
export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"

# Remove any existing virtual environment (may be corrupted from previous deployments)
if [ -d "/home/site/wwwroot/.venv" ]; then
    echo "Removing existing virtual environment..."
    rm -rf /home/site/wwwroot/.venv
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
