import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";
import PwaStatus from "./components/pwa/PwaStatus";
import SplashScreen from "./components/pwa/SplashScreen";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <SplashScreen />
        <App />
        <PwaStatus />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);

// PWA: register the service worker (offline cache + Firebase push) once the page has loaded.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .catch((err) => console.error("[SW] Registration failed:", err));
  });
}
