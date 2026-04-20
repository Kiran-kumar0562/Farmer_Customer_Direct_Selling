import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("access");
  const userRole = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ Wrong role
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  // ✅ allowed
  return children;
}

export default ProtectedRoute;