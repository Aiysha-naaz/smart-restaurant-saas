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