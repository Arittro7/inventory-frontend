import { useState } from "react";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setMsg("✅ Registered successfully. Please login.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="p-6 bg-white rounded shadow w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Register</button>
        {msg && <p className="mt-2 text-red-500">{msg}</p>}
      </form>
    </div>
  );
}
