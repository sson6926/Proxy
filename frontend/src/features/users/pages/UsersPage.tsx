import { Card, DataTable, Badge, Button } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useUsers, useDeleteUser } from '../hooks/useUsers'
import { useState } from 'react'

export function UsersPage() {
  const { data: users = [], isLoading } = useUsers()
  const deleteMutation = useDeleteUser()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <div>
      <PageHeader 
        title="Users" 
        description="Manage all users"
        action={<Button variant="primary">+ Add User</Button>}
      />

      <Card>
        <DataTable
          data={users}
          loading={isLoading}
          columns={[
            { header: 'Username', accessor: 'username' },
            { header: 'Email', accessor: 'email' },
            { header: 'Role', accessor: (row) => (
              <Badge variant={row.role === 'admin' ? 'warning' : 'default'}>
                {row.role}
              </Badge>
            )},
            { header: 'Status', accessor: (row) => (
              <Badge variant={
                row.status === 'active' ? 'success' : 
                row.status === 'suspended' ? 'error' : 'default'
              }>
                {row.status}
              </Badge>
            )},
            { 
              header: 'Actions', 
              accessor: (row) => (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">Edit</Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => deleteMutation.mutate(row.id)}
                    disabled={deleteMutation.isPending && selectedUser === row.id}
                  >
                    {deleteMutation.isPending && selectedUser === row.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              )
            },
          ]}
        />
      </Card>
    </div>
  )
}
