import React, { useState, Suspense } from "react";
import { useRoutes, useLocation } from "react-router-dom";

import "./App.css";

import AppHeader from "./layouts/AppHeader/AppHeader";
import Loader from "./shared/components/Loader";
import { ErrorBoundary } from "./ErrorBoundary";
import { routesConfig } from "./app-routes";
import { useAuth } from "./hooks";

const App = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = useState<string>("light");

  // Don't show header on public routes (auth pages, home page)
  const isPublicRoute = location.pathname === "/" || location.pathname.startsWith("/auth");
  const shouldShowHeader = isAuthenticated && !isPublicRoute;

  return (
    <div className={`app-root theme-${theme}`}>
      { shouldShowHeader ? <AppHeader onLogout={logout} /> : null }
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
