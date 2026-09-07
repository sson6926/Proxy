"""
Background Worker - Scrape and Check Proxies
"""
import asyncio
import logging
from typing import List, Dict
import time

from ..scraper.sources import scraper
from ..checker.checker import check_proxies_batch
from ..core.redis_client import ProxyRegistry
from ..core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ProxyWorker:
    """Background worker for scraping and checking proxies"""
    
    def __init__(self):
        self.running = False
    
    async def scrape_and_check_cycle(self):
        """One cycle of scraping and checking"""
        logger.info("Starting scrape and check cycle...")
        
        # Scrape proxies
        raw_proxies = await scraper.scrape_all()
        logger.info(f"Scraped {len(raw_proxies)} proxies")
        
        if not raw_proxies:
            logger.warning("No proxies scraped")
            return
        
        # Check proxies in batches
        batch_size = settings.CHECK_BATCH_SIZE
        all_checked = []
        
        for i in range(0, len(raw_proxies), batch_size):
            batch = raw_proxies[i:i + batch_size]
            checked = await check_proxies_batch(batch)
            all_checked.extend(checked)
            logger.info(f"Checked batch {i // batch_size + 1}: {len(checked)} results")
            
            await asyncio.sleep(1)  # Small delay between batches
        
        # Filter alive proxies
        alive_proxies = [p for p in all_checked if p["status"] == "alive"]
        logger.info(f"Found {len(alive_proxies)} alive proxies")
        
        # Add to registry
        for proxy in alive_proxies:
            proxy_id = f"{proxy['host']}:{proxy['port']}"
            ProxyRegistry.add_proxy(proxy_id, proxy, pool="default")
        
        logger.info(f"Added {len(alive_proxies)} proxies to registry")
    
    async def run_forever(self, interval: int = 300):
        """Run worker continuously"""
        self.running = True
        logger.info(f"Worker started. Check interval: {interval}s")
        
        while self.running:
            try:
                await self.scrape_and_check_cycle()
            except Exception as e:
                logger.error(f"Worker cycle error: {e}", exc_info=True)
            
            logger.info(f"Sleeping for {interval}s...")
            await asyncio.sleep(interval)
    
    def stop(self):
        """Stop worker"""
        self.running = False
        logger.info("Worker stopped")


# CLI entry point
async def main():
    worker = ProxyWorker()
    try:
        await worker.run_forever(interval=settings.RECHECK_INTERVAL)
    except KeyboardInterrupt:
        logger.info("Received interrupt signal")
        worker.stop()


if __name__ == "__main__":
    asyncio.run(main())
