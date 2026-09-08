export default function ProxyExplorer() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Proxy Explorer</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">HTTP Proxies</div>
        <div className="bg-white p-4 rounded shadow">HTTPS Proxies</div>
      </div>
    </div>
  )
}
