export interface User {
  id: string
  email: string
  username: string
  fullName?: string
  role: 'user' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  lastLogin?: string
}

export interface CreateUserRequest {
  email: string
  username: string
  password: string
  fullName?: string
  role?: 'user' | 'admin'
}
