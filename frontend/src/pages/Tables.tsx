// import { useEffect, useState } from "react";
// import axios from "axios";
// import { StatusBadge } from "@/components/StatusBadge";
// import { QrCode, Eye, Check } from "lucide-react";

// /* =========================
//    TYPES
// ========================= */
// type TableStatus = "available" | "occupied" | "cleaning";

// interface Table {
//   _id: string;
//   tableId: string; // "T1"
//   status: TableStatus;
//   guests?: number;
// }

// /* =========================
//    COMPONENT
// ========================= */
// export default function Tables() {
//   const [tables, setTables] = useState<Table[]>([]);
//   const [loading, setLoading] = useState(true);

//   const restaurantId = "69dd0315fdbaf1fc3e305eb7";

//   /* =========================
//      FETCH TABLES
//   ========================= */
//   const fetchTables = async () => {
//     try {
//       console.log("📡 Fetching tables...");

//       const res = await axios.get(
//         `http://localhost:5000/api/tables/${restaurantId}`
//       );

//       console.log("📦 Tables:", res.data);

//       setTables(res.data);
//     } catch (err) {
//       console.error("❌ TABLE FETCH ERROR", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTables();
//   }, []);

//   /* =========================
//      MARK CLEANED
//   ========================= */
//   const markClean = async (id: string) => {
//     try {
//       console.log("🧹 Marking cleaned:", id);

//       await axios.patch(
//         `http://localhost:5000/api/tables/${id}/clean`
//       );

//       fetchTables();
//     } catch (err) {
//       console.error("❌ CLEAN ERROR", err);
//     }
//   };

//   /* =========================
//      HELPERS
//   ========================= */
//   const getLabel = (status: TableStatus) => {
//     switch (status) {
//       case "available":
//         return "Available";
//       case "occupied":
//         return "Occupied";
//       case "cleaning":
//         return "Cleaning Required";
//     }
//   };

//   /* =========================
//      LOADING
//   ========================= */
//   if (loading) return <div className="p-6">Loading tables...</div>;

//   /* =========================
//      SUMMARY
//   ========================= */
//   const available = tables.filter((t) => t.status === "available").length;
//   const occupied = tables.filter((t) => t.status === "occupied").length;
//   const cleaning = tables.filter((t) => t.status === "cleaning").length;

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="space-y-6 p-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-semibold">Tables</h1>
//         <p className="text-sm text-muted-foreground">
//           Manage table status and QR codes
//         </p>
//       </div>

//       {/* SUMMARY */}
//       <div className="flex gap-6 text-sm">
//         <span>
//           Available:{" "}
//           <span className="font-semibold text-green-600">
//             {available}
//           </span>
//         </span>

//         <span>
//           Occupied:{" "}
//           <span className="font-semibold text-blue-600">
//             {occupied}
//           </span>
//         </span>

//         <span>
//           Cleaning:{" "}
//           <span className="font-semibold text-yellow-600">
//             {cleaning}
//           </span>
//         </span>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

//         {tables.map((table) => (
//           <div
//             key={table._id}
//             className="rounded-xl border bg-card p-4 text-center hover:shadow-md transition"
//           >
//             {/* TABLE NUMBER */}
//             <p className="text-lg font-semibold">
//               {table.tableId}
//             </p>

//             {/* STATUS */}
//             <div className="mt-2">
//               <StatusBadge variant={table.status}>
//                 {getLabel(table.status)}
//               </StatusBadge>
//             </div>

//             {/* GUESTS */}
//             {table.status === "occupied" && (
//               <p className="text-xs text-muted-foreground mt-2">
//                 {table.guests || 0} guests
//               </p>
//             )}

//             {/* ACTIONS */}
//             <div className="mt-3 flex justify-center gap-2">

//               {/* VIEW */}
//               <button className="p-1.5 hover:bg-muted rounded">
//                 <Eye className="h-4 w-4 text-muted-foreground" />
//               </button>

//               {/* QR */}
//               <button className="p-1.5 hover:bg-muted rounded">
//                 <QrCode className="h-4 w-4 text-muted-foreground" />
//               </button>

//               {/* CLEAN BUTTON */}
//               {table.status === "cleaning" && (
//                 <button
//                   onClick={() => markClean(table._id)}
//                   className="p-1.5 bg-black text-white rounded"
//                   title="Mark Cleaned"
//                 >
//                   <Check className="h-4 w-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }








