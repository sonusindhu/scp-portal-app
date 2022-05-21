import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { SnackbarUtilConfig } from "./utils/toast.util";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// serviceWorker.unregister();
