from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    """User response schema for API responses."""

    id: str
    name: str
    email: EmailStr
    role: str

    model_config = {"from_attributes": True}
