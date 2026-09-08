import { Card, DataTable } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'
import { useApiKeys, useCreateApiKey, useDeleteApiKey } from '../hooks/useApiKeys'
import { Button } from '../../../components/ui'
import { useState } from 'react'

export function UserApiKeysPage() {
  const { data: apiKeys = [], isLoading } = useApiKeys()
  const createMutation = useCreateApiKey()
  const deleteMutation = useDeleteApiKey()
  const [showForm, setShowForm] = useState(false)
  const [keyName, setKeyName] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyName) {
      createMutation.mutate({ name: keyName })
      setKeyName('')
      setShowForm(false)
    }
  }

  return (
    <div>
      <PageHeader 
        title="API Keys" 
        description="Manage your API keys"
        action={<Button onClick={() => setShowForm(!showForm)}>+ Create Key</Button>}
      />

      {showForm && (
        <Card className="mb-6" title="Create New API Key">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
              <input 
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g., Production API"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
        <DataTable
          data={apiKeys}
          loading={isLoading}
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Key', accessor: (row) => `${row.key.substring(0, 10)}...` },
            { header: 'Created', accessor: 'createdAt' },
            { 
              header: 'Action', 
              accessor: (row) => (
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => deleteMutation.mutate(row.id)}
                >
                  Delete
                </Button>
              )
            },
          ]}
        />
      </Card>
    </div>
  )
}
