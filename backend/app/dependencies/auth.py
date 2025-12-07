from typing import Annotated

import jwt  # type: ignore
from fastapi import Cookie, Depends, Header, HTTPException, status
from jwt.exceptions import InvalidTokenError  # type: ignore
from sqlalchemy.orm import Session

from app.config import settings
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserResponse


# Return mock user when MOCK_AUTH=true (development/testing)
def _get_mock_user(db: Session) -> UserResponse:
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


# Extract session token from Authorization header or cookies (secure > non-secure)
def _extract_session_token(
    authorization: str | None,
    secure_cookie: str | None,
    cookie: str | None,
) -> str:
    if authorization and authorization.startswith("Bearer "):
        return authorization.replace("Bearer ", "")

    token = secure_cookie or cookie
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated - NextAuth session token missing",
        )
    return token


# Decode HS256 JWT and extract user_id (sub), email, and name from claims
def _decode_jwt_token(token: str) -> tuple[str, str | None, str | None]:
    try:
        payload = jwt.decode(
            token,
            settings.nextauth_secret,
            algorithms=["HS256"],
            options={
                "verify_exp": True,  # Verify expiration time
            },
        )
        user_id: str | None = payload.get("sub")
        user_email: str | None = payload.get("email")
        user_name: str | None = payload.get("name")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid session token - missing user ID",
            )
        return user_id, user_email, user_name
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session token",
        )


# Create new user with 'customer' role on first login
def _create_user(
    db: Session, user_id: str, user_email: str | None, user_name: str | None
) -> User:
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
        return user
    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user account",
        ) from error


# Update user email/name if changed (syncs from OAuth provider)
def _update_user_if_changed(
    db: Session, user: User, user_email: str | None, user_name: str | None
) -> None:
    changed = False

    if user_name and str(user.name) != user_name:
        user.name = user_name  # type: ignore
        changed = True

    if user_email and str(user.email) != user_email:
        user.email = user_email  # type: ignore
        changed = True

    if changed:
        try:
            db.commit()
            db.refresh(user)
        except Exception as error:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update user account",
            ) from error


# FastAPI dependency: Authenticate user via NextAuth.js JWT session (cookie or Bearer token)
# Returns existing user or creates new user with 'customer' role on first login
async def get_current_user(
    db: Annotated[Session, Depends(get_db)],
    next_auth_session_token: str | None = Cookie(None, alias="next-auth.session-token"),
    __Secure_next_auth_session_token: str | None = Cookie(  # type: ignore
        None, alias="__Secure-next-auth.session-token"
    ),
    authorization: str | None = Header(None),
) -> UserResponse:
    if settings.mock_auth:
        return _get_mock_user(db)

    session_token = _extract_session_token(
        authorization, __Secure_next_auth_session_token, next_auth_session_token
    )
    user_id, user_email, user_name = _decode_jwt_token(session_token)

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        user = _create_user(db, user_id, user_email, user_name)
    else:
        _update_user_if_changed(db, user, user_email, user_name)

    return UserResponse.model_validate(user)
