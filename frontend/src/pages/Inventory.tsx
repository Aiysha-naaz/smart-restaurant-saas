// import { useState } from "react";
// import { StatusBadge } from "@/components/StatusBadge";
// import { Plus, ScanLine, Search } from "lucide-react";

// const inventory = [
//   { name: "Tomatoes", quantity: 45, unit: "kg", cost: "₹120/kg", status: "healthy" as const },
//   { name: "Chicken Breast", quantity: 12, unit: "kg", cost: "₹320/kg", status: "low" as const },
//   { name: "Olive Oil", quantity: 8, unit: "bottles", cost: "₹450/bottle", status: "healthy" as const },
//   { name: "Mozzarella Cheese", quantity: 3, unit: "kg", cost: "₹680/kg", status: "low" as const },
//   { name: "Salmon Fillet", quantity: 0, unit: "kg", cost: "₹1,200/kg", status: "out" as const },
//   { name: "Basmati Rice", quantity: 25, unit: "kg", cost: "₹90/kg", status: "healthy" as const },
//   { name: "Fresh Basil", quantity: 2, unit: "bunches", cost: "₹40/bunch", status: "low" as const },
//   { name: "Soy Sauce", quantity: 15, unit: "bottles", cost: "₹180/bottle", status: "healthy" as const },
//   { name: "Butter", quantity: 0, unit: "kg", cost: "₹520/kg", status: "out" as const },
//   { name: "Onions", quantity: 30, unit: "kg", cost: "₹35/kg", status: "healthy" as const },
// ];

// const statusLabels = { healthy: "Healthy", low: "Low Stock", out: "Out of Stock" };

// export default function Inventory() {
//   const [search, setSearch] = useState("");
//   const filtered = inventory.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
//           <p className="text-sm text-muted-foreground mt-1">Track and manage your stock levels.</p>
//         </div>
//         <div className="flex gap-3">
//           <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
//             <ScanLine className="h-4 w-4" /> Scan Inventory
//           </button>
//           <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
//             <Plus className="h-4 w-4" /> Add Item
//           </button>
//         </div>
//       </div>

//       <div className="relative max-w-sm">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search inventory..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         />
//       </div>

//       <div className="rounded-xl border border-border bg-card overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-border text-left">
//               <th className="px-6 py-3 font-medium text-muted-foreground">Item Name</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Quantity</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Unit</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Cost</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Stock Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((item) => (
//               <tr key={item.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
//                 <td className="px-6 py-3 font-medium">{item.name}</td>
//                 <td className="px-6 py-3">{item.quantity}</td>
//                 <td className="px-6 py-3 text-muted-foreground">{item.unit}</td>
//                 <td className="px-6 py-3">{item.cost}</td>
//                 <td className="px-6 py-3">
//                   <StatusBadge variant={item.status}>{statusLabels[item.status]}</StatusBadge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }







// import { useState, useEffect } from "react";
// import { Plus, ScanLine, Search } from "lucide-react";

// export default function Inventory() {
//   const [search, setSearch] = useState("");
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔥 Fetch inventory from backend
//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch("http://localhost:5000/api/inventory", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setInventory(data.data);
//         } else {
//           console.error(data.message);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, []);

//   // 🔍 Search filter
//   const filtered = inventory.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // ⏳ Loading state
//   if (loading) {
//     return <div className="p-6">Loading inventory...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Track and manage your stock levels.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
//             <ScanLine className="h-4 w-4" /> Scan Inventory
//           </button>

//           <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
//             <Plus className="h-4 w-4" /> Add Item
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-sm">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search inventory..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border border-border bg-card overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-border text-left">
//               <th className="px-6 py-3 font-medium text-muted-foreground">Item Name</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Quantity</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Unit</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Cost</th>
//               <th className="px-6 py-3 font-medium text-muted-foreground">Stock Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.length > 0 ? (
//               filtered.map((item) => (
//                 <tr
//                   key={item._id}
//                   className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
//                 >
//                   <td className="px-6 py-3 font-medium">{item.name}</td>
//                   <td className="px-6 py-3">{item.quantity}</td>
//                   <td className="px-6 py-3 text-muted-foreground">{item.unit}</td>

