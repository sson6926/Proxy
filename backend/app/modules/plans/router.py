from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ...core.database import get_db
from .schemas import PlanResponse

router = APIRouter(prefix="/plans", tags=["Plans"])

@router.get("/", response_model=List[PlanResponse])
async def list_plans(db: AsyncSession = Depends(get_db)):
    """List all available plans"""
    # TODO: Implement plan listing
    return []
