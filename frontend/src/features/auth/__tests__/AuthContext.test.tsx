import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '../context/AuthContext'

// Test Component
function TestComponent() {
  const { user, isLoading, login, logout } = useAuth()

  return (
    <div>
      <div data-testid="user-name">{user?.username || 'Not logged in'}</div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Ready'}</div>
      <button onClick={() => login({ email: 'test@example.com', password: 'password' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should provide auth context', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('user-name')).toHaveTextContent('Not logged in')
  })

  it('should handle login', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready')
    })
  })

  it('should handle logout', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    await user.click(logoutButton)

    expect(localStorage.getItem('authToken')).toBeNull()
  })

  it('should persist auth token', () => {
    const token = 'test-token'
    localStorage.setItem('authToken', token)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(localStorage.getItem('authToken')).toBe(token)
  })
})
