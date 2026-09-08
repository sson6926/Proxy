export default function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Users</h1>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Proxies</h1>
          <p className="text-3xl font-bold">8,567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Requests Today</h1>
          <p className="text-3xl font-bold">12.5k</p>
        </div>
      </div>
    </div>
  )
}
