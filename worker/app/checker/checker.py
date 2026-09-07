"""
Proxy Checker - Verify proxy health and performance
"""
import asyncio
import aiohttp
import time
from typing import Dict, Optional, Tuple
import logging
from ..core.config import settings

logger = logging.getLogger(__name__)


class ProxyChecker:
    """Check proxy health and measure performance"""
    
    TEST_URL = "http://httpbin.org/ip"
    TEST_HTTPS_URL = "https://httpbin.org/ip"
    
    @staticmethod
    async def check_tcp(host: str, port: int, timeout: int = 5) -> bool:
        """Check TCP connection"""
        try:
            _, writer = await asyncio.wait_for(
                asyncio.open_connection(host, port),
                timeout=timeout
            )
            writer.close()
            await writer.wait_closed()
            return True
        except:
            return False
    
    @staticmethod
    async def check_http(host: str, port: int, timeout: int = 10) -> Tuple[bool, Optional[float], Optional[str]]:
        """
        Check HTTP proxy
        Returns: (success, latency_ms, country_code)
        """
        proxy_url = f"http://{host}:{port}"
        start_time = time.time()
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    ProxyChecker.TEST_URL,
                    proxy=proxy_url,
                    timeout=aiohttp.ClientTimeout(total=timeout)
                ) as resp:
                    if resp.status == 200:
                        latency_ms = (time.time() - start_time) * 1000
                        data = await resp.json()
                        
                        # Check if proxy is working (origin IP should be proxy IP)
                        origin_ip = data.get("origin", "").split(",")[0].strip()
                        
                        return True, latency_ms, None
                    else:
                        return False, None, None
        except Exception as e:
            logger.debug(f"HTTP check failed for {host}:{port}: {e}")
            return False, None, None
    
    @staticmethod
    async def check_proxy_full(proxy_data: Dict[str, str]) -> Dict[str, any]:
        """
        Full proxy check with all tests
        Returns updated proxy data with check results
        """
        host = proxy_data["host"]
        port = int(proxy_data["port"])
        
        result = {
            **proxy_data,
            "status": "dead",
            "latency_ms": None,
            "score": 0,
            "last_checked": int(time.time())
        }
        
        # TCP check first
        tcp_ok = await ProxyChecker.check_tcp(host, port, timeout=5)
        if not tcp_ok:
            return result
        
        # HTTP check
        http_ok, latency, country = await ProxyChecker.check_http(host, port, timeout=settings.CHECK_TIMEOUT)
        
        if http_ok:
            result["status"] = "alive"
            result["latency_ms"] = round(latency, 2)
            
            # Calculate score
            score = ProxyChecker.calculate_score(latency)
            result["score"] = score
        
        return result
    
    @staticmethod
    def calculate_score(latency_ms: float) -> int:
        """
        Calculate proxy score based on latency
        Score range: 0-100
        """
        if latency_ms is None:
            return 0
        
        # Scoring logic:
        # < 100ms: 90-100
        # 100-300ms: 70-90
        # 300-500ms: 50-70
        # 500-1000ms: 30-50
        # > 1000ms: 0-30
        
        if latency_ms < 100:
            score = 100 - (latency_ms / 100) * 10
        elif latency_ms < 300:
            score = 90 - ((latency_ms - 100) / 200) * 20
        elif latency_ms < 500:
            score = 70 - ((latency_ms - 300) / 200) * 20
        elif latency_ms < 1000:
            score = 50 - ((latency_ms - 500) / 500) * 20
        else:
            score = max(0, 30 - ((latency_ms - 1000) / 1000) * 30)
        
        return max(0, min(100, int(score)))


async def check_proxies_batch(proxies: list) -> list:
    """Check multiple proxies concurrently"""
    tasks = [ProxyChecker.check_proxy_full(proxy) for proxy in proxies]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    valid_results = []
    for result in results:
        if isinstance(result, dict):
            valid_results.append(result)
        else:
            logger.error(f"Checker error: {result}")
    
    return valid_results
