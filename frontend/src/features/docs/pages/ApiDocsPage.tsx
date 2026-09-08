import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function ApiDocsPage() {
  return (
    <div>
      <PageHeader 
        title="API Documentation" 
        description="API reference and examples"
      />
      
      <Card title="Getting Started" description="Proxy Platform API documentation">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Authentication</h3>
            <p className="text-sm text-gray-600">
              All API requests require an API key in the Authorization header.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Base URL</h3>
            <code className="block px-3 py-2 bg-gray-100 text-sm font-mono rounded">
              https://api.proxyplatform.com/v1
            </code>
          </div>
        </div>
      </Card>
    </div>
  )
}
