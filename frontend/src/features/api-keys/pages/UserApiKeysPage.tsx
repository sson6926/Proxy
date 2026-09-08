import { Card, DataTable, Badge, Button } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useApiKeys, useDeleteApiKey } from '../hooks/useApiKeys'
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog'
import { EmptyTableState } from '../../../components/ui/EmptyState'
import { useState } from 'react'

export function UserApiKeysPage() {
  const { data: apiKeys = [], isLoading } = useApiKeys()
  const deleteMutation = useDeleteApiKey()
  const [showForm, setShowForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null)
  const [keyName, setKeyName] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyName) {
      // createMutation.mutate({ name: keyName })
      setKeyName('')
      setShowForm(false)
    }
  }

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="API Keys" 
        description="Manage your API keys"
        action={<Button onClick={() => setShowForm(!showForm)}>+ Create Key</Button>}
      />

      {showForm && (
        <Card title="Create New API Key" description="Generate a new API key for your applications">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
              <input 
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g., Production API"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary">Create</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : apiKeys.length > 0 ? (
          <DataTable
            data={apiKeys}
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Key', accessor: (row) => `${row.key.substring(0, 10)}...` },
              { header: 'Created', accessor: 'createdAt' },
              { header: 'Last Used', accessor: (row) => row.lastUsed || 'Never' },
              { 
                header: 'Action', 
                accessor: (row) => (
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => setDeleteConfirm({ id: row.id, name: row.name })}
                  >
                    Delete
                  </Button>
                )
              },
            ]}
          />
        ) : (
          <EmptyTableState
            title="No API keys"
            description="Create your first API key to get started"
            icon="🔑"
            action={<Button onClick={() => setShowForm(true)}>Create Key</Button>}
          />
        )}
      </Card>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete API Key"
        description={`Are you sure you want to delete the API key "${deleteConfirm?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  )
}
