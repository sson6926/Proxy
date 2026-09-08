import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthState } from '../types/auth.types'
import { authApi } from '../api/auth.api'

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const user = await authApi.getCurrentUser()
          setState({
            user,
            token,
            isAuthenticated: true,
          })
        } catch (error) {
          localStorage.removeItem('token')
          setState({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password })
    localStorage.setItem('token', response.access_token)
    setState({
      user: response.user,
      token: response.access_token,
      isAuthenticated: true,
    })
  }

  const register = async (email: string, username: string, password: string) => {
    const response = await authApi.register({
      email,
      username,
      password,
      confirmPassword: password,
    })
    localStorage.setItem('token', response.access_token)
    setState({
      user: response.user,
      token: response.access_token,
      isAuthenticated: true,
    })
  }

  const logout = async () => {
    await authApi.logout()
    localStorage.removeItem('token')
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
