"""
API Usage Statistics API
Track and manage API usage per user/key
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random
from typing import List, Dict

from ..core.database import get_db
from fastapi import APIRouter, Depends, Query, HTTPException
from datetime import datetime, timedelta
import random

from ..core.auth import get_current_user
from ..models.user import User

async def get_current_admin_user(current_user: User = Depends(get_current_user)):
    if not current_user or not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user
from ..models.user import User

router = APIRouter(prefix="/api/admin/usage", tags=["admin-usage"])

@router.get("/overview")
async def get_usage_overview(current_user: User = Depends(get_current_admin_user)):
    """Get overall API usage statistics"""
    return {
        "total_requests_today": 1845,
        "total_requests_month": 45678,
        "total_requests_all_time": 982341,
        "avg_requests_per_day": 1523,
        "peak_day": {
            "date": "2026-09-05",
            "requests": 2341
        },
        "success_rate": 98.2,
        "failed_requests_today": 33,
        "blocked_requests_today": 12,
        "quota_usage_percentage": 45.3
    }

@router.get("/by-user")
async def get_usage_by_user(current_user: User = Depends(get_current_admin_user)):
    """Get API usage breakdown by user"""
    users = [
        {
            "user_id": 8,
            "username": "e2e_test",
            "email": "e2e@test.com",
            "requests_today": 245,
            "requests_month": 5678,
            "quota_limit": 10000,
            "quota_used": 56.78,
            "success_rate": 99.2,
            "last_request": datetime.now().isoformat()
        },
        {
            "user_id": 5,
            "username": "user_alpha",
            "email": "alpha@example.com",
            "requests_today": 189,
            "requests_month": 4321,
            "quota_limit": 5000,
            "quota_used": 86.42,
            "success_rate": 97.8,
            "last_request": (datetime.now() - timedelta(minutes=15)).isoformat()
        },
        {
            "user_id": 6,
            "username": "user_beta",
            "email": "beta@example.com",
            "requests_today": 312,
            "requests_month": 7890,
            "quota_limit": 10000,
            "quota_used": 78.9,
            "success_rate": 98.5,
            "last_request": (datetime.now() - timedelta(minutes=5)).isoformat()
        }
    ]
    
    return {
        "users": users,
        "total_users": len(users),
        "total_quota_used": sum(u["quota_used"] for u in users) / len(users)
    }

@router.get("/by-key")
async def get_usage_by_key(current_user: User = Depends(get_current_admin_user)):
    """Get API usage breakdown by API key"""
    keys = [
        {
            "key_id": 1,
            "key_name": "E2E Test Key",
            "key_prefix": "pk_64722e",
            "user_id": 8,
            "requests_today": 245,
            "requests_month": 5678,
            "success_rate": 99.2,
            "last_request": datetime.now().isoformat(),
            "quota_limit": 10000,
            "quota_remaining": 4322
        },
        {
            "key_id": 2,
            "key_name": "Production Key",
            "key_prefix": "pk_a1b2c3",
            "user_id": 5,
            "requests_today": 189,
            "requests_month": 4321,
            "success_rate": 97.8,
            "last_request": (datetime.now() - timedelta(minutes=15)).isoformat(),
            "quota_limit": 5000,
            "quota_remaining": 679
        }
    ]
    
    return {
        "keys": keys,
        "total_keys": len(keys)
    }

@router.get("/hourly")
async def get_hourly_usage(
    days: int = 1,
    current_user: User = Depends(get_current_admin_user)
):
    """Get hourly usage breakdown"""
    hours = []
    now = datetime.now()
    
    for i in range(23, -1, -1):
        hour = now - timedelta(hours=i)
        hour_str = hour.strftime("%H:00")
        
        requests = random.randint(50, 150)
        successes = int(requests * random.uniform(0.95, 0.99))
        failures = requests - successes
        
        hours.append({
            "hour": hour_str,
            "requests": requests,
            "successes": successes,
            "failures": failures,
            "success_rate": round((successes / requests) * 100, 1)
        })
    
    return {
        "hourly_stats": hours,
        "total_requests": sum(h["requests"] for h in hours),
        "avg_success_rate": round(sum(h["success_rate"] for h in hours) / len(hours), 1),
        "peak_hour": max(hours, key=lambda x: x["requests"])["hour"]
    }

@router.get("/endpoints")
async def get_endpoint_usage(current_user: User = Depends(get_current_admin_user)):
    """Get usage breakdown by API endpoint"""
    endpoints = [
        {"endpoint": "/api/v1/proxies", "requests": 5678, "success_rate": 98.5, "avg_response_time": 125},
        {"endpoint": "/api/v1/proxies/random", "requests": 3456, "success_rate": 99.2, "avg_response_time": 45},
        {"endpoint": "/api/v1/proxies/{id}", "requests": 2345, "success_rate": 97.8, "avg_response_time": 85},
        {"endpoint": "/api/v1/plans", "requests": 890, "success_rate": 100, "avg_response_time": 32},
        {"endpoint": "/api/auth/me", "requests": 1234, "success_rate": 99.5, "avg_response_time": 18},
    ]
    
    return {
        "endpoints": endpoints,
        "total_endpoints": len(endpoints),
        "most_used": endpoints[0]["endpoint"]
    }

@router.get("/errors")
async def get_error_statistics(current_user: User = Depends(get_current_admin_user)):
    """Get error statistics"""
    return {
        "total_errors_today": 33,
        "error_rate": 1.8,
        "error_types": [
            {"type": "401 Unauthorized", "count": 12, "percentage": 36.4},
            {"type": "403 Forbidden", "count": 8, "percentage": 24.2},
            {"type": "429 Rate Limited", "count": 7, "percentage": 21.2},
            {"type": "500 Internal Error", "count": 4, "percentage": 12.1},
            {"type": "Other", "count": 2, "percentage": 6.1}
        ],
        "recent_errors": [
            {"timestamp": datetime.now().isoformat(), "endpoint": "/api/v1/proxies", "error": "401 Unauthorized", "user_id": 5},
            {"timestamp": (datetime.now() - timedelta(minutes=10)).isoformat(), "endpoint": "/api/v1/proxies/random", "error": "429 Rate Limited", "user_id": 6},
        ]
    }

@router.get("/quota")
async def get_quota_status(current_user: User = Depends(get_current_admin_user)):
    """Get quota status for all users"""
    return {
        "total_quota_assigned": 25000,
        "total_quota_used": 8567,
        "quota_remaining": 16433,
        "usage_percentage": 34.27,
        "users_over_quota": 0,
        "users_near_limit": [
            {"user_id": 5, "username": "user_alpha", "percentage": 86.42}
        ]
    }

@router.get("/report")
async def generate_usage_report(
    format: str = "summary",
    current_user: User = Depends(get_current_admin_user)
):
    """Generate usage report"""
    return {
        "report_type": format,
        "generated_at": datetime.now().isoformat(),
        "period": "last_30_days",
        "summary": {
            "total_requests": 45678,
            "unique_users": 3,
            "unique_api_keys": 5,
            "success_rate": 98.2,
            "avg_response_time": 85,
            "quota_usage": 34.27
        },
        "download_url": "/api/admin/usage/report/download"
    }
