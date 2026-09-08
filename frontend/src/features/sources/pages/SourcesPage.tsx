import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function SourcesPage() {
  return (
    <div>
      <PageHeader 
        title="Sources" 
        description="Manage proxy sources"
      />
      
      <Card>
        <p className="text-gray-500">Sources management page</p>
      </Card>
    </div>
  )
}
