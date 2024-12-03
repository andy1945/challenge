import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Clients from "./pages/Clients/index.jsx";
import AdminDashboard from "./pages/Admin/index.jsx";
import Login from "./pages/Login/index.jsx";

// Session check function
const isSessionExpired = () => {
  const expiry = localStorage.getItem("expiry");
  const currentTime = Math.floor(Date.now() / 1000);
  return expiry && currentTime >= expiry;
};

const ProtectedRoute = ({ element, rolesAllowed }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (isSessionExpired()) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (!rolesAllowed.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/clients"} />;
  }

  // Render the protected component
  return element;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Redirect root ("/") to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/clients"
          element={
            <ProtectedRoute
              element={<Clients />}
              rolesAllowed={["user", "admin"]} // Allow both user and admin
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              rolesAllowed={["admin"]}
            />
          }
        />
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