//                   {/* ✅ Real cost from backend */}
//                   <td className="px-6 py-3">
//                     ₹{item.costPerUnit}/{item.unit}
//                   </td>

//                   {/* ⏳ Status (we'll upgrade later) */}
//                   <td className="px-6 py-3 text-muted-foreground">
//                     --
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//   <td colSpan={5} className="text-center py-6 text-muted-foreground">
//     No items found
//   </td>
// </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }























//working

// import { useState, useEffect } from "react";
// import { Plus, ScanLine, Search } from "lucide-react";

// export default function Inventory() {
//   const [search, setSearch] = useState("");
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Modal state
//   const [showModal, setShowModal] = useState(false);

//   // ✅ Form state
//   const [form, setForm] = useState({
//     name: "",
//     quantity: "",
//     unit: "",
//     costPerUnit: "",
//     threshold: ""
//   });

//   // 🔥 Fetch inventory
//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch("http://localhost:5000/api/inventory", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setInventory(data.data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, []);

//   // 🔥 Add item
//   const handleAddItem = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/inventory", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: form.name,
//           quantity: Number(form.quantity),
//           unit: form.unit,
//           costPerUnit: Number(form.costPerUnit),
//           threshold: Number(form.threshold),
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ✅ instant UI update
//         setInventory((prev) => [...prev, data.data]);

//         // clear form
//         setForm({
//           name: "",
//           quantity: "",
//           unit: "",
//           costPerUnit: "",
//           threshold: ""
//         });

//         setShowModal(false); // close modal
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔍 Search
//   const filtered = inventory.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) {
//     return <div className="p-6">Loading inventory...</div>;
//   }

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Track and manage your stock levels.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
//             <ScanLine className="h-4 w-4" /> Scan Inventory
//           </button>

//           {/* ✅ OPEN MODAL */}
//           <button
//             onClick={() => setShowModal(true)}
//             className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
//           >
//             <Plus className="h-4 w-4" /> Add Item
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-sm">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search inventory..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border border-border bg-card overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-border text-left">
//               <th className="px-6 py-3">Item Name</th>
//               <th className="px-6 py-3">Quantity</th>
//               <th className="px-6 py-3">Unit</th>
//               <th className="px-6 py-3">Cost</th>
//               <th className="px-6 py-3">Stock Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.length > 0 ? (
//               filtered.map((item) => (
//                 <tr key={item._id} className="border-b hover:bg-muted/50">
//                   <td className="px-6 py-3 font-medium">{item.name}</td>
//                   <td className="px-6 py-3">{item.quantity}</td>
//                   <td className="px-6 py-3">{item.unit}</td>
//                   <td className="px-6 py-3">
//                     ₹{item.costPerUnit}/{item.unit}
//                   </td>
//                   <td className="px-6 py-3 text-muted-foreground">--</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-6 text-muted-foreground">
//                   No items found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

//             <h2 className="text-lg font-semibold">Add Inventory Item</h2>

//             <input placeholder="Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full border p-2 rounded" />

//             <input placeholder="Quantity"
//               value={form.quantity}
//               onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//               className="w-full border p-2 rounded" />

//             <select
//   value={form.unit}
//   onChange={(e) => setForm({ ...form, unit: e.target.value })}
//   className="w-full border p-2 rounded"
// >
//   <option value="">Select Unit</option>

//   {/* Weight */}
//   <option value="kg">Kilogram (kg)</option>
//   <option value="g">Gram (g)</option>

//   {/* Liquid */}
//   <option value="liters">Litres (L)</option>
//   <option value="ml">Millilitres (ml)</option>

//   {/* Countable */}
//   <option value="pieces">Pieces</option>
//   <option value="bottles">Bottles</option>
//   <option value="packets">Packets</option>
// </select>

//             <input placeholder="Cost per unit"
//               value={form.costPerUnit}
//               onChange={(e) => setForm({ ...form, costPerUnit: e.target.value })}
//               className="w-full border p-2 rounded" />

