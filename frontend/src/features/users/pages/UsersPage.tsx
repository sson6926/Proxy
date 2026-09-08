import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function UsersPage() {
  return (
    <div>
      <PageHeader 
        title="Users" 
        description="Manage all users"
      />
      
      <Card>
        <p className="text-gray-500">Users management page</p>
      </Card>
    </div>
  )
}
