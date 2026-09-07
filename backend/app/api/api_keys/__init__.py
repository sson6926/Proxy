"""
API Key Management Routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
import secrets
import hashlib
from typing import List

from ..core.database import get_db
from ..core.config import settings
from ..models import User, APIKey
from .auth import get_current_user
from pydantic import BaseModel

router = APIRouter()


class APIKeyCreate(BaseModel):
    name: str = "Default Key"


class APIKeyResponse(BaseModel):
    id: int
    name: str
    key: str  # Only shown once when created
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


def generate_api_key() -> tuple[str, str]:
    """Generate API key and hash"""
    # Generate random 32-byte key
    raw_key = secrets.token_hex(32)
    # Add prefix
    api_key = f"{settings.API_KEY_PREFIX}{raw_key}"
    # Hash for storage
    key_hash = hashlib.sha256(api_key.encode()).hexdigest()
    
    return api_key, key_hash


@router.post("/", response_model=APIKeyResponse, status_code=status.HTTP_201_CREATED)
def create_api_key(
    key_create: APIKeyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new API key"""
    api_key, key_hash = generate_api_key()
    
    api_key_obj = APIKey(
        user_id=current_user.id,
        key_hash=key_hash,
        name=key_create.name
    )
    db.add(api_key_obj)
    db.commit()
    db.refresh(api_key_obj)
    
    return {
        "id": api_key_obj.id,
        "name": api_key_obj.name,
        "key": api_key,  # Only shown once
        "is_active": api_key_obj.is_active,
        "created_at": api_key_obj.created_at
    }


@router.get("/", response_model=List[dict])
def list_api_keys(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all API keys (without revealing the actual key)"""
    keys = db.query(APIKey).filter(APIKey.user_id == current_user.id).all()
    
    return [
        {
            "id": key.id,
            "name": key.name,
            "is_active": key.is_active,
            "last_used_at": key.last_used_at,
            "created_at": key.created_at
        }
        for key in keys
    ]


@router.delete("/{key_id}", status_code=status.HTTP_204_NO_CONTENT)
def revoke_api_key(
    key_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Revoke an API key"""
    api_key = db.query(APIKey).filter(
        APIKey.id == key_id,
        APIKey.user_id == current_user.id
    ).first()
    
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="API key not found"
        )
    
    api_key.is_active = False
    db.commit()
    
    return None