// import { useEffect, useState } from "react";
// import axios from "axios";
// import { StatusBadge } from "@/components/StatusBadge";
// import { QrCode, Eye } from "lucide-react";

// /* =========================
//    TYPES
// ========================= */
// type TableStatus = "available" | "occupied" | "cleaning";

// interface Table {
//   _id: string;
//   tableId: string;
//   status: TableStatus;
//   guests?: number;
// }

// /* =========================
//    COMPONENT
// ========================= */
// export default function Tables() {
//   const [tables, setTables] = useState<Table[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");
//   const [creating, setCreating] = useState(false);

//   const restaurantId = "69dd0315fdbaf1fc3e305eb7";

//   /* =========================
//      FETCH TABLES
//   ========================= */
//   const fetchTables = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/tables/${restaurantId}`
//       );
//       setTables(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTables();
//   }, []);

//   /* =========================
//      CREATE TABLE
//   ========================= */
//   const createTable = async () => {
//     if (!tableNumber) return;

//     try {
//       setCreating(true);

//       await axios.post(
//         `http://localhost:5000/api/tables/${restaurantId}`,
//         {
//           number: Number(tableNumber),
//         }
//       );

//       setTableNumber("");
//       setShowAddModal(false);
//       fetchTables();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setCreating(false);
//     }
//   };

//   /* =========================
//      MARK CLEANED
//   ========================= */
//   const markClean = async (id: string) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/tables/${id}/clean`
//       );

//       fetchTables();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* =========================
//      LABELS
//   ========================= */
//   const getLabel = (status: TableStatus) => {
//     switch (status) {
//       case "available":
//         return "Available";
//       case "occupied":
//         return "Occupied";
//       case "cleaning":
//         return "Need Cleaning";
//     }
//   };

//   /* =========================
//      LOADING
//   ========================= */
//   if (loading) return <div className="p-6">Loading tables...</div>;

//   /* =========================
//      COUNTS
//   ========================= */
//   const available = tables.filter(t => t.status === "available").length;
//   const occupied = tables.filter(t => t.status === "occupied").length;
//   const cleaning = tables.filter(t => t.status === "cleaning").length;

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="space-y-6 p-6">

//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Tables</h1>
//           <p className="text-sm text-muted-foreground">
//             Manage table status and QR codes
//           </p>
//         </div>

//         <button
//           onClick={() => setShowAddModal(true)}
//           className="px-4 py-2 bg-black text-white rounded-lg text-sm"
//         >
//           + Add Table
//         </button>
//       </div>

//       {/* SUMMARY */}
//       <div className="flex gap-6 text-sm">
//         <span>Available: <b className="text-green-600">{available}</b></span>
//         <span>Occupied: <b className="text-blue-600">{occupied}</b></span>
//         <span>Cleaning: <b className="text-red-600">{cleaning}</b></span>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

//         {tables.map(table => (
//           <div
//             key={table._id}
//             className="rounded-xl border p-4 text-center hover:shadow"
//           >

//             {/* TABLE ID */}
//             <p className="text-lg font-semibold">
//               {table.tableId}
//             </p>

//             {/* STATUS */}
//             <div className="mt-2">
//               <StatusBadge variant={table.status}>
//                 {getLabel(table.status)}
//               </StatusBadge>
//             </div>

//             {/* GUESTS */}
//             {table.status === "occupied" && (
//               <p className="text-xs text-muted-foreground mt-2">
//                 {table.guests || 0} guests
//               </p>
//             )}

//             {/* CLEANING MESSAGE */}
//             {table.status === "cleaning" && (
//               <p className="text-[11px] text-red-500 mt-1">
//                 Waiting for cleaning
//               </p>
//             )}

//             {/* ACTIONS */}
//             <div className="mt-3 flex justify-center gap-2">

//               <button className="p-1.5 hover:bg-muted rounded">
//                 <Eye className="h-4 w-4 text-muted-foreground" />
//               </button>

//               <button className="p-1.5 hover:bg-muted rounded">
//                 <QrCode className="h-4 w-4 text-muted-foreground" />
//               </button>

//               {/* ONLY FOR CLEANING */}
//               {table.status === "cleaning" && (
//                 <button
//                   onClick={() => markClean(table._id)}
//                   className="px-2 py-1 bg-green-600 text-white text-xs rounded"
//                 >
//                   Mark Cleaned
//                 </button>
//               )}

//             </div>
//           </div>
//         ))}

//       </div>

//       {/* ADD TABLE MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-[300px] space-y-4">

//             <h2 className="text-lg font-semibold">Add Table</h2>

