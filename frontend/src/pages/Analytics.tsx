import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState("week");
  const restaurantId = "69dd0315fdbaf1fc3e305eb7";

 useEffect(() => {
  axios.get(`http://localhost:5000/api/orders/analytics/${restaurantId}?range=${range}`)
    .then(res => {
      console.log("✅ LOADED:", res.data);
      setData(res.data);
    })
    .catch(err => console.error("❌ ERROR:", err.response?.status));
}, [range]);

  if (!data) return <div className="p-6 text-gray-600">Loading...</div>;

  // Transform backend data for charts
  const dailyRevenueData = Object.entries(data.charts?.weeklyMap || {}).map(([day, revenue]: any) => ({
    date: day, revenue: Number(revenue)
  }));

  const ordersByHourData = Object.entries(data.charts?.hourlyMap || {}).map(([hour, orders]: any) => ({
    hour: `${hour}PM`, orders: Number(orders)
  }));

  const topItemsPie = data.topItems?.slice(0, 5).map((item: any) => ({
    name: item.name,
    value: item.qty
  })) || [];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">📊 Analytics ({data.range})</h1>
        <p className="text-sm text-gray-600 mt-1">Real performance metrics from your orders.</p>
      </div>

      {/* Daily Revenue Line Chart - REAL WEEKLY DATA */}
      <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Weekly Revenue ({data.range})</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Hour - REAL DATA */}
        <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Orders by Hour ({data.range})</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersByHourData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Items Pie - REAL DATA */}
        <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Top Items ({data.range})</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie 
                data={topItemsPie} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={90}
                label={({ name, percent }) => `${name.slice(0,10)}`}
              >
                {topItemsPie.map((_: any, i: number) => (
                  <Cell key={i} fill={["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}