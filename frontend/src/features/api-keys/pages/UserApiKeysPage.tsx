import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function UserApiKeysPage() {
  return (
    <div>
      <PageHeader 
        title="API Keys" 
        description="Manage your API keys"
      />
      
      <Card>
        <p className="text-gray-500">API keys management page</p>
      </Card>
    </div>
  )
}
