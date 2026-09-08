export default function ApiKeys() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">API Keys</h1>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Generate New Key
      </button>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Key</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">Default</td>
              <td className="p-4 font-mono">••••••••</td>
              <td className="p-4">2024-01-01</td>
              <td className="p-4">
                <button className="text-red-500 hover:text-red-700">Revoke</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
