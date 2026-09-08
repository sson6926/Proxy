import { Card, DataTable, Badge } from '../../../components/ui'
import { PageHeader } from '../../../layouts/components/PageHeader'

interface Worker {
  id: string
  name: string
  status: 'online' | 'offline' | 'maintenance'
  lastHeartbeat: string
  tasks: number
  cpu: number
  memory: number
}

const mockWorkers: Worker[] = [
  { id: '1', name: 'worker-1', status: 'online', lastHeartbeat: '2 minutes ago', tasks: 45, cpu: 65, memory: 42 },
  { id: '2', name: 'worker-2', status: 'online', lastHeartbeat: '30 seconds ago', tasks: 32, cpu: 28, memory: 35 },
  { id: '3', name: 'worker-3', status: 'maintenance', lastHeartbeat: '10 minutes ago', tasks: 0, cpu: 5, memory: 12 },
]

export function WorkersPage() {
  return (
    <div>
      <PageHeader 
        title="Workers" 
        description="Manage proxy workers"
      />

      <Card>
        <DataTable
          data={mockWorkers}
          columns={[
            { header: 'Worker', accessor: 'name' },
            { header: 'Status', accessor: (row) => (
              <Badge variant={row.status === 'online' ? 'success' : row.status === 'maintenance' ? 'warning' : 'error'}>
                {row.status}
              </Badge>
            )},
            { header: 'Last Heartbeat', accessor: 'lastHeartbeat' },
            { header: 'Tasks', accessor: 'tasks' },
            { header: 'CPU', accessor: (row) => `${row.cpu}%` },
            { header: 'Memory', accessor: (row) => `${row.memory}%` },
          ]}
        />
      </Card>
    </div>
  )
}
