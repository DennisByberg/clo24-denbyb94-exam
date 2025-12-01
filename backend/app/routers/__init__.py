"""Router package initialization."""

from app.routers.auth import router as auth_router
from app.routers.health import router as health_router
from app.routers.restaurant import router as restaurant_router

__all__ = ["auth_router", "health_router", "restaurant_router"]
