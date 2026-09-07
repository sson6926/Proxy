"""
Plan Management API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from ..core.database import get_db
from ..models import User, Plan, Subscription
from .auth import get_current_user
from pydantic import BaseModel

router = APIRouter()


class PlanResponse(BaseModel):
    id: int
    name: str
    display_name: str
    description: str
    requests_per_day: int
    requests_per_minute: int
    price_monthly: int
    features: dict
    
    class Config:
        from_attributes = True


@router.get("/", response_model=List[PlanResponse])
def list_plans(db: Session = Depends(get_db)):
    """List all available plans"""
    plans = db.query(Plan).filter(Plan.is_active == True).all()
    
    return [
        {
            "id": plan.id,
            "name": plan.name,
            "display_name": plan.display_name,
            "description": plan.description or "",
            "requests_per_day": plan.requests_per_day,
            "requests_per_minute": plan.requests_per_minute,
            "price_monthly": plan.price_monthly,
            "features": {
                "allowed_countries": plan.allowed_countries,
                "allowed_protocols": plan.allowed_protocols,
                "sticky_session_enabled": plan.sticky_session_enabled,
                "min_score": plan.min_score,
                "max_concurrent": plan.max_concurrent
            }
        }
        for plan in plans
    ]


@router.get("/{plan_id}")
def get_plan(plan_id: int, db: Session = Depends(get_db)):
    """Get plan details"""
    plan = db.query(Plan).filter(Plan.id == plan_id).first()
    
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan not found"
        )
    
    return {
        "id": plan.id,
        "name": plan.name,
        "display_name": plan.display_name,
        "description": plan.description,
        "quotas": {
            "requests_per_day": plan.requests_per_day,
            "requests_per_minute": plan.requests_per_minute,
            "max_concurrent": plan.max_concurrent
        },
        "features": {
            "allowed_countries": plan.allowed_countries,
            "allowed_protocols": plan.allowed_protocols,
            "sticky_session_enabled": plan.sticky_session_enabled,
            "min_score": plan.min_score
        },
        "pricing": {
            "monthly_cents": plan.price_monthly
        }
    }
