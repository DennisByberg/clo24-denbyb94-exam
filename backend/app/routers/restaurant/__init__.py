from .bookings import router as bookings_router
from .restaurants import router as restaurants_router

__all__ = ["restaurants_router", "bookings_router"]
