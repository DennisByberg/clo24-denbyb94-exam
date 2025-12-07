from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth_router, bookings_router, health_router, restaurants_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=settings.app_description,
)

# CORS middleware configuration for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["Content-Type", "Authorization"],
)

# Register routers
app.include_router(health_router)  # No prefix - available at /health
app.include_router(auth_router, prefix=settings.api_prefix)
app.include_router(restaurants_router, prefix=settings.api_prefix)
app.include_router(bookings_router, prefix=settings.api_prefix)


@app.get(f"{settings.api_prefix}/version")
async def get_version():
    """Get API version."""
    return {"version": settings.app_version}
