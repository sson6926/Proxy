import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function AdminUsagePage() {
  return (
    <div>
      <PageHeader 
        title="Usage" 
        description="View all usage statistics"
      />
      
      <Card>
        <p className="text-gray-500">Admin usage page</p>
      </Card>
    </div>
  )
}
