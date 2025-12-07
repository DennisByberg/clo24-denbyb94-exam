from typing import Union

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings and configuration."""

    # App Info
    app_name: str = "Ace Group API"
    app_version: str = "0.4.0"
    app_description: str = (
        "REST API for managing restaurant table bookings at ACE Group's dining venues"
    )

    # (.env) Database connection
    database_url: str = "postgresql://user:password@localhost:5432/restaurant_db"

    # API Configuration
    api_prefix: str = "/api"

    # Environment
    debug: bool = True

    # (.env) Authentication
    mock_auth: bool = False

    # (.env) NextAuth.js
    nextauth_secret: str = ""

    # (.env) Security/CORS
    allowed_origins: Union[str, list[str]] = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]

    # Validate nextauth_secret is set when not in mock auth mode
    @field_validator("nextauth_secret")
    @classmethod
    def validate_nextauth_secret(cls, v: str) -> str:
        if not v:
            raise ValueError(
                "NEXTAUTH_SECRET must be set in environment variables. "
                "Generate one with: openssl rand -base64 32"
            )
        return v

    # Parse allowed_origins from string or list for Azure compatibility
    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
    )


settings = Settings()
