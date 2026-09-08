import { Card, Button } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function ProxyInventoryPage() {
  return (
    <div>
      <PageHeader 
        title="Proxy Inventory" 
        description="Manage your proxy pool"
        action={<Button variant="primary">+ Add Proxy</Button>}
      />
      
      <Card>
        <p className="text-gray-500">Proxy inventory management page</p>
      </Card>
    </div>
  )
}
