import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_list_plans(client: AsyncClient):
    """Test list all plans"""
    response = await client.get("/api/plans")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

@pytest.mark.asyncio
async def test_get_plan_by_id(client: AsyncClient):
    """Test get plan by ID"""
    response = await client.get("/api/plans/1")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "slug" in data
