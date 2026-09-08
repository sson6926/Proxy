import { test, expect } from '@playwright/test'

test.describe('Authentication E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show login page at /login', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Đăng nhập' })).toBeVisible()
  })

  test('should show register page at /register', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByRole('heading', { name: 'Đăng ký' })).toBeVisible()
  })

  test('should navigate to login from dashboard without auth', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/.*\/login.*/)
  })

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByLabel(/email/i).fill('admin@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()
    
    await expect(page).toHaveURL(/.*\/dashboard.*/)
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByLabel(/email/i).fill('wrong@example.com')
    await page.getByLabel(/password/i).fill('wrongpassword')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()
    
    await expect(page.getByText(/đăng nhập thất bại/i)).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('admin@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()
    
    await expect(page).toHaveURL(/.*\/dashboard.*/)
    
    await page.getByRole('button', { name: /logout/i }).click()
    await expect(page).toHaveURL(/.*\/login.*/)
  })
})

test.describe('Protected Routes E2E Tests', () => {
  test('should redirect to login when accessing protected route', async ({ page }) => {
    await page.goto('/api-keys')
    await expect(page).toHaveURL(/.*\/login.*/)
  })

  test('should access api-keys after login', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('admin@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()
    
    await page.goto('/api-keys')
    await expect(page).toHaveURL('/api-keys')
    await expect(page.getByRole('heading', { name: 'API Keys' })).toBeVisible()
  })
})
