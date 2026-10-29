/* Service worker: offline app shell + Firebase background push. */
import { cleanupOutdatedCaches, precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { firebaseConfig } from "./firebaseConfig";

self.skipWaiting();
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

// ---- Offline caching ----
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

// SPA navigation fallback (never for API calls)
registerRoute(new NavigationRoute(createHandlerBoundToURL("/index.html"), {
  denylist: [/^\/__/, /^\/api\//, /firebase-messaging-sw\.js$/],
}));

registerRoute(({ request }) => request.destination === "image",
  new CacheFirst({ cacheName: "images" }));
registerRoute(({ request }) => request.destination === "font" || request.destination === "style",
  new StaleWhileRevalidate({ cacheName: "static-assets" }));
// API requests (cross-origin backend) are intentionally NOT cached: data stays live.

// ---- Firebase push ----
// getMessaging() throws on iOS versions/contexts without Web Push; if that happens
// uncaught, the WHOLE service worker fails (no offline cache). Guard it.
try {
  const messaging = getMessaging(initializeApp(firebaseConfig));
  onBackgroundMessage(messaging, (payload) => {
    const title = payload.notification?.title || payload.data?.title || "Mokanik";
    self.registration.showNotification(title, {
      body: payload.notification?.body || payload.data?.body || "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: payload.data || {},
    });
  });
} catch (err) {
  console.warn("[SW] Firebase messaging unavailable:", err);
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) if ("focus" in c) { c.navigate?.(url); return c.focus(); }
      return self.clients.openWindow(url);
    })
  );
});
