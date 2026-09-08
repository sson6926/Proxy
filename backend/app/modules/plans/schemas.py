from pydantic import BaseModel
from typing import Optional

class PlanBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    daily_quota: int = 1000
    max_concurrent_requests: int = 10
    price_monthly: int = 0

class PlanCreate(PlanBase):
    pass

class PlanUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    daily_quota: Optional[int] = None
    max_concurrent_requests: Optional[int] = None
    price_monthly: Optional[int] = None

class PlanResponse(PlanBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True
