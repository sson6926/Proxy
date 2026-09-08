import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function AdminApiKeysPage() {
  return (
    <div>
      <PageHeader 
        title="API Keys" 
        description="Manage all API keys"
      />
      
      <Card>
        <p className="text-gray-500">Admin API keys management page</p>
      </Card>
    </div>
  )
}
