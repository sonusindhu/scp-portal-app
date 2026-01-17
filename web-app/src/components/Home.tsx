import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/app/company/list" />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default Home;
