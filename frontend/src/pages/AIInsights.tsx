// import { useEffect, useState } from "react";
// import { TrendingUp, Flame, Percent } from "lucide-react";
// import axios from "axios";

// export default function AIInsights() {
//   const [data, setData] = useState<any>(null);
//   const [range, setRange] = useState("week");
//   const restaurantId = "69dd0315fdbaf1fc3e305eb7";
// useEffect(() => {
//   axios.get(`http://localhost:5000/api/orders/analytics/${restaurantId}?range=${range}`)
//     .then(res => {
//       console.log("✅ LOADED:", res.data);
//       setData(res.data);
//     })
//     .catch(err => console.error("❌ ERROR:", err.response?.status));
// }, [range]);
//   if (!data) return <div className="p-6 text-gray-600">Loading...</div>;

//   return (
//     <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
//       <div>
//         <h1 className="text-2xl font-semibold tracking-tight">🤖 AI Insights</h1>
//         <p className="text-sm text-gray-600 mt-1">Smart recommendations powered by your real data.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Selling - REAL DATA */}
//         <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm">
//           <div className="flex items-center gap-2 mb-4">
//             <TrendingUp className="h-5 w-5 text-blue-500" />
//             <h3 className="text-lg font-semibold">Top Selling Items ({data.range})</h3>
//           </div>
//           <div className="space-y-3">
//             {data.topItems?.map((item: any, i: number) => (
//               <div key={i} className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
//                     {i + 1}
//                   </span>
//                   <span className="text-sm font-semibold">{item.name}</span>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-gray-900">₹{item.revenue?.toLocaleString()}</p>
//                   <p className="text-xs text-gray-500">{item.qty} orders</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Trending + Category Chart */}
//         <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm">
//           <div className="flex items-center gap-2 mb-4">
//             <Flame className="h-5 w-5 text-orange-500" />
//             <h3 className="text-lg font-semibold">AI Signals ({data.range})</h3>
//           </div>
          
//           {/* Trending Item */}
//           {data.aiSignals?.trendingItem && (
//             <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-semibold text-emerald-800">🔥 Trending: {data.aiSignals.trendingItem.name}</span>
//                 <span className="text-sm font-semibold text-emerald-600">Qty: {data.aiSignals.trendingItem.qty}</span>
//               </div>
//             </div>
//           )}

//           {/* Peak Hour */}
//           <div className="grid grid-cols-2 gap-4 text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <div>
//               <p className="text-xs text-gray-500 uppercase font-medium">Peak Hour</p>
//               <p className="text-lg font-bold text-blue-900">{data.aiSignals?.peakHour}:00</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 uppercase font-medium">Cancelled</p>
//               <p className="text-lg font-bold text-red-600">{data.cancelledOrders || 0}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Promotions */}
//       <div className="rounded-xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-6">
//           <Percent className="h-5 w-5 text-emerald-500" />
//           <h3 className="text-lg font-semibold">AI Recommendations</h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <PromotionCard title="Peak Hour Focus" desc={`Push ${data.aiSignals?.trendingItem?.name || 'popular items'} at ${data.aiSignals?.peakHour}:00`} impact="+25% sales" />
//           <PromotionCard title="Reduce Waste" desc="Low performing items need menu review" impact="-15% costs" />
//           <PromotionCard title="Happy Hour" desc={`Afternoon slow? Promote ${data.range === 'week' ? 'weekday' : 'weekend'} specials`} impact="+₹10K/week" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function PromotionCard({ title, desc, impact }: any) {
//   return (
//     <div className="p-4 border rounded-lg hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50">
//       <h4 className="font-semibold text-sm mb-2">{title}</h4>
//       <p className="text-xs text-gray-600 mb-3 leading-relaxed">{desc}</p>
//       <p className="text-xs font-bold text-emerald-600">{impact}</p>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { 
//   TrendingUp, Flame, Sparkles, Zap, 
//   ArrowUpRight, Clock, Ban, ChevronRight 
// } from "lucide-react";
// import { 
//   AreaChart, Area, ResponsiveContainer, Tooltip, XAxis 
// } from 'recharts';
// import { motion } from "framer-motion";
// import axios from "axios";

// // Mock trend data for the chart - in production, get this from 'data'
// const trendData = [
//   { day: 'Mon', sales: 400 }, { day: 'Tue', sales: 300 },
//   { day: 'Wed', sales: 600 }, { day: 'Thu', sales: 800 },
//   { day: 'Fri', sales: 500 }, { day: 'Sat', sales: 900 },
//   { day: 'Sun', sales: 1100 },
// ];

