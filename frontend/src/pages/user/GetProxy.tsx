export default function GetProxy() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Get Proxy</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Protocol</label>
          <select className="w-full p-3 border rounded">
            <option>HTTP</option>
            <option>HTTPS</option>
            <option>SOCKS4</option>
            <option>SOCKS5</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <select className="w-full p-3 border rounded">
            <option>All Countries</option>
            <option>US</option>
            <option>UK</option>
            <option>DE</option>
          </select>
        </div>
        <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
          Get Random Proxy
        </button>
      </div>
    </div>
  )
}
