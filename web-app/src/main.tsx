import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from "./ErrorBoundary";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilConfig } from "./utils/toast.util";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          hideIconVariant={false}
          autoHideDuration={5000}
        >
          <SnackbarUtilConfig />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
