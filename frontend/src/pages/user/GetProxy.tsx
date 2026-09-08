import { TopNav } from '../../components/layout/Common'
import { Card, Button } from '../../components/ui'

export default function GetProxy() {
  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Get Proxy" />
      
      <main className="flex-1 p-8">
        <Card className="max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Request a Proxy</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Protocol</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>HTTP</option>
                <option>HTTPS</option>
                <option>SOCKS4</option>
                <option>SOCKS5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Countries</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anonymity Level</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Elite</option>
                <option>Anonymous</option>
                <option>Transparent</option>
              </select>
            </div>

            <Button className="w-full mt-6">Get Random Proxy</Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
