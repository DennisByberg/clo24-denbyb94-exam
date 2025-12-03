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
    Authenticate and retrieve the current user.
    """

    # Development mode: return mock user for testing without Azure Easy Auth
    if settings.mock_auth:
        # Check if mock user exists in DB, create if not
        mock_user_id = "mock-user-123"
        user = db.query(User).filter(User.id == mock_user_id).first()

        if not user:
            user = User(
                id=mock_user_id,
                name="Test User",
                email="mock_mail@example.com",
                role="customer",
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        return UserResponse.model_validate(user)

    # Production mode: validate Azure Easy Auth headers
    if not x_ms_client_principal_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated - Azure Easy Auth headers missing",
        )

    # Query database for existing user by Azure AD ID
    user = db.query(User).filter(User.id == x_ms_client_principal_id).first()

    # First-time login: create new user account
    if not user:
        try:
            # Create new user with Azure Easy Auth data, defaulting to 'customer' role
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
        except Exception:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user account",
            )
        return UserResponse.model_validate(user)

    # Existing user: update name/email only if changed to avoid unnecessary DB writes
    changed = False

    if x_ms_client_principal_name and str(user.name) != x_ms_client_principal_name:
        user.name = x_ms_client_principal_name  # type: ignore
        changed = True

    if x_ms_client_principal_email and str(user.email) != x_ms_client_principal_email:
        user.email = x_ms_client_principal_email  # type: ignore
        changed = True

    # Persist updated user information only if something changed
    if changed:
        try:
            db.commit()
            db.refresh(user)
        except Exception:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update user account",
            )

    return UserResponse.model_validate(user)
