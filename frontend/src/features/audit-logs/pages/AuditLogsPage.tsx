import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function AuditLogsPage() {
  return (
    <div>
      <PageHeader 
        title="Audit Logs" 
        description="View system audit logs"
      />
      
      <Card>
        <p className="text-gray-500">Audit logs page</p>
      </Card>
    </div>
  )
}
