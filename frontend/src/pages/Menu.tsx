// import { useState } from "react";
// import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface MenuItem {
//   id: string;
//   name: string;
//   price: string;
//   category: string;
//   tags: string[];
//   available: boolean;
//   image: string;
// }

// const menuItems: MenuItem[] = [
//   { id: "1", name: "Margherita Pizza", price: "₹420", category: "Main Course", tags: ["Trending"], available: true, image: "🍕" },
//   { id: "2", name: "Grilled Salmon", price: "₹850", category: "Main Course", tags: ["Seasonal"], available: true, image: "🐟" },
//   { id: "3", name: "Caesar Salad", price: "₹320", category: "Starters", tags: ["Trending"], available: true, image: "🥗" },
//   { id: "4", name: "Pasta Carbonara", price: "₹480", category: "Main Course", tags: [], available: true, image: "🍝" },
//   { id: "5", name: "Chicken Tikka", price: "₹380", category: "Starters", tags: ["Trending"], available: false, image: "🍗" },
//   { id: "6", name: "Sushi Platter", price: "₹1,200", category: "Main Course", tags: ["Seasonal"], available: true, image: "🍣" },
//   { id: "7", name: "Chocolate Lava Cake", price: "₹280", category: "Desserts", tags: ["Trending"], available: true, image: "🍫" },
//   { id: "8", name: "Mango Smoothie", price: "₹180", category: "Beverages", tags: ["Seasonal"], available: true, image: "🥭" },
// ];

// const tagColors: Record<string, string> = {
//   Trending: "bg-primary/10 text-primary",
//   Seasonal: "bg-warning/10 text-warning",
// };

// export default function Menu() {
//   const [items, setItems] = useState(menuItems);

