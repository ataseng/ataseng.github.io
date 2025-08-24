// src/auth/RequireAuth.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthCtx } from "./AuthProvider";

export default function RequireAuth({ mustBeVerified = false }) {
  const { user } = useAuthCtx();

  if (!user) return <Navigate to="/login" replace />;
  if (mustBeVerified && !user.email_verified) return <Navigate to="/verify-email" replace />;

  return <Outlet />;
}