//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Table number"
//               className="w-full border p-2 rounded"
//             />

//             <div className="flex justify-end gap-2">
//               <button onClick={() => setShowAddModal(false)}>
//                 Cancel
//               </button>

//               <button
//                 onClick={createTable}
//                 disabled={creating}
//                 className="bg-black text-white px-3 py-1 rounded"
//               >
//                 {creating ? "Adding..." : "Add"}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { StatusBadge } from "@/components/StatusBadge";
import { QrCode, Eye } from "lucide-react";

/* =========================
   TYPES
========================= */
type TableStatus = "available" | "occupied" | "cleaning";

interface Table {
  _id: string;
  tableId: string;
  status: TableStatus;
  guests?: number;
}

/* =========================
   COMPONENT
========================= */
export default function Tables() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [creating, setCreating] = useState(false);

  const restaurantId = "69dd0315fdbaf1fc3e305eb7";

  /* =========================
     FETCH TABLES
  ========================= */
  const fetchTables = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tables/${restaurantId}`
      );
      setTables(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  /* =========================
     CREATE TABLE
  ========================= */
  const createTable = async () => {
    if (!tableNumber) return;

    try {
      setCreating(true);

      await axios.post(
        `http://localhost:5000/api/tables/${restaurantId}`,
        {
          number: Number(tableNumber),
        }
      );

      setTableNumber("");
      setShowAddModal(false);
      fetchTables();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  /* =========================
     MARK CLEANED
  ========================= */
  const markClean = async (id: string) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tables/${id}/clean`
      );

      fetchTables();
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     LABELS
  ========================= */
  const getLabel = (status: TableStatus) => {
    switch (status) {
      case "available":
        return "Available";
      case "occupied":
        return "Occupied";
      case "cleaning":
        return "Need Cleaning";
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) return <div className="p-6">Loading tables...</div>;

  /* =========================
     COUNTS
  ========================= */
  const available = tables.filter(t => t.status === "available").length;
  const occupied = tables.filter(t => t.status === "occupied").length;
  const cleaning = tables.filter(t => t.status === "cleaning").length;

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tables</h1>
          <p className="text-sm text-muted-foreground">
            Manage table status and QR codes
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm"
        >
          + Add Table
        </button>
      </div>

      {/* SUMMARY */}
      <div className="flex gap-6 text-sm">
        <span>Available: <b className="text-green-600">{available}</b></span>
        <span>Occupied: <b className="text-blue-600">{occupied}</b></span>
        <span>Cleaning: <b className="text-red-600">{cleaning}</b></span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

        {tables.map(table => (
          <div
            key={table._id}
            className="rounded-xl border p-4 text-center hover:shadow"
          >

            {/* TABLE ID */}
            <p className="text-lg font-semibold">
              {table.tableId}
            </p>

            {/* STATUS */}
            <div className="mt-2">
              <StatusBadge variant={table.status}>
                {getLabel(table.status)}
              </StatusBadge>
            </div>

            {/* GUESTS */}
            {table.status === "occupied" && (
              <p className="text-xs text-muted-foreground mt-2">
                {table.guests || 0} guests
              </p>
            )}

            {/* CLEANING MESSAGE */}
            {table.status === "cleaning" && (
              <p className="text-[11px] text-red-500 mt-1">
                Waiting for cleaning
              </p>
            )}

            {/* ACTIONS */}
            <div className="mt-3 flex justify-center gap-2">

              <button className="p-1.5 hover:bg-muted rounded">
                <Eye className="h-4 w-4 text-muted-foreground" />
              </button>

              <button className="p-1.5 hover:bg-muted rounded">
                <QrCode className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* CLEANING ACTION (IMPROVED UI) */}
              {table.status === "cleaning" && (
                <button
                  onClick={() => markClean(table._id)}
                  className="w-full mt-2 py-1.5 text-xs font-medium rounded-lg 
                             bg-emerald-50 text-emerald-700 border border-emerald-200 
                             hover:bg-emerald-100 transition"
                >
                  ✓ Mark as Ready
                </button>
              )}

            </div>
          </div>
        ))}

      </div>

      {/* ADD TABLE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[300px] space-y-4">

            <h2 className="text-lg font-semibold">Add Table</h2>

            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Table number"
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)}>
                Cancel
              </button>

              <button
                onClick={createTable}
                disabled={creating}
                className="bg-black text-white px-3 py-1 rounded"
              >
                {creating ? "Adding..." : "Add"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}