//   const toggleAvailability = (id: string) => {
//     setItems((prev) => prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">Menu</h1>
//           <p className="text-sm text-muted-foreground mt-1">Manage your restaurant's menu items.</p>
//         </div>
//         <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
//           <Plus className="h-4 w-4" /> Add Menu Item
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className={cn(
//               "rounded-xl border border-border bg-card p-5 transition-shadow duration-150 hover:shadow-sm",
//               !item.available && "opacity-60"
//             )}
//           >
//             <div className="text-4xl mb-3">{item.image}</div>
//             <h3 className="font-semibold text-sm">{item.name}</h3>
//             <p className="text-lg font-semibold mt-1">{item.price}</p>
//             <p className="text-xs text-muted-foreground mt-1">{item.category}</p>

//             {item.tags.length > 0 && (
//               <div className="flex gap-1.5 mt-3">
//                 {item.tags.map((tag) => (
//                   <span key={tag} className={cn("rounded-full px-2 py-0.5 text-xs font-medium", tagColors[tag] || "bg-muted text-muted-foreground")}>
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}

//             <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
//               <div className="flex gap-2">
//                 <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
//                   <Pencil className="h-4 w-4 text-muted-foreground" />
//                 </button>
//                 <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
//                   <Trash2 className="h-4 w-4 text-destructive" />
//                 </button>
//               </div>
//               <button onClick={() => toggleAvailability(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
//                 {item.available ? <ToggleRight className="h-6 w-6 text-success" /> : <ToggleLeft className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }










// import { useState, useEffect } from "react";
// import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface MenuItem {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   tags: string[];
//   available: boolean;
//   image?: string;
// }

// export default function Menu() {
//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [ingredients, setIngredients] = useState<
//   { name: string; quantity: number; unit: string }[]
// >([]);

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "main",
//     tags: "",
//   });

//   const restaurantId = "rest_1";

//   // 📥 FETCH MENU
//   const fetchMenu = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/menu/${restaurantId}`
//       );
//       const data = await res.json();
//       setItems(data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   // ➕ ADD ITEM
//   const addMenuItem = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/menu", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           restaurantId,
//           name: form.name,
//           price: Number(form.price),
//           category: form.category,
//           tags: form.tags
//             ? form.tags.split(",").map((t) => t.trim())
//             : [],
//           available: true,
//         }),
//       });

//       const data = await res.json();

//       setItems((prev) => [...prev, data]);

//       setShowModal(false);
//       setForm({
//         name: "",
//         price: "",
//         category: "main",
//         tags: "",
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const addIngredient = (ing: {
//   name: string;
//   quantity: number;
//   unit: string;
// }) => {
//   setIngredients((prev) => [...prev, ing]);
// };

//   // 🔁 TOGGLE
//   const toggleAvailability = async (id: string, current: boolean) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/menu/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ available: !current }),
//         }
//       );

//       const updated = await res.json();

//       setItems((prev) =>
//         prev.map((i) => (i._id === id ? updated : i))
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ❌ DELETE
//   const deleteItem = async (id: string) => {
//     try {
//       await fetch(`http://localhost:5000/api/menu/${id}`, {
//         method: "DELETE",
//       });

//       setItems((prev) => prev.filter((i) => i._id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-semibold">Menu</h1>
//           <p className="text-sm text-muted-foreground">
//             Manage your restaurant menu
//           </p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
//         >
//           <Plus size={16} /> Add Menu Item
//         </button>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//   {items.map((item) => (
//     <div
//       key={item._id}
//       className={cn(
//         "border p-4 rounded-xl",
//         !item.available && "opacity-50"
//       )}
//     >
//       {/* 🖼️ IMAGE ADDED */}
//       <img
//         src={
//           item.image ||
//           "https://via.placeholder.com/300x200?text=No+Image"
//         }
//         alt={item.name}
//         className="w-full h-40 object-cover rounded-lg mb-3"
//       />

//       <h2 className="font-semibold">{item.name}</h2>

//       <p>₹{item.price}</p>

//       <p className="text-sm text-gray-500">
//         {item.category}
//       </p>

//       {/* ACTIONS */}
//       <div className="flex justify-between mt-4">
//         <div className="flex gap-2">
//           <button>
//             <Pencil size={16} />
//           </button>

//           <button onClick={() => deleteItem(item._id)}>
//             <Trash2 size={16} color="red" />
//           </button>
//         </div>

//         <button
//           onClick={() =>
//             toggleAvailability(item._id, item.available)
//           }
//         >
//           {item.available ? (
//             <ToggleRight />
//           ) : (
//             <ToggleLeft />
//           )}
//         </button>
//       </div>
//     </div>
//   ))}
// </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-80 space-y-3">
//             <h2 className="text-lg font-semibold">
//               Add Menu Item
//             </h2>

//             <input
//               placeholder="Name"
//               className="w-full border p-2 rounded"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="Price"
//               type="number"
//               className="w-full border p-2 rounded"
//               value={form.price}
//               onChange={(e) =>
//                 setForm({ ...form, price: e.target.value })
//               }
//             />

//             <select
//               className="w-full border p-2 rounded"
//               value={form.category}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   category: e.target.value,
//                 })
//               }
//             >
//               <option value="main">Main</option>
//               <option value="starter">Starter</option>
//               <option value="dessert">Dessert</option>
//               <option value="drinks">Drinks</option>
//             </select>

//             <input
//               placeholder="Tags (comma separated)"
//               className="w-full border p-2 rounded"
//               value={form.tags}
//               onChange={(e) =>
//                 setForm({ ...form, tags: e.target.value })
//               }
//             />

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={addMenuItem}
//                 className="bg-green-600 text-white px-3 py-1 rounded"
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






//working
// import { useState, useEffect } from "react";
// import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface MenuItem {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   tags: string[];
//   available: boolean;
//   image?: string;
//   ingredients?: {
//     name: string;
//     quantity: number;
//     unit: string;
//   }[];
// }

// export default function Menu() {
//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);

//   const [ingredients, setIngredients] = useState<
//     { name: string; quantity: number; unit: string }[]
//   >([]);

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "main",
//     tags: "",
//     image: "",
//   });

//   const restaurantId = "rest_1";

//   // 📥 FETCH MENU
//   const fetchMenu = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/menu/${restaurantId}`
//       );
//       const data = await res.json();
//       setItems(data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   // ➕ ADD ITEM (NOW INCLUDES INGREDIENTS)
//   const addMenuItem = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/menu", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           restaurantId,
//           name: form.name,
//           price: Number(form.price),
//           category: form.category,
//           image: form.image,
//           tags: form.tags
//             ? form.tags.split(",").map((t) => t.trim())
//             : [],
//           available: true,
//           ingredients, // 🔥 IMPORTANT
//         }),
//       });

//       const data = await res.json();

//       setItems((prev) => [...prev, data]);

//       setShowModal(false);
//       setForm({
//         name: "",
//         price: "",
//         category: "main",
//         tags: "",
//         image: "",
//       });

//       setIngredients([]); // reset
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ➕ ADD INGREDIENT
//   const addIngredient = (ing: {
//     name: string;
//     quantity: number;
//     unit: string;
//   }) => {
//     setIngredients((prev) => [...prev, ing]);
//   };

//   // 🔁 TOGGLE
//   const toggleAvailability = async (id: string, current: boolean) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/menu/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ available: !current }),
//         }
//       );

//       const updated = await res.json();

//       setItems((prev) =>
//         prev.map((i) => (i._id === id ? updated : i))
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ❌ DELETE
//   const deleteItem = async (id: string) => {
//     try {
//       await fetch(`http://localhost:5000/api/menu/${id}`, {
//         method: "DELETE",
//       });

//       setItems((prev) => prev.filter((i) => i._id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-semibold">Menu</h1>
//           <p className="text-sm text-muted-foreground">
//             Manage your restaurant menu
//           </p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
//         >
//           <Plus size={16} /> Add Menu Item
//         </button>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {items.map((item) => (
//           <div
//             key={item._id}
//             className={cn(
//               "border p-4 rounded-xl",
//               !item.available && "opacity-50"
//             )}
//           >
//             {/* IMAGE */}
//             <img
//               src={
//                 item.image ||
//                 "https://via.placeholder.com/300x200?text=No+Image"
//               }
//               alt={item.name}
//               className="w-full h-40 object-cover rounded-lg mb-3"
//             />

//             <h2 className="font-semibold">{item.name}</h2>
//             <p>₹{item.price}</p>
//             <p className="text-sm text-gray-500">{item.category}</p>

//             {/* INGREDIENT PREVIEW (small view) */}
//             {item.ingredients?.length > 0 && (
//               <p className="text-xs text-gray-400 mt-1">
//                 {item.ingredients.slice(0, 2).map((i) => i.name).join(", ")}
//                 {item.ingredients.length > 2 && "..."}
//               </p>
//             )}

//             {/* ACTIONS */}
//             <div className="flex justify-between mt-4">
//               <div className="flex gap-2">
//                 <button>
//                   <Pencil size={16} />
//                 </button>

//                 <button onClick={() => deleteItem(item._id)}>
//                   <Trash2 size={16} color="red" />
//                 </button>
//               </div>

//               <button
//                 onClick={() =>
//                   toggleAvailability(item._id, item.available)
//                 }
//               >
//                 {item.available ? (
//                   <ToggleRight />
//                 ) : (
//                   <ToggleLeft />
//                 )}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-80 space-y-3">
//             <h2 className="text-lg font-semibold">Add Menu Item</h2>

//             <input
//               placeholder="Name"
//               className="w-full border p-2 rounded"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="Price"
//               type="number"
//               className="w-full border p-2 rounded"
//               value={form.price}
//               onChange={(e) =>
//                 setForm({ ...form, price: e.target.value })
//               }
//             />

//             <input
//               placeholder="Image URL"
//               className="w-full border p-2 rounded"
//               value={form.image}
//               onChange={(e) =>
//                 setForm({ ...form, image: e.target.value })
//               }
//             />

//             <select
//               className="w-full border p-2 rounded"
//               value={form.category}
//               onChange={(e) =>
//                 setForm({ ...form, category: e.target.value })
//               }
//             >
//               <option value="main">Main</option>
//               <option value="starter">Starter</option>
//               <option value="dessert">Dessert</option>
//               <option value="drinks">Drinks</option>
//             </select>

//             <input
//               placeholder="Tags (comma separated)"
//               className="w-full border p-2 rounded"
//               value={form.tags}
//               onChange={(e) =>
//                 setForm({ ...form, tags: e.target.value })
//               }
//             />

//             {/* INGREDIENT INPUT */}
//             <div className="border p-2 rounded space-y-1">
//               <p className="text-xs font-semibold">Add Ingredient</p>

//               <input
//                 placeholder="Name"
//                 className="w-full border p-1 text-sm"
//                 id="ing-name"
//               />
//               <input
//                 placeholder="Qty"
//                 type="number"
//                 className="w-full border p-1 text-sm"
//                 id="ing-qty"
//               />
//               <input
//                 placeholder="Unit"
//                 className="w-full border p-1 text-sm"
//                 id="ing-unit"
//               />

//               <button
//                 type="button"
//                 className="text-xs bg-gray-200 px-2 py-1 mt-1"
//                 onClick={() => {
//                   const name = (
//                     document.getElementById(
//                       "ing-name"
//                     ) as HTMLInputElement
//                   ).value;

//                   const qty = (
//                     document.getElementById(
//                       "ing-qty"
//                     ) as HTMLInputElement
//                   ).value;

//                   const unit = (
//                     document.getElementById(
//                       "ing-unit"
//                     ) as HTMLInputElement
//                   ).value;

//                   if (!name) return;

//                   addIngredient({
//                     name,
//                     quantity: Number(qty),
//                     unit,
//                   });

//                   (
//                     document.getElementById(
//                       "ing-name"
//                     ) as HTMLInputElement
//                   ).value = "";
//                   (
//                     document.getElementById(
//                       "ing-qty"
//                     ) as HTMLInputElement
//                   ).value = "";
//                   (
//                     document.getElementById(
//                       "ing-unit"
//                     ) as HTMLInputElement
//                   ).value = "";
//                 }}
//               >
//                 + Add Ingredient
//               </button>

//               {/* PREVIEW */}
//               <div className="text-xs text-gray-500">
//                 {ingredients.map((i, idx) => (
//                   <div key={idx}>
//                     {i.name} - {i.quantity} {i.unit}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <button onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>

//               <button
//                 onClick={addMenuItem}
//                 className="bg-green-600 text-white px-3 py-1 rounded"
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










/////wrokingggg

// adding edit button
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  available: boolean;
  image?: string;
  ingredients?: {
    name: string;
    quantity: number;
    unit: string;
  }[];
}

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); // 🔥 EDIT STATE

  const [ingredients, setIngredients] = useState<
    { name: string; quantity: number; unit: string }[]
  >([]);

  const [selectedIngredients, setSelectedIngredients] = useState<
  { name: string; quantity: number; unit: string }[]
>([]);

const [showIngredientsModal, setShowIngredientsModal] = useState(false);
const [stockAlert, setStockAlert] = useState<MenuItem[]>([]);
const [showStockBanner, setShowStockBanner] = useState(false);

const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "main",
    tags: "",
    image: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
const restaurantId = user.restaurantId;

  // 📥 FETCH MENU
  const fetchMenu = async () => {
  try {
    const res = await api.get(`/menu/${restaurantId}`);
    setItems(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
  const outOfStockItems = items.filter((item) => item.available === false);

  setStockAlert(outOfStockItems);

  if (outOfStockItems.length > 0) {
    setShowStockBanner(true);
  }
}, [items]);

  //working
  
  useEffect(() => {
    fetchMenu();
  }, []);

  // ✏️ OPEN EDIT
  const openEdit = (item: MenuItem) => {
    setEditId(item._id);

    setForm({
      name: item.name,
      price: String(item.price),
      category: item.category,
      tags: item.tags?.join(",") || "",
      image: item.image || "",
    });

    setIngredients(item.ingredients || []);
    setShowModal(true);
  };

  // ➕ CREATE + ✏️ UPDATE
  const addMenuItem = async () => {
    try {
      const payload = {
        restaurantId,
        name: form.name,
        price: Number(form.price),
        category: form.category,
        image: form.image,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim())
          : [],
        available: true,
        ingredients,
      };

      let res;

if (editId) {
  res = await api.put(`/menu/${editId}`, payload);
} else {
  res = await api.post("/menu", payload);
}

const data = res.data;

      if (editId) {
        setItems((prev) =>
          prev.map((i) => (i._id === editId ? data : i))
        );
      } else {
        setItems((prev) => [...prev, data]);
      }

      // RESET
      setShowModal(false);
      setEditId(null);
      setForm({
        name: "",
        price: "",
        category: "main",
        tags: "",
        image: "",
      });
      setIngredients([]);
    } catch (err) {
      console.log(err);
    }
  };

  // ➕ ADD INGREDIENT
  const addIngredient = (ing: {
    name: string;
    quantity: number;
    unit: string;
  }) => {
    setIngredients((prev) => [...prev, ing]);
  };

  const openIngredientsModal = (ingredients: any[]) => {
  setSelectedIngredients(ingredients);
  setShowIngredientsModal(true);
};

  // 🔁 TOGGLE
  const toggleAvailability = async (id: string, current: boolean) => {
    try {
      const res = await api.put(`/menu/${id}`, { available: !current });
const updated = res.data;

      setItems((prev) =>
        prev.map((i) => (i._id === id ? updated : i))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE
  const deleteItem = async (id: string) => {
    try {
      await api.delete(`/menu/${id}`);

      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  

  return (
    <div className="space-y-6">
    {showStockBanner && stockAlert.length > 0 && (
  <div
    className={cn(
      "mb-4 p-4 rounded-lg border border-red-300 bg-red-50 transform transition-all duration-500",
      showStockBanner ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}
  >
    <div className="flex justify-between items-start gap-4">

      {/* LEFT TEXT */}
      <div>
        <p className="text-red-700 font-semibold">
          ⚠️ Manager Alert: Out of Stock Items
        </p>

        <p className="text-sm text-red-600 mt-1">
          {stockAlert.map((i) => i.name).join(", ")} are currently disabled due to stock shortage.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2">

        {/* RESTOCK BUTTON */}
        <button
  onClick={() => navigate("/dashboard/inventory")}
  className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"
>
  Restock Now
</button>

        {/* DISMISS */}
        <button
          onClick={() => setShowStockBanner(false)}
          className="text-sm text-red-700 font-medium hover:underline"
        >
          ✕
        </button>

      </div>
    </div>
  </div>
)}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Menu</h1>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant menu
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={16} /> Add Menu Item
        </button>
      </div>

      {/* GRID */}
      {["starter", "main", "dessert", "drinks"].map((cat) => {
  const filteredItems = items.filter(
    (item) => item.category === cat
  );

  if (filteredItems.length === 0) return null;

  const titles: Record<string, string> = {
    starter: "Starters",
    main: "Main Course",
    dessert: "Desserts",
    drinks: "Drinks",
  };

  return (
    <div key={cat} className="space-y-3">
      <h2 className="text-xl font-semibold">
        {titles[cat]}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className={cn(
              "border p-4 rounded-xl",
              !item.available && "opacity-50"
            )}
          >
            <img
              src={
                item.image ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h2 className="font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>

            {/* INGREDIENT PREVIEW */}
            {item.ingredients?.length > 0 && (
  <div className="mt-1">
    <p className="text-xs text-gray-400">
      {item.ingredients.slice(0, 2).map((i) => i.name).join(", ")}
      {item.ingredients.length > 2 && "..."}
    </p>

    {item.ingredients.length > 2 && (
      <button
        className="text-xs text-blue-500 mt-1"
        onClick={() => openIngredientsModal(item.ingredients!)}
      >
        View All
      </button>
    )}
  </div>
)}

            {/* ACTIONS */}
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)}>
                  <Pencil size={16} />
                </button>

                <button onClick={() => deleteItem(item._id)}>
                  <Trash2 size={16} color="red" />
                </button>
              </div>

              <button
                onClick={() =>
                  toggleAvailability(item._id, item.available)
                }
              >
                {item.available ? <ToggleRight /> : <ToggleLeft />}
              </button>
            </div>
          </div>
        ))}
      </div>
  </div>
    
  );
})}
      {/* MODAL */}
     {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-80 space-y-3">
      
      {/* 🔥 ONLY CHANGE HERE */}
      <h2 className="text-lg font-semibold">
        {editId ? "Edit Menu Item" : "Add Menu Item"}
      </h2>

      <input
        placeholder="Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Price"
        type="number"
        className="w-full border p-2 rounded"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        placeholder="Image URL"
        className="w-full border p-2 rounded"
        value={form.image}
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
      />

      <select
        className="w-full border p-2 rounded"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        <option value="main">Main</option>
        <option value="starter">Starter</option>
        <option value="dessert">Dessert</option>
        <option value="drinks">Drinks</option>
      </select>

      <input
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded"
        value={form.tags}
        onChange={(e) =>
          setForm({ ...form, tags: e.target.value })
        }
      />

      {/* INGREDIENT INPUT */}
      <div className="border p-2 rounded space-y-1">
        <p className="text-xs font-semibold">Add Ingredient</p>

        <input id="ing-name" placeholder="Name" className="w-full border p-1 text-sm" />
        <input id="ing-qty" placeholder="Qty" type="number" className="w-full border p-1 text-sm" />
        <input id="ing-unit" placeholder="Unit" className="w-full border p-1 text-sm" />

        <button
          type="button"
          className="text-xs bg-gray-200 px-2 py-1 mt-1"
          onClick={() => {
            const name = (document.getElementById("ing-name") as HTMLInputElement).value;
            const qty = (document.getElementById("ing-qty") as HTMLInputElement).value;
            const unit = (document.getElementById("ing-unit") as HTMLInputElement).value;

            if (!name) return;

            addIngredient({
              name,
              quantity: Number(qty),
              unit,
            });

            (document.getElementById("ing-name") as HTMLInputElement).value = "";
            (document.getElementById("ing-qty") as HTMLInputElement).value = "";
            (document.getElementById("ing-unit") as HTMLInputElement).value = "";
          }}
        >
          + Add Ingredient
        </button>

        {/* PREVIEW */}
        <div className="text-xs text-gray-500">
          {ingredients.map((i, idx) => (
            <div key={idx}>
              {i.name} - {i.quantity} {i.unit}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            setShowModal(false);
            setEditId(null);
            setIngredients([]);
          }}
        >
          Cancel
        </button>

        <button
          onClick={addMenuItem}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          {editId ? "Update" : "Save"}
        </button>
      </div>
    </div>
  </div>
)}

      {showIngredientsModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <h2 className="text-lg font-semibold mb-3">
        Ingredients
      </h2>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {selectedIngredients.map((ing, idx) => (
          <div
            key={idx}
            className="flex justify-between border-b pb-1 text-sm"
          >
            <span>{ing.name}</span>
            <span>
              {ing.quantity} {ing.unit}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowIngredientsModal(false)}
        className="mt-4 w-full bg-gray-200 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}