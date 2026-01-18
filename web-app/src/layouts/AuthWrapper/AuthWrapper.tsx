import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";
import Loader from "../../shared/components/Loader";

const AuthWrapper = memo(() => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />; // Use proper Loader component for consistent UX
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
});

AuthWrapper.displayName = 'AuthWrapper';

export default AuthWrapper;
