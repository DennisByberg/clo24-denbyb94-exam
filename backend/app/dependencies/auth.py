from typing import Annotated

from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.config import settings
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserResponse


async def get_current_user(
    db: Annotated[Session, Depends(get_db)],
    x_ms_client_principal_id: str | None = Header(None),
    x_ms_client_principal_name: str | None = Header(None),
    x_ms_client_principal_email: str | None = Header(None),
) -> UserResponse:
    """
    Get current authenticated user from mock (dev) or Azure Easy Auth (production).
    """

    # MOCK MODE - Development/Testing
    if settings.mock_auth:
        mock_user = UserResponse(
            id="mock-user-123",
            name="Test User",
            email="mock_mail@example.com",
            role="customer",
        )
        return mock_user

    # PRODUCTION MODE - Azure Easy Auth
    if not x_ms_client_principal_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated - Azure Easy Auth headers missing",
        )

    # Get or create user from database
    user = db.query(User).filter(User.id == x_ms_client_principal_id).first()

    if not user:
        # First login - create new user
        user = User(
            id=x_ms_client_principal_id,
            name=x_ms_client_principal_name or "Unknown",
            email=x_ms_client_principal_email
            or f"{x_ms_client_principal_id}@unknown.com",
            role="customer",
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return UserResponse.model_validate(user)

    # User exists - update name if it changed
    if x_ms_client_principal_name:
        user.name = x_ms_client_principal_name  # type: ignore

    # Update email if it changed
    if x_ms_client_principal_email:
        user.email = x_ms_client_principal_email  # type: ignore

    db.commit()
    db.refresh(user)

    return UserResponse.model_validate(user)
