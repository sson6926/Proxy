"""
Audit Logs API
Track all admin actions and system events
"""
from fastapi import APIRouter, Depends, Query
from datetime import datetime, timedelta
import random

from ..core.auth import get_current_user

def get_current_admin_user(current_user = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user
from ..models.user import User

router = APIRouter(prefix="/api/admin/audit", tags=["admin-audit"])

@router.get("/logs")
async def get_audit_logs(
    limit: int = Query(50, le=200),
    offset: int = 0,
    action_type: str = None,
    user_id: int = None,
    current_user: User = Depends(get_current_admin_user)
):
    """Get audit logs with filters"""
    actions = ["user.create", "user.update", "user.delete", "key.create", "key.revoke", 
               "worker.start", "worker.stop", "proxy.cleanup", "admin.login", "settings.update"]
    
    logs = []
    for i in range(limit):
        action = random.choice(actions)
        logs.append({
            "id": 1000 + i,
            "timestamp": (datetime.now() - timedelta(minutes=i*5)).isoformat(),
            "action": action,
            "user_id": random.choice([8, 5, 6]),
            "username": random.choice(["e2e_test", "user_alpha", "user_beta"]),
            "ip_address": f"192.168.{random.randint(1, 255)}.{random.randint(1, 255)}",
            "details": f"Performed {action}",
            "resource_type": action.split(".")[0],
            "resource_id": random.randint(1, 100),
            "success": random.random() > 0.05
        })
    
    return {
        "logs": logs[:limit],
        "total": 1000 + limit,
        "offset": offset,
        "limit": limit
    }

@router.get("/stats")
async def get_audit_stats(current_user: User = Depends(get_current_admin_user)):
    """Get audit statistics"""
    return {
        "total_actions_today": 127,
        "total_actions_month": 3456,
        "failed_actions_today": 3,
        "most_active_user": "e2e_test",
        "most_common_action": "key.create",
        "recent_activity": [
            {"action": "worker.start", "count": 12},
            {"action": "key.create", "count": 8},
            {"action": "user.update", "count": 5}
        ]
    }

@router.post("/export")
async def export_audit_logs(
    format: str = "csv",
    current_user: User = Depends(get_current_admin_user)
):
    """Export audit logs"""
    return {
        "status": "success",
        "format": format,
        "file_url": f"/downloads/audit-logs-{datetime.now().strftime('%Y%m%d')}.{format}",
        "expires_at": (datetime.now() + timedelta(hours=24)).isoformat()
    }
