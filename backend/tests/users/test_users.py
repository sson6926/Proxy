import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_me_unauthorized(client: AsyncClient):
    """Test get me without auth token"""
    response = await client.get("/api/users/me")
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_update_me(client: AsyncClient):
    """Test update user profile"""
    # This test requires auth
    # In real implementation, you would first login and get token
    response = await client.put("/api/users/me", json={"full_name": "Updated Name"})
    # Should return 401 without auth
    assert response.status_code == 401
