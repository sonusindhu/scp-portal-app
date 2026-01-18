import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { ROUTES } from "../utils/constants.util";

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.COMPANY_LIST} />;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default Home;
