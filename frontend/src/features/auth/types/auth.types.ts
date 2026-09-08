export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface User {
  id: string
  email: string
  username: string
  role: 'user' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
