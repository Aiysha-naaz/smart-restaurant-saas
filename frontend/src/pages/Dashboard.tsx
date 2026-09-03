import { useEffect, useState } from "react";
import axios from "axios";

// Icons (same minimal ones)
const UsersIcon = ({ className }: any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const FireIcon = ({ className }: any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13c0 3.866-2.5 7.206-5.632 8.281zM13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const TrendingUpIcon = ({ className }: any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ClockIcon = ({ className }: any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PercentIcon = ({ className }: any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2z" />
  </svg>
);

const AlertIcon = ({ className }: any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default function ProKpiDashboard() {
  const [data, setData] = useState<any>(null);
  const restaurantId = "69dd0315fdbaf1fc3e305eb7";

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/kpis/${restaurantId}`).then(res => setData(res.data));
  }, []);

  if (!data) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Smart Restaurant Dashboard
          </h1>
          <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full font-medium">Live</span>
        </div>

        {/* Main KPIs - Matches your API exactly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard title="Orders Today" value={data.orders?.today || 0} icon={<UsersIcon className="h-5 w-5 text-blue-500" />} color="blue" />
          <KpiCard title="Revenue" value={`₹${data.revenue?.today?.toLocaleString() || 0}`} icon={<FireIcon className="h-5 w-5 text-emerald-500" />} color="emerald" />
          <KpiCard title="Growth" value={data.revenue?.growth || "0%"} icon={<TrendingUpIcon className="h-5 w-5 text-purple-500" />} color="purple" />
          <KpiCard title="Peak Hour" value={`${data.peakHour || 0}:00`} icon={<ClockIcon className="h-5 w-5 text-orange-500" />} color="orange" />
        </div>

        {/* Secondary - Matches your API */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard title="Occupancy" value={data.tables?.occupancy || "0%"} icon={<PercentIcon className="h-5 w-5 text-indigo-500" />} color="indigo" />
          <KpiCard title="Health" value={`${data.healthScore || 0}/100`} icon={<TrendingUpIcon className="h-5 w-5 text-emerald-500" />} color="emerald" />
          <KpiCard title="Low Stock" value={data.inventory?.lowStock || 0} icon={<AlertIcon className="h-5 w-5 text-amber-500" />} color="amber" />
          <KpiCard title="Critical" value={data.inventory?.critical || 0} icon={<FireIcon className="h-5 w-5 text-red-500" />} color="red" />
        </div>

        {/* Insights - Direct from your API */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard title="Most Sold" item={data.insights?.mostSold} />
          <InsightCard title="Least Sold" item={data.insights?.leastSold} />
        </div>

        {/* Top Orders - Add this to your backend! */}
        {/* <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FireIcon className="h-5 w-5 text-emerald-500 mr-2" />
              Top Orders Today
            </h3>
            <p className="text-xs text-gray-500 mt-1">Add `topOrders` array to your API response</p>
          </div>
          <div className="p-8 text-center">
            <AlertIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Table ready - send `topOrders` from backend!</p>
          </div>
        </div> */}
        {/* Top Orders Table - HARDCODE TEST */}
<div className="bg-white rounded-xl shadow-sm border">
  <div className="px-6 py-4 border-b border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
      <FireIcon className="h-5 w-5 text-emerald-500 mr-2" />
      Top Orders Today
    </h3>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.topOrders?.map((order: any, idx: number) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{order.item}</td>
            <td className="px-6 py-4 text-sm text-right font-semibold text-emerald-600">{order.qty}</td>
            <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{order.revenue}</td>
          </tr>
        )) || (
          <tr>
            <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color }: any) {
  const colors = {
    blue: 'bg-blue-100 hover:bg-blue-50',
    emerald: 'bg-emerald-100 hover:bg-emerald-50',
    purple: 'bg-purple-100 hover:bg-purple-50',
    orange: 'bg-orange-100 hover:bg-orange-50',
    indigo: 'bg-indigo-100 hover:bg-indigo-50',
    amber: 'bg-amber-100 hover:bg-amber-50',
    red: 'bg-red-100 hover:bg-red-50'
  };

  return (
    <div className={`bg-white border rounded-xl p-4 hover:shadow-md transition-all ${colors[color] || 'hover:bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-white rounded-lg shadow-sm border">{icon}</div>
      </div>
      <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function InsightCard({ title, item }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow hover:bg-gray-50">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        <p className="text-xl font-bold text-gray-900">{item?.name || "N/A"}</p>
        <p className="text-sm text-gray-500">Qty: {item?.qty || 0}</p>
      </div>
    </div>
  );
}