// export default function AIInsights() {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     // Replace with your actual endpoint
//     axios.get(`http://localhost:5000/api/orders/analytics/69dd0315fdbaf1fc3e305eb7?range=week`)
//       .then((res) => setData(res.data))
//       .catch(() => setData({ // Fallback for demo
//         topItems: [{name: "Kunafa Cheesecake", qty: 142}, {name: "Pistachio Latte", qty: 98}],
//         aiSignals: { trendingItem: { name: "Kunafa" }, peakHour: 19 },
//         cancelledOrders: 4,
//         healthScore: 88
//       }));
//   }, []);

//   if (!data) return (
//     <div className="flex h-screen items-center justify-center bg-slate-50">
//       <div className="animate-pulse flex flex-col items-center gap-4">
//         <div className="h-12 w-12 rounded-full bg-indigo-200 animate-bounce" />
//         <p className="text-slate-400 font-medium">Analyzing Insights...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
//       <div className="max-w-7xl mx-auto space-y-8">
        
//         {/* --- HEADER --- */}
//         <header className="flex justify-between items-end">
//           <div>
//             <div className="flex items-center gap-2 text-indigo-600 mb-1">
//               <Sparkles className="h-4 w-4 fill-indigo-600" />
//               <span className="text-xs font-bold uppercase tracking-widest">Intelligence Suite</span>
//             </div>
//             <h1 className="text-3xl font-bold tracking-tight text-slate-900">Restaurant Health</h1>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-slate-400 font-medium">Last updated: Just now</p>
//           </div>
//         </header>

//         {/* --- HERO SECTION --- */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           className="relative overflow-hidden p-8 rounded-3xl bg-slate-900 text-white shadow-2xl shadow-indigo-200/50"
//         >
//           <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-4">
//                 <Flame className="h-3 w-3 text-orange-400" /> Viral Opportunity
//               </div>
//               <h2 className="text-3xl font-semibold leading-tight">
//                 Your <span className="text-indigo-400">Kunafa Desserts</span> are seeing 40% higher engagement.
//               </h2>
//               <p className="text-slate-400 mt-4 max-w-md">
//                 Social sentiment is peaking for middle-eastern fusion. Consider a "Limited Time" banner on your digital menu.
//               </p>
//               <button className="mt-8 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 transition-colors rounded-xl font-medium flex items-center gap-2">
//                 Apply Smart Pricing <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//             <div className="h-48 w-full bg-white/5 rounded-2xl p-4 border border-white/10">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={trendData}>
//                   <defs>
//                     <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
//                   <Area type="monotone" dataKey="sales" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//           {/* Decorative background blur */}
//           <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-indigo-500/20 rounded-full blur-3xl" />
//         </motion.div>

//         {/* --- MAIN GRID --- */}
//         <div className="grid grid-cols-12 gap-6">
          
//           {/* Left Column: Top Items */}
//           <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
//             <div className="flex justify-between items-center mb-6">
//               <div className="flex items-center gap-2">
//                 <div className="p-2 bg-blue-50 rounded-lg">
//                   <TrendingUp className="h-5 w-5 text-blue-600" />
//                 </div>
//                 <h3 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Performance Leaders</h3>
//               </div>
//               <button className="text-sm font-semibold text-indigo-600 hover:underline">View All</button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {data.topItems?.map((item: any, i: number) => (
//                 <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all">
//                   <div className="flex items-center gap-4">
//                     <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
//                       {i + 1}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-700">{item.name}</p>
//                       <p className="text-xs text-slate-400">{item.qty} units sold</p>
//                     </div>
//                   </div>
//                   <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: AI Metrics */}
//           <div className="col-span-12 lg:col-span-4 space-y-6">
            
//             {/* Quick Signals */}
//             <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
//               <h3 className="font-bold text-slate-800 uppercase text-xs tracking-wider mb-6">Live Signals</h3>
//               <div className="space-y-6">
//                 <div className="flex gap-4">
//                   <div className="h-10 w-10 flex-shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
//                     <Clock className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-500">Peak Demand</p>
//                     <p className="text-lg font-bold text-slate-800">{data.aiSignals?.peakHour}:00 PM</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="h-10 w-10 flex-shrink-0 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
//                     <Ban className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-500">Cancellation Rate</p>
//                     <p className="text-lg font-bold text-slate-800">{data.cancelledOrders || 0}% <span className="text-xs font-normal text-green-500 ml-1">↓ 2%</span></p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Score Card */}
//             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-indigo-100 text-sm font-medium">Efficiency Score</p>
//                   <h4 className="text-4xl font-bold mt-1">{data.healthScore || 82}%</h4>
//                 </div>
//                 <Zap className="h-8 w-8 text-indigo-200 opacity-50" />
//               </div>
//               <div className="mt-6 h-2 w-full bg-white/20 rounded-full overflow-hidden">
//                 <div className="h-full bg-white rounded-full" style={{ width: `${data.healthScore || 82}%` }} />
//               </div>
//               <p className="mt-3 text-xs text-indigo-100 italic">Top 15% of restaurants in your area</p>
//             </div>
//           </div>
//         </div>

