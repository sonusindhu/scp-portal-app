import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { SnackbarUtilConfig } from "./utils/toast.util";

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        hideIconVariant={false}
        autoHideDuration={5000}
      >
        <SnackbarUtilConfig />
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);