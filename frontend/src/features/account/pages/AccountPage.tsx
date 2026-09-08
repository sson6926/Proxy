import { Card } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

export function AccountPage() {
  return (
    <div>
      <PageHeader 
        title="Account" 
        description="Manage your account settings"
      />
      
      <Card>
        <p className="text-gray-500">Account settings page</p>
      </Card>
    </div>
  )
}
