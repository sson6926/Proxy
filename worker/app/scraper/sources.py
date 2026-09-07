"""
Proxy Scraper - Free proxy sources
"""
import asyncio
import aiohttp
import re
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class ProxySource:
    """Base class for proxy sources"""
    
    async def fetch(self) -> List[Dict[str, str]]:
        """Fetch proxies from source"""
        raise NotImplementedError


class FreeProxyListSource(ProxySource):
    """Scrape from free-proxy-list.net"""
    
    URL = "https://free-proxy-list.net/"
    
    async def fetch(self) -> List[Dict[str, str]]:
        proxies = []
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.URL, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                    if resp.status == 200:
                        text = await resp.text()
                        # Simple regex to extract IP:Port
                        pattern = r'(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})</td><td>(\d+)</td>'
                        matches = re.findall(pattern, text)
                        
                        for ip, port in matches[:50]:  # Limit to 50 proxies
                            proxies.append({
                                "host": ip,
                                "port": port,
                                "protocol": "http",
                                "source": "free-proxy-list"
                            })
        except Exception as e:
            logger.error(f"Error fetching from {self.URL}: {e}")
        
        return proxies


class ProxyScrapeSource(ProxySource):
    """Scrape from proxyscrape.com API"""
    
    URL = "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all"
    
    async def fetch(self) -> List[Dict[str, str]]:
        proxies = []
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.URL, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                    if resp.status == 200:
                        text = await resp.text()
                        lines = text.strip().split('\n')
                        
                        for line in lines[:50]:
                            if ':' in line:
                                ip, port = line.strip().split(':')
                                proxies.append({
                                    "host": ip,
                                    "port": port,
                                    "protocol": "http",
                                    "source": "proxyscrape"
                                })
        except Exception as e:
            logger.error(f"Error fetching from {self.URL}: {e}")
        
        return proxies


class ProxyScraper:
    """Main scraper coordinating all sources"""
    
    def __init__(self):
        self.sources = [
            FreeProxyListSource(),
            ProxyScrapeSource(),
        ]
    
    async def scrape_all(self) -> List[Dict[str, str]]:
        """Scrape from all sources"""
        all_proxies = []
        
        tasks = [source.fetch() for source in self.sources]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        for result in results:
            if isinstance(result, list):
                all_proxies.extend(result)
            else:
                logger.error(f"Scraper error: {result}")
        
        # Deduplicate
        seen = set()
        unique_proxies = []
        for proxy in all_proxies:
            key = f"{proxy['host']}:{proxy['port']}"
            if key not in seen:
                seen.add(key)
                unique_proxies.append(proxy)
        
        logger.info(f"Scraped {len(unique_proxies)} unique proxies")
        return unique_proxies


# Singleton instance
scraper = ProxyScraper()
