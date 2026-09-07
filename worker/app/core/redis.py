"""
Redis Client for Data Plane
"""
import redis
from typing import Optional, List, Dict, Any
import json
from .config import settings

# Redis client
redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)


class ProxyRegistry:
    """Manage proxies in Redis"""
    
    @staticmethod
    def add_proxy(proxy_id: str, proxy_data: Dict[str, Any], pool: str = "default"):
        """Add proxy to registry and pool"""
        # Store proxy metadata
        redis_client.hset(f"proxy:{proxy_id}", mapping=proxy_data)
        
        # Add to pool with score
        score = proxy_data.get("score", 50)
        redis_client.zadd(f"pool:{pool}", {proxy_id: score})
    
    @staticmethod
    def get_proxy(proxy_id: str) -> Optional[Dict[str, Any]]:
        """Get proxy metadata"""
        data = redis_client.hgetall(f"proxy:{proxy_id}")
        return data if data else None
    
    @staticmethod
    def update_score(proxy_id: str, score: int, pool: str = "default"):
        """Update proxy score in pool"""
        redis_client.zadd(f"pool:{pool}", {proxy_id: score})
        redis_client.hset(f"proxy:{proxy_id}", "score", score)
    
    @staticmethod
    def get_best_proxies(pool: str = "default", limit: int = 10) -> List[str]:
        """Get top proxies from pool by score"""
        return redis_client.zrevrange(f"pool:{pool}", 0, limit - 1)
    
    @staticmethod
    def remove_proxy(proxy_id: str, pool: str = "default"):
        """Remove proxy from pool and registry"""
        redis_client.zrem(f"pool:{pool}", proxy_id)
        redis_client.delete(f"proxy:{proxy_id}")
    
    @staticmethod
    def get_random_proxy(pool: str = "default", min_score: int = 50) -> Optional[str]:
        """Get random proxy above min score"""
        proxies = redis_client.zrangebyscore(f"pool:{pool}", min_score, "+inf")
        if proxies:
            import random
            return random.choice(proxies)
        return None


class RateLimiter:
    """Rate limiting for API keys"""
    
    @staticmethod
    def check_rate_limit(api_key: str, rpm: int) -> bool:
        """Check if API key is within rate limit"""
        key = f"ratelimit:{api_key}:minute"
        current = redis_client.get(key)
        
        if current and int(current) >= rpm:
            return False
        
        pipe = redis_client.pipeline()
        pipe.incr(key)
        pipe.expire(key, 60)
        pipe.execute()
        
        return True
    
    @staticmethod
    def check_daily_quota(api_key: str, daily_limit: int) -> bool:
        """Check daily quota"""
        key = f"quota:{api_key}:daily"
        current = redis_client.get(key)
        
        if current and int(current) >= daily_limit:
            return False
        
        return True
    
    @staticmethod
    def increment_quota(api_key: str):
        """Increment daily quota counter"""
        key = f"quota:{api_key}:daily"
        pipe = redis_client.pipeline()
        pipe.incr(key)
        pipe.expire(key, 86400)  # 24 hours
        pipe.execute()


class AuthCache:
    """Cache API key permissions"""
    
    @staticmethod
    def cache_api_key(api_key_hash: str, permissions: Dict[str, Any], ttl: int = 3600):
        """Cache API key permissions"""
        redis_client.setex(
            f"apikey:{api_key_hash}",
            ttl,
            json.dumps(permissions)
        )
    
    @staticmethod
    def get_api_key_permissions(api_key_hash: str) -> Optional[Dict[str, Any]]:
        """Get cached API key permissions"""
        data = redis_client.get(f"apikey:{api_key_hash}")
        if data:
            return json.loads(data)
        return None
    
    @staticmethod
    def invalidate_api_key(api_key_hash: str):
        """Invalidate cached API key"""
        redis_client.delete(f"apikey:{api_key_hash}")
