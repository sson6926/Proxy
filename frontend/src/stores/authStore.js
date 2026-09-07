import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      apiKey: null,
      setAuth: (user, token) => {
        localStorage.setItem('token', token)
        set({ user, token })
      },
      setApiKey: (apiKey) => {
        localStorage.setItem('api_key', apiKey)
        set({ apiKey })
      },
      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('api_key')
        set({ user: null, token: null, apiKey: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
