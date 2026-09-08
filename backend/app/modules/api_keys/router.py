from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ...core.database import get_db
from ...dependencies.auth import get_current_user
from .schemas import APIKeyCreate, APIKeyResponse
from .models import APIKey
from ..users.models import User
from ...utils.hashing import generate_api_key

router = APIRouter(prefix="/api-keys", tags=["API Keys"])

@router.post("/", response_model=APIKeyResponse, status_code=status.HTTP_201_CREATED)
async def create_api_key(
    key_data: APIKeyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create new API key"""
    api_key = APIKey(
        user_id=current_user.id,
        key=generate_api_key(),
        name=key_data.name,
        expires_at=key_data.expires_at
    )
    db.add(api_key)
    await db.commit()
    await db.refresh(api_key)
    return api_key

@router.get("/", response_model=List[APIKeyResponse])
async def list_api_keys(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List user's API keys"""
    # TODO: Implement listing
    return []
