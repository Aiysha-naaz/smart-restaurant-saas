// import { useEffect, useState } from "react";
// import { Search, Plus, Clock, Utensils } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { StatusBadge } from "@/components/StatusBadge";
// import axios from "axios";

// /* =========================
//    TYPES
// ========================= */
// type OrderStatus =
//   | "pending"
//   | "accepted"
//   | "preparing"
//   | "ready"
//   | "served"
//   | "completed"
//   | "cancelled";

// interface Order {
//   _id: string;
//   tableId: string;
//   items: {
//     name: string;
//     qty: number;
//   }[];
//   totalAmount: number;
//   status: OrderStatus;
//   createdAt: string;
// }

// /* =========================
//    STATUS → NEXT FLOW
// ========================= */
// const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
//   pending: "accepted",
//   accepted: "preparing",
//   preparing: "ready",
//   ready: "served",
//   served: "completed",
//   completed: null,
//   cancelled: null,
// };

// /* =========================
//    BADGE MAPPING
// ========================= */
// const getBadgeVariant = (status: OrderStatus) => {
//   switch (status) {
//     case "pending":
//       return "low";
//     case "accepted":
//       return "occupied";
//     case "preparing":
//       return "preparing";
//     case "ready":
//       return "ready";
//     case "served":
//       return "served";
//     case "completed":
//       return "available";
//     case "cancelled":
//       return "out";
//     default:
//       return "default";
//   }
// };

// /* =========================
//    FILTERS
// ========================= */
// const filters: (OrderStatus | "all")[] = [
//   "all",
//   "pending",
//   "preparing",
//   "ready",
//   "served",
//   "completed",
// ];

// /* =========================
//    COMPONENT
// ========================= */
// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [activeFilter, setActiveFilter] = useState<"all" | OrderStatus>("all");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const restaurantId = "69dd0315fdbaf1fc3e305eb7"; // your test id

//   /* =========================
//      FETCH ORDERS
//   ========================= */
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/orders/${restaurantId}`
//       );
//       setOrders(res.data);
//     } catch (err) {
//       console.error("FETCH ERROR", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   /* =========================
//      UPDATE STATUS
//   ========================= */
//   const updateStatus = async (id: string, current: OrderStatus) => {
//     const next = nextStatusMap[current];
//     if (!next) return;

//     try {
//       await axios.patch(
//         `http://localhost:5000/api/orders/status/${id}`,
//         {
//           status: next,
//           role: "manager", // change later based on role
//         }
//       );

//       fetchOrders(); // refresh UI
//     } catch (err) {
//       console.error("UPDATE ERROR", err);
//     }
//   };

//   /* =========================
//      FILTER LOGIC
//   ========================= */
//   const filtered = orders.filter((o) => {
//     const matchFilter = activeFilter === "all" || o.status === activeFilter;

//     const itemsText = o.items.map((i) => i.name).join(", ");

//     const matchSearch =
//       o._id.toLowerCase().includes(search.toLowerCase()) ||
//       itemsText.toLowerCase().includes(search.toLowerCase()) ||
//       o.tableId.toLowerCase().includes(search.toLowerCase());

//     return matchFilter && matchSearch;
//   });

//   /* =========================
//      LOADING
//   ========================= */
//   if (loading) {
//     return <div className="p-6">Loading orders...</div>;
//   }

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="p-6 space-y-6 min-h-screen bg-background">
//       {/* HEADER */}
//       <div className="flex justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Orders</h1>
//           <p className="text-sm text-muted-foreground">
//             Live kitchen, waiter & manager flow
//           </p>
//         </div>

//         <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl">
//           <Plus size={16} />
//           New Order
//         </button>
//       </div>

//       {/* SEARCH */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search orders, table, items..."
//           className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
//         />
//       </div>

