import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { Card } from '../ui/Card'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

interface UsageChartProps {
  data: ChartData[]
  title?: string
  loading?: boolean
}

export function UsageLineChart({ data, title, loading }: UsageChartProps) {
  if (loading) {
    return (
      <Card title={title}>
        <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
      </Card>
    )
  }

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function UsageBarChart({ data, title, loading }: UsageChartProps) {
  if (loading) {
    return (
      <Card title={title}>
        <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
      </Card>
    )
  }

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function UsageAreaChart({ data, title, loading }: UsageChartProps) {
  if (loading) {
    return (
      <Card title={title}>
        <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
      </Card>
    )
  }

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function UsagePieChart({ data, title, loading }: UsageChartProps) {
  if (loading) {
    return (
      <Card title={title}>
        <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
      </Card>
    )
  }

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name}: ${entry.value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function MultiLineChart({ data, title, lines, loading }: { data: ChartData[]; title?: string; lines: string[]; loading?: boolean }) {
  if (loading) {
    return (
      <Card title={title}>
        <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
      </Card>
    )
  }

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {lines.map((line, index) => (
            <Line key={line} type="monotone" dataKey={line} stroke={COLORS[index]} strokeWidth={2} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
