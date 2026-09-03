// import { useEffect, useState } from "react";

// interface MenuItem {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   image?: string;
//   available: boolean;
// }

// export default function CustomerMenu() {
//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");

//   const restaurantId = "69dd0315fdbaf1fc3e305eb7";

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

//   if (loading) return <p className="p-4">Loading menu...</p>;

//   const filteredItems = items.filter((item) => {
//     const matchSearch = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchCategory =
//       category === "all" || item.category === category;

//     return matchSearch && matchCategory;
//   });

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <h1 className="text-2xl font-semibold">Customer Menu</h1>

//       {/* SEARCH + FILTER */}
//       <div className="flex flex-col md:flex-row gap-3">
//         <input
//           type="text"
//           placeholder="Search food..."
//           className="border p-2 rounded w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border p-2 rounded"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="starter">Starter</option>
//           <option value="main">Main</option>
//           <option value="dessert">Dessert</option>
//           <option value="drinks">Drinks</option>
//         </select>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredItems.map((item) => (
//           <div key={item._id} className="border p-4 rounded-xl">

//             <img
//               src={
//                 item.image ||
//                 "https://via.placeholder.com/300x200?text=No+Image"
//               }
//               className="w-full h-40 object-cover rounded mb-3"
//             />

//             <h2 className="font-semibold">{item.name}</h2>
//             <p>₹{item.price}</p>

//             <p
//               className={`text-sm mt-1 ${
//                 item.available ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {item.available ? "Available" : "Not Available"}
//             </p>

//             {item.available && (
//               <button className="mt-3 bg-black text-white px-3 py-1 rounded">
//                 Add to Cart
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";

// interface MenuItem {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   image?: string;
//   available: boolean;
// }

// interface CartItem extends MenuItem {
//   qty: number;
// }

// export default function CustomerMenu() {
//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [showCart, setShowCart] = useState(false);
//   const [orderStatus, setOrderStatus] = useState<string | null>(null);

//   const restaurantId = "69dd0315fdbaf1fc3e305eb7";

//   // FETCH MENU
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

//   // ADD TO CART
//   const addToCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const exists = prev.find((i) => i._id === item._id);

//       if (exists) {
//         return prev.map((i) =>
//           i._id === item._id ? { ...i, qty: i.qty + 1 } : i
//         );
//       }

//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   // REMOVE FROM CART
//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((i) => i._id !== id));
//   };

//   // PLACE ORDER (IMPORTANT)
//   const placeOrder = async () => {
//   try {
//     const payload = {
//       restaurantId,
//       tableId: "T2", // or dynamic later
//       items: cart.map((c) => ({
//         menuItemId: c._id,
//         qty: c.qty,
//       })),
//     };

//     const res = await fetch("http://localhost:5000/api/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();

//     console.log("ORDER RESPONSE:", data);

//     if (!res.ok) {
//       alert("Order failed");
//       return;
//     }

//     setCart([]);
//     setShowCart(false);
//     setOrderStatus(data.order?.status || "pending");

//     pollOrderStatus(data.order._id);
//   } catch (err) {
//     console.log(err);
//   }
// };

//   // POLL ORDER STATUS
//   const pollOrderStatus = async (orderId: string) => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/orders/${orderId}`
//         );
//         const data = await res.json();

//         setOrderStatus(data.status);

//         if (data.status === "completed" || data.status === "cancelled") {
//           clearInterval(interval);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }, 3000);
//   };

//   if (loading) return <p className="p-4">Loading menu...</p>;

//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Menu</h1>

//         <button
//           onClick={() => setShowCart(true)}
//           className="bg-black text-white px-3 py-1 rounded"
//         >
//           View Cart ({cart.length})
//         </button>
//       </div>

//       {/* SEARCH BAR (RESTORED) */}
//       <input
//         placeholder="Search food..."
//         className="w-full border p-2 rounded"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* MENU GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredItems.map((item) => (
//           <div key={item._id} className="border p-4 rounded-xl">

//             <img
//               src={
//                 item.image ||
//                 "https://via.placeholder.com/300x200?text=No+Image"
//               }
//               className="w-full h-40 object-cover rounded mb-3"
//             />

//             <h2 className="font-semibold">{item.name}</h2>
//             <p>₹{item.price}</p>

//             <p
//               className={`text-sm mt-1 ${
//                 item.available ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {item.available ? "Available" : "Not Available"}
//             </p>

