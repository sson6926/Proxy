import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_proxies_empty(client: AsyncClient):
    """Test get proxies when no proxies available"""
    response = await client.get("/api/proxies")
    assert response.status_code == 200
    data = response.json()
    assert "proxies" in data
    assert "total" in data

@pytest.mark.asyncio
async def test_get_proxies_with_filters(client: AsyncClient):
    """Test get proxies with protocol filter"""
    response = await client.get("/api/proxies?protocol=http&country=US")
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_random_proxy(client: AsyncClient):
    """Test get random proxy"""
    response = await client.get("/api/proxies/random")
    assert response.status_code == 200
    data = response.json()
    # May be empty if no proxies available
    if "proxy" in data:
        assert "ip" in data
        assert "port" in data
