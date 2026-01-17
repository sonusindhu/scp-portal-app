import React, { useState, Suspense } from "react";
import { useRoutes } from "react-router-dom";

import "./App.css";

import AppHeader from "./layouts/AppHeader/AppHeader";
import Loader from "./shared/components/Loader";
import { ErrorBoundary } from "./ErrorBoundary";
import { routesConfig } from "./app-routes";
import { useAuth } from "./hooks";

const App = () => {
  const { currentUser, logout } = useAuth();
  const [theme, setTheme] = useState<string>("light");

  return (
    <div className={`app-root theme-${theme}`}>
      { currentUser ? <AppHeader onLogout={logout} /> : null }
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