//             {item.available && (
//               <button
//                 onClick={() => addToCart(item)}
//                 className="mt-3 bg-black text-white px-3 py-1 rounded"
//               >
//                 Add to Cart
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* CART MODAL */}
//       {showCart && (
//         <div className="fixed inset-0 bg-black/50 flex justify-end">
//           <div className="bg-white w-96 h-full p-4 space-y-4">

//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Your Cart</h2>
//               <button onClick={() => setShowCart(false)}>✕</button>
//             </div>

//             {cart.length === 0 ? (
//               <p>No items in cart</p>
//             ) : (
//               <>
//                 {cart.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex justify-between border-b pb-2"
//                   >
//                     <div>
//                       <p>{item.name}</p>
//                       <p className="text-sm text-gray-500">
//                         ₹{item.price} × {item.qty}
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-500"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}

//                 <div className="pt-3 font-semibold">
//                   Total: ₹
//                   {cart.reduce(
//                     (sum, i) => sum + i.price * i.qty,
//                     0
//                   )}
//                 </div>

//                 <button
//                   onClick={placeOrder}
//                   className="w-full bg-green-600 text-white py-2 rounded"
//                 >
//                   Place Order
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ORDER STATUS */}
//       {orderStatus && (
//         <div className="p-3 bg-yellow-100 rounded">
//           Order Status: <b>{orderStatus}</b>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

interface CartItem extends MenuItem {
  qty: number;
}

export default function CustomerMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const [tableNo, setTableNo] = useState<string>("");

  const restaurantId = "69dd0315fdbaf1fc3e305eb7";

  // FETCH MENU
  const fetchMenu = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/menu/${restaurantId}`
      );
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ADD TO CART
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);

      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
    setShowCart(false);
  };

  // PLACE ORDER (FIXED)
  const placeOrder = async () => {
    if (!tableNo.trim()) {
      alert("Please enter your table number");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const payload = {
        restaurantId,
        tableId: tableNo.toUpperCase(), // IMPORTANT FIX
        items: cart.map((c) => ({
          menuItemId: c._id,
          qty: c.qty,
        })),
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Order failed");
        return;
      }

      setOrderStatus(data.order?.status || "pending");
      setCart([]);
      setShowCart(false);

      pollOrderStatus(data.order._id);
    } catch (err) {
      console.log(err);
    }
  };

  // POLL ORDER STATUS
  const pollOrderStatus = (orderId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/${orderId}`
        );
        const data = await res.json();

        setOrderStatus(data.status);

        if (["completed", "cancelled"].includes(data.status)) {
          clearInterval(interval);
        }
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  };

  if (loading) return <p className="p-4">Loading menu...</p>;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Menu</h1>

        <button
          onClick={() => setShowCart(true)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          View Cart ({cart.length})
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search food..."
        className="w-full border p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* MENU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item._id} className="border p-4 rounded-xl">

            <img
              src={item.image || "https://via.placeholder.com/300x200"}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h2 className="font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>

            <p
              className={`text-sm ${
                item.available ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.available ? "Available" : "Not Available"}
            </p>

            {item.available && (
              <button
                onClick={() => addToCart(item)}
                className="mt-3 bg-black text-white px-3 py-1 rounded"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {/* CART SIDEBAR */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex justify-end">
          <div className="bg-white w-96 h-full p-4 space-y-4">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            {/* TABLE INPUT */}
            <div>
              <label className="text-sm font-medium">
                Enter Table Number
              </label>

              <input
                type="text"
                placeholder="e.g. T2 / 5 / A1"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            {/* CART ITEMS */}
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* TOTAL */}
                <div className="font-semibold pt-2">
                  Total: ₹
                  {cart.reduce(
                    (sum, i) => sum + i.price * i.qty,
                    0
                  )}
                </div>

                {/* ACTIONS */}
                <button
                  onClick={placeOrder}
                  disabled={!tableNo.trim() || cart.length === 0}
                  className={`w-full py-2 rounded text-white ${
                    !tableNo.trim() || cart.length === 0
                      ? "bg-gray-400"
                      : "bg-green-600"
                  }`}
                >
                  Place Order
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 bg-red-500 text-white rounded"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ORDER STATUS */}
      {orderStatus && (
        <div className="p-3 bg-yellow-100 rounded">
          Order Status: <b>{orderStatus}</b>
        </div>
      )}
    </div>
  );
}