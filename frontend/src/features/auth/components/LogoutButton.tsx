import { useAuth } from '../context/AuthContext'
import { Button } from '../../../components/ui'
import { useState } from 'react'

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LogoutButton({ variant = 'secondary', size = 'sm', className }: LogoutButtonProps) {
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Đang logout...' : 'Đăng xuất'}
    </Button>
  )
}
