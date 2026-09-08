import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function WorkersPage() {
  return (
    <div>
      <PageHeader 
        title="Workers" 
        description="Manage proxy workers"
      />
      
      <Card>
        <p className="text-gray-500">Workers management page</p>
      </Card>
    </div>
  )
}
