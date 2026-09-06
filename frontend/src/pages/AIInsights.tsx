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
import api from "@/lib/api";

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
   api
  .get("/trends/market-trends")
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