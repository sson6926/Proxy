from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class APIKeyBase(BaseModel):
    name: Optional[str] = None
    expires_at: Optional[datetime] = None

class APIKeyCreate(APIKeyBase):
    pass

class APIKeyResponse(BaseModel):
    id: int
    key: str
    name: Optional[str]
    is_active: bool
    created_at: datetime
    expires_at: Optional[datetime]

    class Config:
        from_attributes = True
