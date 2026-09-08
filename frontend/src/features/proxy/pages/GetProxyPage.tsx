import { Card, Button } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useProxies, useRequestProxy } from '../hooks/useProxies'
import { useState } from 'react'

export function GetProxyPage() {
  const [protocol, setProtocol] = useState('http')
  const [country, setCountry] = useState('')
  const [quantity, setQuantity] = useState(1)
  
  const requestProxyMutation = useRequestProxy()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    requestProxyMutation.mutate({
      protocol,
      country: country || undefined,
      quantity,
    })
  }

  return (
    <div>
      <PageHeader 
        title="Get Proxy" 
        description="Request a proxy from our pool"
      />
      
      <div className="max-w-2xl">
        <Card title="Request Proxy" description="Fill in the details to get a proxy">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proxy Type
              </label>
              <select 
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="http">HTTP</option>
                <option value="https">HTTPS</option>
                <option value="socks5">SOCKS5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input 
                type="text" 
                placeholder="e.g., US, UK, CA" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button 
              variant="primary" 
              className="w-full"
              disabled={requestProxyMutation.isPending}
            >
              {requestProxyMutation.isPending ? 'Requesting...' : 'Get Proxy'}
            </Button>
          </form>

          {requestProxyMutation.isSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">✅ Proxy request successful!</p>
            </div>
          )}

          {requestProxyMutation.isError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">❌ Error: Failed to request proxy</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