//       {/* FILTERS */}
//       <div className="flex gap-2 flex-wrap">
//         {filters.map((f) => (
//           <button
//             key={f}
//             onClick={() => setActiveFilter(f)}
//             className={cn(
//               "px-3 py-1.5 rounded-full text-sm border",
//               activeFilter === f
//                 ? "bg-black text-white"
//                 : "bg-white hover:bg-muted"
//             )}
//           >
//             {f.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {filtered.map((o) => {
//           const itemsText = o.items.map((i) => i.name).join(", ");
//           const next = nextStatusMap[o.status];

//           return (
//             <div
//               key={o._id}
//               className="border rounded-2xl p-4 bg-card shadow-sm hover:shadow-md transition"
//             >
//               {/* TOP */}
//               <div className="flex justify-between">
//                 <div>
//                   <p className="font-semibold">
//                     {o._id.slice(-6).toUpperCase()}
//                   </p>
//                   <p className="text-xs text-muted-foreground flex gap-1">
//                     <Utensils size={12} />
//                     Table {o.tableId}
//                   </p>
//                 </div>

//                 <StatusBadge variant={getBadgeVariant(o.status)}>
//                   {o.status.toUpperCase()}
//                 </StatusBadge>
//               </div>

//               {/* ITEMS */}
//               <p className="text-sm text-muted-foreground mt-3">
//                 {itemsText}
//               </p>

//               {/* FOOTER */}
//               <div className="flex justify-between mt-4 text-sm">
//                 <div className="flex gap-1 text-muted-foreground">
//                   <Clock size={12} />
//                   {new Date(o.createdAt).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>

//                 <p className="font-semibold">₹{o.totalAmount}</p>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex gap-2 mt-4">
//                 <button className="flex-1 border rounded-lg py-2 text-sm">
//                   View
//                 </button>

//                 {next && (
//                   <button
//                     onClick={() => updateStatus(o._id, o.status)}
//                     className="flex-1 bg-black text-white rounded-lg py-2 text-sm"
//                   >
//                     {next.toUpperCase()}
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




///working

// import { useEffect, useState } from "react";
// import { Search, Plus, Clock, Utensils } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { StatusBadge } from "@/components/StatusBadge";
// import axios from "axios";

// /* =========================
//    TYPES
// ========================= */
// type OrderStatus =
//   | "pending"
//   | "accepted"
//   | "preparing"
//   | "ready"
//   | "served"
//   | "completed"
//   | "cancelled";

// type ViewType = "manager" | "kitchen" | "waiter";

// interface Order {
//   _id: string;
//   tableId: string;
//   items: {
//     name: string;
//     qty: number;
//   }[];
//   totalAmount: number;
//   status: OrderStatus;
//   createdAt: string;
// }

// /* =========================
//    STATUS FLOW
// ========================= */
// const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
//   pending: "accepted",
//   accepted: "preparing",
//   preparing: "ready",
//   ready: "served",
//   served: "completed",
//   completed: null,
//   cancelled: null,
// };

// /* =========================
//    BUTTON LABELS
// ========================= */
// const getActionLabel = (status: OrderStatus) => {
//   switch (status) {
//     case "pending":
//       return "ACCEPT";
//     case "accepted":
//       return "START PREPARING";
//     case "preparing":
//       return "MARK READY";
//     case "ready":
//       return "SERVE";
//     case "served":
//       return "COMPLETE";
//     default:
//       return "";
//   }
// };

// /* =========================
//    BADGE COLORS
// ========================= */
// const getBadgeVariant = (status: OrderStatus) => {
//   switch (status) {
//     case "pending":
//       return "low";
//     case "accepted":
//       return "occupied";
//     case "preparing":
//       return "preparing";
//     case "ready":
//       return "ready";
//     case "served":
//       return "served";
//     case "completed":
//       return "available";
//     case "cancelled":
//       return "out";
//     default:
//       return "default";
//   }
// };

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [view, setView] = useState<ViewType>("manager");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const restaurantId = "69dd0315fdbaf1fc3e305eb7";

