if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("[Firebase SW] Registered:", registration.scope);
    })
    .catch((error) => {
      console.error("[Firebase SW] Registration failed:", error);
    });
}