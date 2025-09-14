import React, { useState, useEffect, Suspense } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import AppHeader from "./layouts/AppHeader/AppHeader";
import Loader from "./shared/components/Loader";
import { ErrorBoundary } from "./ErrorBoundary";
import { routesConfig } from "./app-routes";

const App = () => {
  const [currentUser, setCurrentUser] = useState<any | undefined>(undefined);
  const [theme, setTheme] = useState<string>("light");
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) setCurrentUser(user);

    const handleLogout = () => logOut();
    EventBus.on("logout", handleLogout);

    return () => EventBus.remove("logout", handleLogout);
  }, [navigate]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/auth/login");
  };

  return (
    <div className={`app-root theme-${theme}`}>
      { currentUser ? <AppHeader onLogout={logOut} /> : null }
      <div className="app-container">
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            {useRoutes(routesConfig)}
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
