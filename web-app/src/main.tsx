import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from "./ErrorBoundary";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilConfig } from "./utils/toast.util";
import { AuthProvider } from "./hooks";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            hideIconVariant={false}
            autoHideDuration={5000}
          >
            <SnackbarUtilConfig />
            <App />
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
