import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user, hasRole } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0) {
    const allowed = roles.some((r) => hasRole(r));
    if (!allowed) return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
