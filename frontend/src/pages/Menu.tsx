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