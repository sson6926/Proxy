import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  email: string
  username: string
  is_active: boolean
  created_at: string
}

interface AuthState {
  user: User | null
  token: string | null
  apiKey: string | null
  setAuth: (user: User, token: string) => void
  setApiKey: (apiKey: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      apiKey: null,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token)
        }
        set({ user, token })
      },
      setApiKey: (apiKey) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('api_key', apiKey)
        }
        set({ apiKey })
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          localStorage.removeItem('api_key')
        }
        set({ user: null, token: null, apiKey: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
