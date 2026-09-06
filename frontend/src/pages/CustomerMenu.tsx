import { useEffect, useState } from "react";
import api from "@/lib/api";

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
     const res = await api.get(`/menu/${restaurantId}`);
setItems(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);


  useEffect(() => {
  const savedOrderId = localStorage.getItem("activeOrderId");
  if (savedOrderId) {
    pollOrderStatus(savedOrderId);
  }
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

     let data;
try {
  const res = await api.post("/orders", payload);
  data = res.data;
} catch (err) {
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
    localStorage.setItem("activeOrderId", orderId);

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/orders/order/${orderId}`);
        const data = res.data;
        setOrderStatus(data.status);

        if (["completed", "cancelled"].includes(data.status)) {
          clearInterval(interval);
          localStorage.removeItem("activeOrderId");
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