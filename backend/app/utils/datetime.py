from datetime import datetime, timezone, timedelta
from typing import Optional

def utc_now() -> datetime:
    """Get current UTC datetime"""
    return datetime.now(timezone.utc)

def format_datetime(dt: datetime, fmt: str = "%Y-%m-%d %H:%M:%S") -> str:
    """Format datetime to string"""
    if dt.tzinfo:
        dt = dt.astimezone(timezone.utc)
    return dt.strftime(fmt)

def parse_datetime(dt_str: str, fmt: str = "%Y-%m-%d %H:%M:%S") -> Optional[datetime]:
    """Parse datetime from string"""
    try:
        return datetime.strptime(dt_str, fmt).replace(tzinfo=timezone.utc)
    except (ValueError, TypeError):
        return None

def is_expired(expires_at: datetime) -> bool:
    """Check if datetime has expired"""
    return utc_now() > expires_at

def days_from_now(days: int) -> datetime:
    """Get datetime N days from now"""
    return utc_now() + timedelta(days=days)
