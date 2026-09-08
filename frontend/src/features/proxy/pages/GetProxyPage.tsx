import { Card, Button } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function GetProxyPage() {
  return (
    <div>
      <PageHeader 
        title="Get Proxy" 
        description="Request a proxy from our pool"
      />
      
      <div className="max-w-2xl">
        <Card title="Request Proxy" description="Fill in the details to get a proxy">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proxy Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>HTTP</option>
                <option>HTTPS</option>
                <option>SOCKS5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input 
                type="text" 
                placeholder="e.g., US, UK, CA" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input 
                type="number" 
                defaultValue={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button variant="primary" className="w-full">
              Get Proxy
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
