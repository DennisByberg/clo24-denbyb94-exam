"""Router package initialization."""

from app.routers.auth import router as auth_router
from app.routers.health import router as health_router
from app.routers.restaurant.bookings import router as bookings_router
from app.routers.restaurant.restaurants import router as restaurants_router

__all__ = ["auth_router", "health_router", "restaurants_router", "bookings_router"]