//         {/* --- STRATEGY CARDS --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StrategyCard 
//             icon={<Sparkles className="h-5 w-5" />} 
//             title="Viral Trend" 
//             desc="Merge Cheesecake & Kunafa into a single combo."
//             theme="indigo"
//           />
//           <StrategyCard 
//             icon={<Zap className="h-5 w-5" />} 
//             title="Optimization" 
//             desc="Remove low-performing sides to reduce waste."
//             theme="orange"
//           />
//           <StrategyCard 
//             icon={<TrendingUp className="h-5 w-5" />} 
//             title="Growth" 
//             desc="Lunch-time upsell for beverages is underperforming."
//             theme="emerald"
//           />
//         </div>

//       </div>
//     </div>
//   );
// }

// function StrategyCard({ title, desc, icon, theme }: any) {
//   const themes: any = {
//     indigo: "bg-white border-slate-100 hover:border-indigo-200 text-indigo-600",
//     orange: "bg-white border-slate-100 hover:border-orange-200 text-orange-600",
//     emerald: "bg-white border-slate-100 hover:border-emerald-200 text-emerald-600",
//   };

//   return (
//     <div className={`p-6 rounded-3xl border transition-all hover:shadow-lg cursor-default group ${themes[theme]}`}>
//       <div className="mb-4">{icon}</div>
//       <h3 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
//       <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import {
  TrendingUp,
  Flame,
  Sparkles,
  Zap,
  ArrowUpRight,
  Clock,
  Ban,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

// Mock chart data (can later come from backend too)
const trendData = [
  { day: "Mon", sales: 400 },
  { day: "Tue", sales: 300 },
  { day: "Wed", sales: 600 },
  { day: "Thu", sales: 800 },
  { day: "Fri", sales: 500 },
  { day: "Sat", sales: 900 },
  { day: "Sun", sales: 1100 },
];

export default function AIInsights() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trends/market-trends")
      .then((res) => setData(res.data))
      .catch(() =>
        setData({
          trends: [
            {
              name: "Mango Cheesecake Jar",
              reason: "Summer mango dessert trend booming in India",
              action: "Launch as limited-time dessert",
            },
            {
              name: "Loaded Cold Coffee Float",
              reason: "Cold beverages going viral on social media",
              action: "Promote as combo drink",
            },
          ],
        })
      );
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-indigo-200 animate-bounce" />
          <p className="text-slate-400 font-medium">
            AI analyzing market trends...
          </p>
        </div>
      </div>
    );
  }

  const topTrend = data?.trends?.[0];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <Sparkles className="h-4 w-4 fill-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Intelligence Suite
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Restaurant AI Insights
            </h1>
          </div>
          <p className="text-sm text-slate-400">Live Market Intelligence</p>
        </header>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden p-8 rounded-3xl bg-slate-900 text-white shadow-xl"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs mb-4">
                <Flame className="h-3 w-3 text-orange-400" />
                Viral Opportunity Detected
              </div>

              <h2 className="text-3xl font-semibold leading-tight">
                Your{" "}
                <span className="text-indigo-400">
                  {topTrend?.name || "Trending Item"}
                </span>{" "}
                is going viral 🔥
              </h2>

              <p className="text-slate-400 mt-4 max-w-md">
                {topTrend?.reason || "Analyzing global food market trends..."}
              </p>

              <button className="mt-8 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 transition rounded-xl font-medium flex items-center gap-2">
                {topTrend?.action || "Apply AI Suggestion"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* RIGHT - CHART */}
            <div className="h-48 w-full bg-white/5 rounded-2xl p-4 border border-white/10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#818cf8"
                    fill="url(#sales)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
        </motion.div>

        {/* STRATEGY CARDS (AI OUTPUT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.trends?.map((item: any, i: number) => (
            <StrategyCard
              key={i}
              icon={<Sparkles className="h-5 w-5" />}
              title={item.name}
              desc={item.reason}
              theme="indigo"
            />
          ))}
        </div>

      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function StrategyCard({ title, desc, icon, theme }: any) {
  return (
    <div className="p-6 rounded-3xl border bg-white hover:shadow-lg transition">
      <div className="mb-3 text-indigo-600">{icon}</div>
      <h3 className="font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
  );
}