import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function ProxyHealthPage() {
  return (
    <div>
      <PageHeader 
        title="Proxy Health" 
        description="Monitor proxy performance and health status"
      />
      
      <Card>
        <p className="text-gray-500">Proxy health monitoring page</p>
      </Card>
    </div>
  )
}
