import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute checks if user is authenticated
export default function ProtectedRoute({ children }) {
  // Example: check localStorage for a token or isLoggedIn flag
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn");

  if (!isAuthenticated) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // Render children if authenticated
  return children;
}