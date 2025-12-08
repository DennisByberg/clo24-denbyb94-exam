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

# Remove old/incompatible virtual environment if it exists
if [ -d ".venv" ]; then
    echo "Removing existing virtual environment..."
    rm -rf .venv
fi

# Sync dependencies
echo "Installing dependencies with UV..."
uv sync --frozen

# Run Alembic migrations
echo "Running database migrations..."
uv run alembic upgrade head

# Run seed script if RUN_SEED_ON_STARTUP is set to "true"
if [ "$RUN_SEED_ON_STARTUP" = "true" ]; then
    echo "RUN_SEED_ON_STARTUP is enabled - seeding database..."
    uv run python -m app.db.seed_restaurant_data
    echo "✓ Database seeded successfully"
    
    # Automatically disable seeding for future restarts
    echo "Disabling RUN_SEED_ON_STARTUP for future restarts..."
    if [ -n "$WEBSITE_SITE_NAME" ] && [ -n "$WEBSITE_RESOURCE_GROUP" ]; then
        # Running in Azure App Service - disable via Azure CLI
        if command -v az &> /dev/null; then
            az webapp config appsettings set \
                --name "$WEBSITE_SITE_NAME" \
                --resource-group "$WEBSITE_RESOURCE_GROUP" \
                --settings RUN_SEED_ON_STARTUP=false \
                --output none 2>/dev/null && echo "✓ Auto-disabled seeding for next restart" || echo "⚠ Could not auto-disable (run manually if needed)"
        else
            echo "⚠ Azure CLI not available - seeding will run on next restart"
        fi
    else
        echo "⚠ Not running in Azure App Service - skipping auto-disable"
    fi
else
    echo "Skipping database seeding (RUN_SEED_ON_STARTUP not set to 'true')"
fi

# Start the application
echo "Starting FastAPI application..."
exec uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