//   /* =========================
//      FETCH ORDERS
//   ========================= */
//   const fetchOrders = async () => {
//     try {
//       console.log("📡 Fetching orders...");

//       const res = await axios.get(
//         `http://localhost:5000/api/orders/${restaurantId}`
//       );

//       console.log("📦 Orders received:", res.data);

//       setOrders(res.data);
//       console.log("✅ STATE UPDATED");
//     } catch (err) {
//       console.error("❌ FETCH ERROR", err);
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   useEffect(() => {
//   fetchOrders();
// }, []);

//   /* =========================
//      UPDATE STATUS (FIXED)
//   ========================= */
//   const updateStatus = async (id: string, current: OrderStatus) => {
//     const next = nextStatusMap[current];

//     console.log("----- STATUS UPDATE START -----");
//     console.log("Order ID:", id);
//     console.log("Current Status:", current);
//     console.log("Next Status:", next);

//     if (!next) {
//       console.warn("No next state available");
//       return;
//     }

//     // let role: "manager" | "kitchen" | "waiter";

//     // // ✅ CORRECT ROLE FLOW (FIXED)
//     // if (next === "accepted") {
//     //   role = "manager";
//     // } else if (["preparing", "ready"].includes(next)) {
//     //   role = "kitchen";
//     // } else if (["served", "completed"].includes(next)) {
//     //   role = "waiter";
//     // } else {
//     //   role = "manager";
//     // }
//     let role: "manager" | "kitchen" | "waiter";

// if (view === "kitchen") {
//   role = "kitchen";
// } else if (view === "waiter") {
//   role = "waiter";
// } else {
//   role = "manager";
// }

//     console.log("Role being sent:", role);

//     const payload = { status: next, role };

//     console.log("Request Payload:", payload);

//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/api/orders/status/${id}`,
//         payload
//       );

//       console.log("✅ SUCCESS RESPONSE:", res.data);

//       fetchOrders(); // refresh UI
//     } catch (err: any) {
//       console.error("❌ ERROR FULL:", err);

//       if (err.response) {
//         console.error("❌ BACKEND RESPONSE:", err.response.data);
//         console.error("❌ STATUS CODE:", err.response.status);
//       }

//       alert(
//         err.response?.data?.message ||
//           "Update failed (check console)"
//       );
//     }

//     console.log("----- STATUS UPDATE END -----");
//   };

//   /* =========================
//      SEARCH
//   ========================= */
//   const searched = orders.filter((o) => {
//     const itemsText = o.items.map((i) => i.name).join(", ");

//     return (
//       o._id.toLowerCase().includes(search.toLowerCase()) ||
//       itemsText.toLowerCase().includes(search.toLowerCase()) ||
//       o.tableId.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   /* =========================
//      VIEW FILTER
//   ========================= */
//   const filtered = searched.filter((o) => {
//     if (view === "kitchen") {
//       return ["pending", "accepted", "preparing"].includes(o.status);
//     }

//     if (view === "waiter") {
//       return ["ready", "served"].includes(o.status);
//     }

//     return true;
//   });

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Orders</h1>
//           <p className="text-sm text-muted-foreground">
//             Role-based live workflow
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <select
//             value={view}
//             onChange={(e) => setView(e.target.value as ViewType)}
//             className="border rounded-lg px-3 py-2 text-sm"
//           >
//             <option value="manager">Manager View</option>
//             <option value="kitchen">Kitchen View</option>
//             <option value="waiter">Waiter View</option>
//           </select>

//           <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
//             <Plus size={16} />
//             New Order
//           </button>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search orders..."
//           className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
//         />
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {filtered.map((o) => {
//           const itemsText = o.items.map((i) => i.name).join(", ");
//           const next = nextStatusMap[o.status];

//           return (
//             <div
//               key={o._id}
//               className="border rounded-2xl p-4 bg-card shadow-sm"
//             >
//               <div className="flex justify-between">
//                 <div>
//                   <p className="font-semibold">
//                     {o._id.slice(-6).toUpperCase()}
//                   </p>
//                   <p className="text-xs text-muted-foreground flex gap-1">
//                     <Utensils size={12} />
//                     Table {o.tableId}
//                   </p>
//                 </div>

//                 <StatusBadge variant={getBadgeVariant(o.status)}>
//                   {o.status.toUpperCase()}
//                 </StatusBadge>
//               </div>

//               <p className="text-sm text-muted-foreground mt-3">
//                 {itemsText}
//               </p>

//               <div className="flex justify-between mt-4 text-sm">
//                 <div className="flex gap-1 text-muted-foreground">
//                   <Clock size={12} />
//                   {new Date(o.createdAt).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>

//                 <p className="font-semibold">₹{o.totalAmount}</p>
//               </div>

//               <div className="flex gap-2 mt-4">
//                 <button className="flex-1 border rounded-lg py-2 text-sm">
//                   View
//                 </button>

//                 {/* KITCHEN */}
//                 {view === "kitchen" &&
//                   next &&
//                   ["pending", "accepted", "preparing"].includes(o.status) && (
//                     <button
//                       onClick={() => {
//                         console.log("🟡 CLICK:", o._id, o.status);
//                         updateStatus(o._id, o.status);
//                       }}
//                       className="flex-1 bg-black text-white rounded-lg py-2 text-sm"
//                     >
//                       {getActionLabel(o.status)}
//                     </button>
//                   )}

//                 {/* WAITER */}
//                 {view === "waiter" &&
//                   next &&
//                   ["ready", "served"].includes(o.status) && (
//                     <button
//                       onClick={() => updateStatus(o._id, o.status)}
//                       className="flex-1 bg-black text-white rounded-lg py-2 text-sm"
//                     >
//                       {getActionLabel(o.status)}
//                     </button>
//                   )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { Search, Plus, Clock, Utensils } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import api from "@/lib/api";

/* =========================
   TYPES
========================= */
type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "served"
  | "completed"
  | "cancelled";

type ViewType = "manager" | "kitchen" | "waiter";

interface Order {
  _id: string;
  tableId: string;
  items: { name: string; qty: number }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

/* =========================
   FLOW
========================= */
const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
  pending: "accepted",
  accepted: "preparing",
  preparing: "ready",
  ready: "served",
  served: "completed",
  completed: null,
  cancelled: null,
};

const getActionLabel = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "ACCEPT";
    case "accepted":
      return "START";
    case "preparing":
      return "READY";
    case "ready":
      return "SERVE";
    case "served":
      return "COMPLETE";
    default:
      return "";
  }
};

const getBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "low";
    case "accepted":
      return "occupied";
    case "preparing":
      return "preparing";
    case "ready":
      return "ready";
    case "served":
      return "served";
    case "completed":
      return "available";
    default:
      return "default";
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<ViewType>("manager");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  // const restaurantId = "69dd0315fdbaf1fc3e305eb7";
  const user = JSON.parse(localStorage.getItem("user") || "{}");
const restaurantId = user.restaurantId;

  /* =========================
     FETCH
  ========================= */
  const fetchOrders = async () => {
    try {
      const res = await api.get(`/orders/${restaurantId}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =========================
     UPDATE
  ========================= */
  const updateStatus = async (id: string, current: OrderStatus) => {
    const next = nextStatusMap[current];
    if (!next) return;

    let role: "manager" | "kitchen" | "waiter";

    if (view === "kitchen") role = "kitchen";
    else if (view === "waiter") role = "waiter";
    else role = "manager";

    try {
      await api.patch(`/orders/status/${id}`, { status: next, role });
      fetchOrders();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Update failed");
    }
  };

  /* =========================
     SEARCH
  ========================= */
  const searched = orders.filter((o) => {
    const text = o.items.map((i) => i.name).join(", ");
    return (
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      text.toLowerCase().includes(search.toLowerCase()) ||
      o.tableId.toLowerCase().includes(search.toLowerCase())
    );
  });

  /* =========================
     DOWNLOAD CSV
  ========================= */
  const downloadCSV = () => {
    const headers = ["OrderID", "Table", "Items", "Amount", "Status", "Time"];

    const rows = orders.map((o) => [
      o._id,
      o.tableId,
      o.items.map((i) => i.name).join(", "),
      o.totalAmount,
      o.status,
      new Date(o.createdAt).toLocaleString(),
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "orders.csv";
    link.click();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  /* =========================
     KITCHEN BOARD (🔥 BEST PART)
  ========================= */
  if (view === "kitchen") {
    const pending = searched.filter((o) => o.status === "pending");
    const accepted = searched.filter((o) => o.status === "accepted");
    const preparing = searched.filter((o) => o.status === "preparing");

    const Column = (title: string, data: Order[]) => (
      <div className="flex-1 bg-muted/40 p-3 rounded-xl space-y-3">
        <h2 className="font-semibold">{title}</h2>

        {data.map((o) => (
          <div key={o._id} className="bg-white p-3 rounded-xl shadow">
            <p className="font-semibold">{o._id.slice(-6)}</p>
            <p className="text-xs text-gray-500">Table {o.tableId}</p>

            <p className="text-sm mt-2">
              {o.items.map((i) => i.name).join(", ")}
            </p>

            <button
              onClick={() => updateStatus(o._id, o.status)}
              className="mt-3 w-full bg-black text-white py-1 rounded"
            >
              {getActionLabel(o.status)}
            </button>
          </div>
        ))}
      </div>
    );

    return (
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold">Kitchen Board</h1>

          <select
            value={view}
            onChange={(e) => setView(e.target.value as ViewType)}
            className="border px-3 py-2 rounded"
          >
            <option value="manager">Manager</option>
            <option value="kitchen">Kitchen</option>
            <option value="waiter">Waiter</option>
          </select>
        </div>

        <div className="flex gap-4">
          {Column("New Orders", pending)}
          {Column("Accepted", accepted)}
          {Column("Preparing", preparing)}
        </div>
      </div>
    );
  }

  /* =========================
     NORMAL (MANAGER + WAITER)
  ========================= */
  const filtered = searched.filter((o) => {
    if (view === "waiter") return ["ready", "served"].includes(o.status);

    if (view === "manager") {
      if (showCompleted) return true;
      return ["pending", "accepted", "preparing", "ready", "served"].includes(
        o.status
      );
    }

    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
        </div>

        <div className="flex gap-2">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as ViewType)}
            className="border px-3 py-2 rounded"
          >
            <option value="manager">Manager</option>
            <option value="kitchen">Kitchen</option>
            <option value="waiter">Waiter</option>
          </select>

          <button onClick={downloadCSV} className="border px-3 py-2 rounded">
            Download
          </button>

          {view === "manager" && (
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="border px-3 py-2 rounded"
            >
              {showCompleted ? "Hide Completed" : "Show Completed"}
            </button>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded"
          placeholder="Search..."
        />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((o) => {
          const next = nextStatusMap[o.status];

          return (
            <div key={o._id} className="border p-4 rounded-xl bg-white">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    {o._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Table {o.tableId}
                  </p>
                </div>

                <StatusBadge variant={getBadgeVariant(o.status)}>
                  {o.status}
                </StatusBadge>
              </div>

              <p className="text-sm mt-2">
                {o.items.map((i) => i.name).join(", ")}
              </p>

              <div className="flex justify-between mt-3 text-sm">
                <span>
                  <Clock size={12} />
                </span>
                ₹{o.totalAmount}
              </div>

              {/* ACTION */}
              {view !== "manager" && next && (
                <button
                  onClick={() => updateStatus(o._id, o.status)}
                  className="mt-3 w-full bg-black text-white py-2 rounded"
                >
                  {getActionLabel(o.status)}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}