//             <input placeholder="Threshold"
//               value={form.threshold}
//               onChange={(e) => setForm({ ...form, threshold: e.target.value })}
//               className="w-full border p-2 rounded" />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleAddItem}
//                 className="px-4 py-2 bg-black text-white rounded"
//               >
//                 Save
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// addedd status

// import { useState, useEffect } from "react";
// import { Plus, ScanLine, Search } from "lucide-react";

// export default function Inventory() {
//   const [search, setSearch] = useState("");
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     quantity: "",
//     unit: "",
//     costPerUnit: "",
//     threshold: ""
//   });

//   // 🔥 STATUS LOGIC
//   const getStatus = (item) => {
//     if (item.quantity === 0) return "out";
//     if (item.quantity <= item.threshold) return "low";
//     return "healthy";
//   };

//   // 🚨 ALERT ITEMS
//   const lowStockItems = inventory.filter(
//     (item) => item.quantity <= item.threshold
//   );

//   // 🔥 Fetch inventory
//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch("http://localhost:5000/api/inventory", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setInventory(data.data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, []);

//   // 🔥 Add item
//   const handleAddItem = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/inventory", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: form.name,
//           quantity: Number(form.quantity),
//           unit: form.unit,
//           costPerUnit: Number(form.costPerUnit),
//           threshold: Number(form.threshold),
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setInventory((prev) => [...prev, data.data]);

//         setForm({
//           name: "",
//           quantity: "",
//           unit: "",
//           costPerUnit: "",
//           threshold: ""
//         });

//         setShowModal(false);
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔍 Search
//   const filtered = inventory.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) {
//     return <div className="p-6">Loading inventory...</div>;
//   }

//   return (
//     <div className="space-y-6">

//       {/* 🚨 ALERT BAR */}
//       {lowStockItems.length > 0 && (
//         <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg">
//           ⚠️ {lowStockItems.length} items are low or out of stock
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Track and manage your stock levels.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm hover:bg-muted">
//             <ScanLine className="h-4 w-4" /> Scan Inventory
//           </button>

//           <button
//             onClick={() => setShowModal(true)}
//             className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm text-white"
//           >
//             <Plus className="h-4 w-4" /> Add Item
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-sm">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search inventory..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full rounded-lg border pl-10 pr-4 py-2 text-sm"
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border bg-card overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b text-left">
//               <th className="px-6 py-3">Item Name</th>
//               <th className="px-6 py-3">Quantity</th>
//               <th className="px-6 py-3">Unit</th>
//               <th className="px-6 py-3">Cost</th>
//               <th className="px-6 py-3">Stock Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.length > 0 ? (
//               filtered.map((item) => {
//                 const status = getStatus(item);

//                 return (
//                   <tr key={item._id} className="border-b hover:bg-muted/50">
//                     <td className="px-6 py-3 font-medium">{item.name}</td>
//                     <td className="px-6 py-3">{item.quantity}</td>
//                     <td className="px-6 py-3">{item.unit}</td>
//                     <td className="px-6 py-3">
//                       ₹{item.costPerUnit}/{item.unit}
//                     </td>

//                     {/* ✅ STATUS UI */}
//                     <td className="px-6 py-3">
//                       {status === "healthy" && (
//                         <span className="text-green-600 font-medium">Healthy</span>
//                       )}
//                       {status === "low" && (
//                         <span className="text-yellow-600 font-medium">Low Stock</span>
//                       )}
//                       {status === "out" && (
//                         <span className="text-red-600 font-medium">Out of Stock</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-6 text-muted-foreground">
//                   No items found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

//             <h2 className="text-lg font-semibold">Add Inventory Item</h2>

//             <input
//               placeholder="Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full border p-2 rounded"
//             />

//             <input
//               placeholder="Quantity"
//               value={form.quantity}
//               onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//               className="w-full border p-2 rounded"
//             />

//             <select
//               value={form.unit}
//               onChange={(e) => setForm({ ...form, unit: e.target.value })}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select Unit</option>
//               <option value="kg">Kilogram (kg)</option>
//               <option value="g">Gram (g)</option>
//               <option value="liters">Litres (L)</option>
//               <option value="ml">Millilitres (ml)</option>
//               <option value="pieces">Pieces</option>
//               <option value="bottles">Bottles</option>
//               <option value="packets">Packets</option>
//             </select>

