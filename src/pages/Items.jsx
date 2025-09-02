import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Items() {
  const [items, setItems] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: 0, price: 0, inventoryId: "" });
  const [editId, setEditId] = useState(null);

  // 🔰 Load items & inventories
  useEffect(() => {
    fetchItems();
    fetchInventories();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInventories = async () => {
    try {
      const res = await API.get("/inventories");
      setInventories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/items/${editId}`, form);
      } else {
        await API.post("/items", form);
      }
      setForm({ name: "", quantity: 0, price: 0, inventoryId: "" });
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // 📝 Edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      inventoryId: item.inventoryId,
    });
    setEditId(item.id);
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Items</h2>

      {/* Form */}
      <form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2"
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2"
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <select
          className="border p-2"
          value={form.inventoryId}
          onChange={(e) => setForm({ ...form, inventoryId: e.target.value })}
        >
          <option value="">Select Inventory</option>
          {inventories.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.title}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Inventory</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.quantity}</td>
              <td className="p-2 border">${item.price}</td>
              <td className="p-2 border">{item.inventoryId}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
