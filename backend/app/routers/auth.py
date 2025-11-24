from typing import Annotated

from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.schemas.user import UserResponse

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: Annotated[UserResponse, Depends(get_current_user)]):
    """Get current authenticated user information."""
    return current_user
