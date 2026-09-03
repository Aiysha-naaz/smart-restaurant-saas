// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center">
//       <h1 className="text-3xl font-bold mb-4">Smart Restaurant</h1>
//       <p className="mb-6 text-muted-foreground">
//         Manage your restaurant easily 🍽️
//       </p>

//       <div className="flex gap-4">
//         <Link to="/login" className="px-4 py-2 bg-primary text-white rounded">
//           Login
//         </Link>

//         <Link to="/register" className="px-4 py-2 border rounded">
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// }



import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 text-foreground">
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="px-4 py-1 rounded-full border text-sm text-muted-foreground mb-6">
          🍽️ Smart Restaurant Management System
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
          Stop managing chaos.  
          <span className="text-primary block">Manage your restaurant.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          Take control of orders, inventory, staff, and profits — all from one dashboard, no spreadsheets, no stress.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:scale-105 transition whitespace-nowrap font-medium"
          >
            Start Your Free Trial
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 border rounded-xl hover:bg-muted transition whitespace-nowrap"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Micro‑story section */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-3">How it works for your restaurant</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            From your first order to your next big decision — everything flows through one system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-4 border rounded-lg bg-card">
            <div className="text-2xl mb-2">1️⃣</div>
            <h3 className="font-semibold mb-1">Setup in minutes</h3>
            <p className="text-muted-foreground">
              Register once, add your menu & inventory, and get a unique Restaurant ID.
            </p>
          </div>

          <div className="text-center p-4 border rounded-lg bg-card">
            <div className="text-2xl mb-2">2️⃣</div>
            <h3 className="font-semibold mb-1">QR‑based ordering</h3>
            <p className="text-muted-foreground">
              Each table gets a QR code; customers scan, order, and pay seamlessly.
            </p>
          </div>

          <div className="text-center p-4 border rounded-lg bg-card">
            <div className="text-2xl mb-2">3️⃣</div>
            <h3 className="font-semibold mb-1">Kitchen & staff flow</h3>
            <p className="text-muted-foreground">
              Orders land instantly, cooks mark “Ready”, waiters get notified, tables are served.
            </p>
          </div>

          <div className="text-center p-4 border rounded-lg bg-card">
            <div className="text-2xl mb-2">4️⃣</div>
            <h3 className="font-semibold mb-1">AI that thinks like you</h3>
            <p className="text-muted-foreground">
              Profit reports, top‑sellers, and trend‑based suggestions — all updated in real‑time.
            </p>
          </div>
        </div>
      </div>

      {/* Features cards */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 pb-24">
        <div className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">📦 Smart Order Management</h3>
          <p className="text-sm text-muted-foreground">
            Track dine‑in and online orders, auto‑deduct inventory, and see real‑time profit per order.
          </p>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">📊 Real‑Time Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Profit & loss, top‑sellers, and trends — updated live for daily and weekly decisions.
          </p>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">👨‍🍳 Staff & Table Control</h3>
          <p className="text-sm text-muted-foreground">
            Assign roles, track table tasks, and get instant alerts when food is ready.
          </p>
        </div>
      </div>

      {/* Free vs Paid banner */}
      <div className="max-w-4xl mx-auto px-6 pb-10">
        <div className="bg-muted/60 border rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Free vs Pro experience</h3>
          <p className="text-sm text-muted-foreground mb-1">
            Free plan: Basic orders, manual inventory, and simple tracking.
          </p>
          <p className="text-sm text-muted-foreground">
            Pro plan: AI recommendations, table alerts, advanced analytics, and multi‑restaurant support.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground pb-8">
        © {new Date().getFullYear()} Smart Restaurant. Built for modern restaurants.
      </div>
    </div>
  );
}