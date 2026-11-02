"""Liveness probes."""

from fastapi import APIRouter

from ..config import get_settings

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict[str, str]:
    """Cheap check that the process is up and serving."""
    return {"status": "ok"}


@router.get("/version")
def version() -> dict[str, str]:
    settings = get_settings()
    return {"name": settings.app_name, "version": "0.1.0"}
