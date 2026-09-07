import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { keysAPI, plansAPI, proxyAPI } from '../../lib/api'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  
  const [apiKeys, setApiKeys] = useState([])
  const [plans, setPlans] = useState([])
  const [newKeyName, setNewKeyName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadData()
  }, [user, navigate])

  const loadData = async () => {
    try {
      const [keysRes, plansRes] = await Promise.all([
        keysAPI.list(),
        plansAPI.list()
      ])
      setApiKeys(keysRes.data)
      setPlans(plansRes.data)
    } catch (error) {
      console.error('Failed to load data:', error)
      toast.error('Failed to load dashboard data')
    }
  }

  const handleCreateKey = async (e) => {
    e.preventDefault()
    if (!newKeyName.trim()) return

    setIsLoading(true)
    try {
      const { data } = await keysAPI.create(newKeyName)
      setApiKeys([...apiKeys, data])
      setNewKeyName('')
      toast.success('API key created!')
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create key')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeKey = async (keyId) => {
    if (!confirm('Are you sure you want to revoke this key?')) return

    try {
      await keysAPI.revoke(keyId)
      setApiKeys(apiKeys.filter(k => k.id !== keyId))
      toast.success('API key revoked')
    } catch (error) {
      toast.error('Failed to revoke key')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.success('Logged out successfully')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <span className="font-bold text-xl">Proxy Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, <strong>{user.username}</strong></span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Keys Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">API Keys</h2>
            
            {/* Create new key */}
            <form onSubmit={handleCreateKey} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Key name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </form>

            {/* Keys list */}
            {apiKeys.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No API keys yet</p>
            ) : (
              <div className="space-y-2">
                {apiKeys.map((key) => (
                  <div key={key.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{key.name}</p>
                      <p className="text-sm text-gray-500 font-mono">{key.key_prefix}...</p>
                    </div>
                    <button
                      onClick={() => handleRevokeKey(key.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Plans Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">Subscription Plans</h2>
            
            {plans.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No plans available</p>
            ) : (
              <div className="space-y-2">
                {plans.map((plan) => (
                  <div key={plan.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-gray-500">{plan.proxy_limit} proxies/month</p>
                      </div>
                      <p className="font-bold text-blue-600">${plan.price}/mo</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
