export default function Orderstab({ orders = [], loading, onStatusChange }) {
  const safeOrders = Array.isArray(orders) ? orders : [];
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl text-xs">
      <h2 className="text-sm font-bold text-slate-100 mb-4">Active RFQs & Live Consignments ({orders?.length || 0})</h2>
      
      {loading ? (
        <p className="text-slate-500 py-8 text-center">Loading orders...</p>
      ) : safeOrders.length === 0 ? (
        <p className="text-slate-500 py-8 text-center">No incoming orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="p-3">Tracking ID</th>
                <th className="p-3">Client</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-teal-400">{o.trackingId}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-200">{o.fullname}</div>
                    <div className="text-[10px] text-slate-400">{o.organisationname}</div>
                  </td>
                  <td className="p-3 text-slate-300">{o.orderquanitity}</td>
                  <td className="p-3 text-slate-300">{o.location}</td>
                  <td className="p-3">
                    <span className="bg-teal-950 text-teal-400 border border-teal-800 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider inline-block">
                      {o.status || "Hattar Yard"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <select 
                      defaultValue={o.status || "Hattar Yard"}
                      onChange={(e) => onStatusChange(o.trackingId, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-1.5 text-xs focus:outline-teal-500 cursor-pointer"
                    >
                      <option value="Hattar Yard">Hattar Yard</option>
                      <option value="On the way">On the way</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}