import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Inventories() {
  const [inventories, setInventories] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", is_public: false });
  const [editId, setEditId] = useState(null);

  // 🔰 Load inventories
  useEffect(() => {
    fetchInventories();
  }, []);

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
        await API.put(`/inventories/${editId}`, { ...form, version: 0 });
      } else {
        await API.post("/inventories", form);
      }
      setForm({ title: "", description: "", is_public: false });
      setEditId(null);
      fetchInventories();
    } catch (err) {
      console.error(err);
    }
  };

  // 📝 Edit
  const handleEdit = (inv) => {
    setForm({
      title: inv.title,
      description: inv.description,
      is_public: inv.is_public,
    });
    setEditId(inv.id);
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/inventories/${id}`);
      fetchInventories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Inventories</h2>

      {/* Form */}
      <form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 flex-1"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 flex-1"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={form.is_public}
            onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
          />
          Public
        </label>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Public</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inv) => (
            <tr key={inv.id} className="border">
              <td className="p-2 border">{inv.title}</td>
              <td className="p-2 border">{inv.description}</td>
              <td className="p-2 border">{inv.is_public ? "✅" : "❌"}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => handleEdit(inv)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(inv.id)}
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
