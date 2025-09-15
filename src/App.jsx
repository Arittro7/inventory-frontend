import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Inventories from "./pages/Inventories";
import Items from "./pages/Items";
import ProtectedRoute from "./components/ProtectedRoute";
import GenerateToken from "./components/GenerateToken";
import AggregatedResults from "./components/AggregatedResults";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1 className="p-6">Dashboard</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventories"
          element={
            <ProtectedRoute>
              <Inventories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          }
        />


        {/* Odoo routes */}
        <Route
          path="/token"
          element={
            <ProtectedRoute>
              <GenerateToken />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aggregate"
          element={
            <ProtectedRoute>
              <AggregatedResults />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}
