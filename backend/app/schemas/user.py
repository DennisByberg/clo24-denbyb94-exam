from pydantic import BaseModel, ConfigDict, EmailStr


class UserResponse(BaseModel):
    """User response schema for API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    role: str
