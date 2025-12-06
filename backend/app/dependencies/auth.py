from typing import Annotated

from fastapi import Cookie, Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.config import settings
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserResponse


async def get_current_user(
    db: Annotated[Session, Depends(get_db)],
    next_auth_session_token: str | None = Cookie(None, alias="next-auth.session-token"),
    __Secure_next_auth_session_token: str | None = Cookie(
        None, alias="__Secure-next-auth.session-token"
    ),
) -> UserResponse:
    """
    Authenticate and retrieve the current user from NextAuth.js session.
    """

    # Development mode: return mock user for testing without NextAuth
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

    # Production mode: validate NextAuth.js session token
    session_token = __Secure_next_auth_session_token or next_auth_session_token

    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated - NextAuth session token missing",
        )

    # Decode and verify NextAuth JWT session token
    try:
        payload = jwt.decode(
            session_token,
            settings.nextauth_secret,
            algorithms=["HS256"],
        )
        user_id: str | None = payload.get("sub")
        user_email: str | None = payload.get("email")
        user_name: str | None = payload.get("name")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid session token - missing user ID",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session token",
        )

    # Query database for existing user
    user = db.query(User).filter(User.id == user_id).first()

    # First-time login: create new user account
    if not user:
        try:
            user = User(
                id=user_id,
                name=user_name or "Unknown",
                email=user_email or f"{user_id}@unknown.com",
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

    # Existing user: update name/email only if changed
    changed = False

    if user_name and str(user.name) != user_name:
        user.name = user_name  # type: ignore
        changed = True

    if user_email and str(user.email) != user_email:
        user.email = user_email  # type: ignore
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
