from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth_router, health_router, restaurant_router

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
app.include_router(auth_router, prefix=settings.api_prefix)
app.include_router(health_router)
app.include_router(restaurant_router)


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