//             <input
//               placeholder="Cost per unit"
//               value={form.costPerUnit}
//               onChange={(e) => setForm({ ...form, costPerUnit: e.target.value })}
//               className="w-full border p-2 rounded"
//             />

//             <input
//               placeholder="Threshold"
//               value={form.threshold}
//               onChange={(e) => setForm({ ...form, threshold: e.target.value })}
//               className="w-full border p-2 rounded"
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleAddItem}
//                 className="px-4 py-2 bg-black text-white rounded"
//               >
//                 Save
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










//adding edit,delete,scan


import { useState, useEffect } from "react";
import { Plus, ScanLine, Search } from "lucide-react";
import Tesseract from "tesseract.js";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scannedItems, setScannedItems] = useState([]);
  const [showScanOptions, setShowScanOptions] = useState(false);
const [showScanPreview, setShowScanPreview] = useState(false);


  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null); // ✅ NEW
  const [suggestions, setSuggestions] = useState([]);
  

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    costPerUnit: "",
    threshold: ""
  });

  const getStatus = (item) => {
    if (item.quantity === 0) return "out";
    if (item.quantity <= item.threshold) return "low";
    return "healthy";
  };

  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.threshold
  );

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setInventory(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // ✅ UPDATED (ADD + EDIT)
  // const handleSave = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const url = editId
  //       ? `http://localhost:5000/api/inventory/${editId}`
  //       : "http://localhost:5000/api/inventory";

  //     const method = editId ? "PUT" : "POST";

  //     const res = await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         name: form.name,
  //         quantity: Number(form.quantity),
  //         unit: form.unit,
  //         costPerUnit: Number(form.costPerUnit),
  //         threshold: Number(form.threshold),
  //       }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       if (editId) {
  //         setInventory((prev) =>
  //           prev.map((i) => (i._id === editId ? data.data : i))
  //         );
  //       } else {
  //         setInventory((prev) => [...prev, data.data]);
  //       }

  //       setForm({
  //         name: "",
  //         quantity: "",
  //         unit: "",
  //         costPerUnit: "",
  //         threshold: ""
  //       });

  //       setEditId(null); // ✅ reset edit
  //       setShowModal(false);
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    // 🚫 DUPLICATE CHECK (frontend)
    const exists = inventory.some(
  (item) =>
    item.name.toLowerCase() === form.name.trim().toLowerCase() &&
    item.unit.toLowerCase() === form.unit.toLowerCase() &&
    item._id !== editId
);

    if (exists) {
      alert("Item already exists!");
      return;
    }

    const url = editId
      ? `http://localhost:5000/api/inventory/${editId}`
      : "http://localhost:5000/api/inventory";

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        quantity: Number(form.quantity),
        unit: form.unit,
        costPerUnit: Number(form.costPerUnit),
        threshold: Number(form.threshold),
      }),
    });

    const data = await res.json();
//working
    // if (res.ok) {
    //   if (editId) {
    //     setInventory((prev) =>
    //       prev.map((i) => (i._id === editId ? data.data : i))
    //     );
    //   } else {
    //     setInventory((prev) => [...prev, data.data]);
    //   }

    //   setForm({
    //     name: "",
    //     quantity: "",
    //     unit: "",
    //     costPerUnit: "",
    //     threshold: ""
    //   });

    //   setEditId(null);
    //   setShowModal(false);
    // } 
    if (res.ok) {

  // ✅ REFETCH inventory from backend (fresh data)
  const refresh = await fetch("http://localhost:5000/api/inventory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const refreshedData = await refresh.json();

  if (refresh.ok) {
    setInventory(refreshedData.data);
  }

  // reset form
  setForm({
    name: "",
    quantity: "",
    unit: "",
    costPerUnit: "",
    threshold: ""
  });

  setEditId(null);
  setShowModal(false);
}else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
};



  // ✅ EDIT
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      costPerUnit: item.costPerUnit,
      threshold: item.threshold
    });

    setEditId(item._id);
    setShowModal(true);
  };

  // ✅ DELETE
  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm("Delete this item?");
  //   if (!confirmDelete) return;

  //   try {
  //     const token = localStorage.getItem("token");

  //     await fetch(`http://localhost:5000/api/inventory/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setInventory((prev) => prev.filter((i) => i._id !== id));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this item?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      // setInventory((prev) => prev.filter((i) => i._id !== id));
      const refresh = await fetch("http://localhost:5000/api/inventory", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const refreshedData = await refresh.json();

if (refresh.ok) {
  setInventory(refreshedData.data);
}
    } else {
      alert(data.message); // 🔴 SHOW ERROR
    }

  } catch (err) {
    console.error(err);
  }
};


