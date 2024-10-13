import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../../services/auth.service";

const AuthWrapper = () => {
  const user = AuthService.getCurrentUser();
  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};
export default AuthWrapper;
