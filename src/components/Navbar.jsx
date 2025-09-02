import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // logout
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex gap-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/inventories">Inventories</Link>
      <Link to="/items">Items</Link>
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout} className="ml-auto bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      )}
    </nav>
  );
}
