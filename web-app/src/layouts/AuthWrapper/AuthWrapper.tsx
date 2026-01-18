import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

const AuthWrapper = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or use your Loader component
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};
export default AuthWrapper;
