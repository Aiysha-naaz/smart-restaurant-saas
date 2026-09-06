import { useState, useEffect } from "react";
import { Plus, ScanLine, Search } from "lucide-react";
import Tesseract from "tesseract.js";
import api from "@/lib/api";

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
      const res = await api.get("/inventory");
      setInventory(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchInventory();
}, []);

const handleSave = async () => {
  try {
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

    const payload = {
      name: form.name,
      quantity: Number(form.quantity),
      unit: form.unit,
      costPerUnit: Number(form.costPerUnit),
      threshold: Number(form.threshold),
    };

    if (editId) {
      await api.put(`/inventory/${editId}`, payload);
    } else {
      await api.post("/inventory", payload);
    }

    const refresh = await api.get("/inventory");
    setInventory(refresh.data.data);

    setForm({
      name: "",
      quantity: "",
      unit: "",
      costPerUnit: "",
      threshold: ""
    });

    setEditId(null);
    setShowModal(false);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error saving item");
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


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this item?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/inventory/${id}`);

    const refresh = await api.get("/inventory");
    setInventory(refresh.data.data);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error deleting item");
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