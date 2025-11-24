import time
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import settings
from app.db.session import get_db
from app.models.user import User

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check(db: Annotated[Session, Depends(get_db)]):
    start_time = time.time()

    try:
        db.execute(text("SELECT 1"))
        database_status = "connected"
    except Exception:
        database_status = "error"

    try:
        user_count = db.query(User).count()
    except Exception:
        user_count = 0

    # Calculate response time in milliseconds
    response_time_ms = int((time.time() - start_time) * 1000)

    return {
        "api_status": "healthy",
        "database_status": database_status,
        "auth_mode": "mock" if settings.mock_auth else "azure",
        "user_count": user_count,
        "environment": "development" if settings.mock_auth else "production",
        "response_time_ms": response_time_ms,
    }
