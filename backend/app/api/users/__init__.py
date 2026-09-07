"""
User Management API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..core.database import get_db
from ..models import User, Subscription
from .auth import get_current_user

router = APIRouter()


@router.get("/me")
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user detailed info"""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at
    }


@router.get("/me/subscription")
def get_current_user_subscription(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user's active subscription"""
    subscription = db.query(Subscription).filter(
        Subscription.user_id == current_user.id,
        Subscription.status == "active"
    ).first()
    
    if not subscription:
        return {"subscription": None}
    
    return {
        "subscription": {
            "id": subscription.id,
            "plan": {
                "id": subscription.plan.id,
                "name": subscription.plan.name,
                "display_name": subscription.plan.display_name
            },
            "started_at": subscription.started_at,
            "expires_at": subscription.expires_at,
            "status": subscription.status
        }
    }
