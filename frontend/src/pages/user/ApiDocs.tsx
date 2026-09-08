export default function ApiDocs() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Base URL</h2>
        <code className="block bg-gray-100 p-2 rounded font-mono mb-4">https://api.proxyplatform.com/v1</code>
        <h2 className="text-xl font-semibold mb-2">Authentication</h2>
        <p>Use your API key in the Authorization header:</p>
        <code className="block bg-gray-100 p-2 rounded font-mono mt-2">Authorization: Bearer YOUR_API_KEY</code>
      </div>
    </div>
  )
}