const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  alert("Reading image...");

  try {
    const result = await Tesseract.recognize(file, "eng");
    const text = result.data.text;

    console.log("OCR TEXT:", text);

    const lines = text
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    const parsed = lines.map(line => {
      const match = line.match(/^(.+?)\s+(\d+)\s+(\w+)$/);

       if (!match) {
    return {
      name: line,
      quantity: 0,
      unit: "",
      costPerUnit: 0,
      threshold: 5,
    };
  }

      return {
    name: match[1],
    quantity: Number(match[2]),
    unit: match[3].toLowerCase(),
    costPerUnit: 0,
    threshold: 5,
  };
    });

    console.log("PARSED ITEMS:", parsed);

    setScannedItems(parsed);

    setShowScanOptions(false);

    // 🔥 IMPORTANT: delay ensures React updates state properly
    setShowScanPreview(true);

  } catch (err) {
    console.error(err);
    alert("Failed to read image");
  }
};


  const filtered = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6">Loading inventory...</div>;
  }

  return (
    <div className="space-y-6">

      {lowStockItems.length > 0 && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg">
          ⚠️ {lowStockItems.length} items are low or out of stock
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage your stock levels.
          </p>
        </div>

        <div className="flex gap-3">
          <button
  onClick={() => setShowScanOptions(true)}
  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm hover:bg-muted"
>
  <ScanLine className="h-4 w-4" /> Scan Inventory
</button>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm text-white"
          >
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border pl-10 pr-4 py-2 text-sm"
        />
      </div>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-6 py-3">Item Name</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Unit</th>
              <th className="px-6 py-3">Cost</th>
              <th className="px-6 py-3">Stock Status</th>
              <th className="px-6 py-3">Actions</th> {/* ✅ NEW */}
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => {
                const status = getStatus(item);

                return (
                  <tr key={item._id} className="border-b hover:bg-muted/50">
                    <td className="px-6 py-3 font-medium">{item.name}</td>
                    <td className="px-6 py-3">{item.quantity}</td>
                    <td className="px-6 py-3">{item.unit}</td>
                    <td className="px-6 py-3">
                      ₹{item.costPerUnit}/{item.unit}
                    </td>

                    <td className="px-6 py-3">
                      {status === "healthy" && (
                        <span className="text-green-600 font-medium">Healthy</span>
                      )}
                      {status === "low" && (
                        <span className="text-yellow-600 font-medium">Low Stock</span>
                      )}
                      {status === "out" && (
                        <span className="text-red-600 font-medium">Out of Stock</span>
                      )}
                    </td>

                    {/* ✅ ACTIONS */}
                    <td className="px-6 py-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600"
                      >
                        🗑️
                      </button>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-muted-foreground">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

            <h2 className="text-lg font-semibold">
              {editId ? "Edit Item" : "Add Inventory Item"}
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              // onChange={(e) => setForm({ ...form, name: e.target.value })}
          
              onChange={(e) => {
  const value = e.target.value;

  // 🔍 filter suggestions
  
  const matches = value
  ? inventory.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )
  : [];

  setSuggestions(matches);

  const exact = inventory.find(
    (item) => item.name.toLowerCase() === value.toLowerCase()
  );

  if (exact && !editId) {
    setForm({
      name: value,
      quantity: "",
      unit: exact.unit,
      costPerUnit: exact.costPerUnit,
      threshold: exact.threshold,
    });
  } else {
    setForm({ ...form, name: value });
  }
}}
              className="w-full border p-2 rounded"
            />

          
            

            <input
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <select
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Unit</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="liters">Litres (L)</option>
              <option value="ml">Millilitres (ml)</option>
              <option value="pieces">Pieces</option>
              <option value="bottles">Bottles</option>
              <option value="packets">Packets</option>
            </select>

            <input
              placeholder="Cost per unit"
              value={form.costPerUnit}
              onChange={(e) => setForm({ ...form, costPerUnit: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Threshold"
              value={form.threshold}
              onChange={(e) => setForm({ ...form, threshold: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white rounded"
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>

          </div>
        </div>
      )} */}


      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

      <h2 className="text-lg font-semibold">
        {editId ? "Edit Item" : "Add Inventory Item"}
      </h2>

      {/* ✅ NAME INPUT + SUGGESTIONS WRAPPER */}
      <div className="relative">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => {
            const value = e.target.value;

            const matches = value
              ? inventory.filter((item) =>
                  item.name.toLowerCase().includes(value.toLowerCase())
                )
              : [];

            setSuggestions(matches);

            const exact = inventory.find(
              (item) => item.name.toLowerCase() === value.toLowerCase()
            );

            if (exact && !editId) {
              setForm({
                name: value,
                quantity: "",
                unit: exact.unit,
                costPerUnit: exact.costPerUnit,
                threshold: exact.threshold,
              });
            } else {
              setForm({ ...form, name: value });
            }
          }}
          className="w-full border p-2 rounded"
        />

        {/* ✅ SUGGESTION DROPDOWN */}
        {suggestions.length > 0 && form.name && (
          <div className="absolute z-10 w-full border rounded bg-white max-h-40 overflow-y-auto mt-1 shadow">
            {suggestions.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setForm({
                    name: item.name,
                    quantity: "",
                    unit: item.unit,
                    costPerUnit: item.costPerUnit,
                    threshold: item.threshold,
                  });
                  setSuggestions([]); // close dropdown
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* OTHER INPUTS */}
      <input
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <select
        value={form.unit}
        onChange={(e) => setForm({ ...form, unit: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Unit</option>
        <option value="kg">Kilogram (kg)</option>
        <option value="g">Gram (g)</option>
        <option value="liters">Litres (L)</option>
        <option value="ml">Millilitres (ml)</option>
        <option value="pieces">Pieces</option>
        <option value="bottles">Bottles</option>
        <option value="packets">Packets</option>
      </select>

      <input
        placeholder="Cost per unit"
        value={form.costPerUnit}
        onChange={(e) => setForm({ ...form, costPerUnit: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Threshold"
        value={form.threshold}
        onChange={(e) => setForm({ ...form, threshold: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setShowModal(false);
            setSuggestions([]); // cleanup
          }}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {editId ? "Update" : "Save"}
        </button>
      </div>

    </div>
  </div>
)}

{showScanPreview && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

      <h2 className="text-lg font-semibold">Review Scanned Items</h2>

      <div className="max-h-60 overflow-y-auto space-y-2">
        {scannedItems.map((item, i) => (
          <div key={i} className="flex justify-between border p-2 rounded">
            <span className="font-medium">{item.name}</span>
            <span>{item.quantity} {item.unit}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setShowScanPreview(false);
            setScannedItems([]);
          }}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setInventory((prev) => {
  const updated = [...prev];

  scannedItems.forEach((newItem) => {
    const index = updated.findIndex(
      (i) =>
        i.name.toLowerCase() === newItem.name.toLowerCase() &&
        i.unit === newItem.unit
    );

    if (index !== -1) {
      // update existing item (merge quantity)
      updated[index].quantity += newItem.quantity;
    } else {
      updated.push(newItem);
    }
  });

  return updated;
});
            setShowScanPreview(false);
            setScannedItems([]);
          }}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Approve & Add
        </button>
      </div>

    </div>
  </div>
)}

{showScanOptions && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">

      <h2 className="text-lg font-semibold">Scan Inventory</h2>

      {/* 📷 Upload Image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={() => setShowScanOptions(false)}
        className="w-full border p-2 rounded"
      >
        Cancel
      </button>

    </div>
  </div>
)}
    </div>
  );
}