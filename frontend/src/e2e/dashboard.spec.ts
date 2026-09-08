import { test, expect } from '@playwright/test'

test.describe('Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('admin@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()
  })

  test('should display dashboard page', async ({ page }) => {
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('should display stats cards', async ({ page }) => {
    await expect(page.getByText('Total Proxies')).toBeVisible()
    await expect(page.getByText('Active Proxies')).toBeVisible()
    await expect(page.getByText('Total Requests')).toBeVisible()
    await expect(page.getByText('Avg Response')).toBeVisible()
  })

  test('should display charts', async ({ page }) => {
    await expect(page.getByText('Weekly Requests')).toBeVisible()
    await expect(page.getByText('Daily Usage')).toBeVisible()
  })

  test('should display recent activity', async ({ page }) => {
    await expect(page.getByText('Recent Activity')).toBeVisible()
  })
})

test.describe('Usage Page E2E Tests', () => {
  test('should display usage statistics', async ({ page }) => {
    await page.goto('/usage')
    await expect(page).toHaveURL('/usage')
    await expect(page.getByRole('heading', { name: 'Usage' })).toBeVisible()
  })

  test('should display usage chart', async ({ page }) => {
    await expect(page.getByText('Usage Trend')).toBeVisible()
  })

  test('should display quota progress', async ({ page }) => {
    await expect(page.getByText('Quota Usage')).toBeVisible()
  })
})

test.describe('Proxy Explorer E2E Tests', () => {
  test('should display proxy list', async ({ page }) => {
    await page.goto('/proxy')
    await expect(page).toHaveURL('/proxy')
    await expect(page.getByRole('heading', { name: 'Proxy Explorer' })).toBeVisible()
  })

  test('should have filter controls', async ({ page }) => {
    await expect(page.getByLabel('Protocol')).toBeVisible()
    await expect(page.getByLabel('Country')).toBeVisible()
  })

  test('should display empty state when no proxies', async ({ page }) => {
    await expect(page.getByText('No proxies found')).toBeVisible()
  })
})

test.describe('API Keys Page E2E Tests', () => {
  test('should display API keys table', async ({ page }) => {
    await page.goto('/api-keys')
    await expect(page.getByRole('heading', { name: 'API Keys' })).toBeVisible()
  })

  test('should display create key button', async ({ page }) => {
    await expect(page.getByRole('button', { name: '+ Create Key' })).toBeVisible()
  })
})
