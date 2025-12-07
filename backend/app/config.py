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

    # (.env) API Configuration
    api_prefix: str = "/api"

    # (.env) Environment
    debug: bool = True

    # (.env) Authentication - Set to 'true' for development with mock user, 'false' for production with NextAuth
    mock_auth: bool = False

    # (.env) NextAuth.js - Must match frontend NEXTAUTH_SECRET
    nextauth_secret: str = ""

    # (.env) Security/CORS - Comma-separated list of allowed origins
    allowed_origins: Union[str, list[str]] = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]

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


# Initialize settings from environment variables
settings = Settings()
