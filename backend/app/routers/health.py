import time
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import settings
from app.db.session import get_db
from app.models.user import User

router = APIRouter(tags=["health"])


# Basic health check for Docker/Azure (no auth required)
@router.get("/health")
async def basic_health_check():
    return {"status": "healthy"}


# Detailed health check with metrics (will require admin auth in future)
@router.get("/health/detailed")
async def detailed_health_check(db: Annotated[Session, Depends(get_db)]):
    start_time = time.time()

    try:
        db.execute(text("SELECT 1"))
        database_status = "connected"
    except Exception:
        db.rollback()
        database_status = "error"

    try:
        user_count = db.query(User).count()
    except Exception:
        db.rollback()
        user_count = 0

    # Calculate response time in milliseconds
    response_time_ms = int((time.time() - start_time) * 1000)

    # Determine auth mode based on configuration
    if settings.mock_auth:
        auth_mode = "mock"
    else:
        auth_mode = "nextauth-jwt"

    # Determine environment based on debug mode
    environment = "development" if settings.debug else "production"

    return {
        "api_status": "healthy",
        "database_status": database_status,
        "auth_mode": auth_mode,
        "user_count": user_count,
        "environment": environment,
        "debug_mode": settings.debug,
        "mock_auth": settings.mock_auth,
        "response_time_ms": response_time_ms,
    }
