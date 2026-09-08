import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function UserUsagePage() {
  return (
    <div>
      <PageHeader 
        title="Usage" 
        description="View your usage statistics"
      />
      
      <Card>
        <p className="text-gray-500">User usage page</p>
      </Card>
    </div>
  )
}
