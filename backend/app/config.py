from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration, overridable by environment or a .env file."""

    model_config = SettingsConfigDict(env_prefix="SCC_", env_file=".env")

    app_name: str = "Ship, Captain & Crew"
    debug: bool = False

    # Vite dev server. Kept explicit rather than "*" so credentials can be added
    # later without loosening the policy.
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]


@lru_cache
def get_settings() -> Settings:
    return Settings()
