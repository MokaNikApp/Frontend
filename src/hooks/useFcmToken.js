import { useEffect, useState, useCallback } from "react";
import { getFirebaseMessaging, getToken, onMessage, VAPID_KEY } from "../firebase";

function normalizeFcmPayload(payload) {
  return {
    id:
      payload?.messageId ||
      payload?.data?.messageId ||
      `${Date.now()}-${Math.random()}`,
    notification: {
      title: payload?.notification?.title || payload?.data?.title || null,
      body:  payload?.notification?.body  || payload?.data?.body  || null,
    },
    data: payload?.data ?? {},
    raw:  payload,
  };
}

export function useFcmToken() {
  const [token, setToken] = useState(null);
  const [permission, setPermission] = useState(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : null
  );
  const [error, setError]           = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  const requestPermissionAndToken = useCallback(async () => {
    try {
      setError(null);

      if (!("Notification" in window)) {
        const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
        setError(
          isIOS
            ? "On iPhone, tap Share → Add to Home Screen, then open the app from your home screen to enable notifications."
            : "This browser does not support notifications."
        );
        return;
      }

      const result = await Notification.requestPermission();
      setPermission(result);

      if (result !== "granted") {
        setError("Notification permission was not granted.");
        return;
      }

      const messaging = await getFirebaseMessaging();
      if (!messaging) {
        setError("Push notifications aren't supported on this device/browser.");
        return;
      }

      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

      const fcmToken = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (fcmToken) {
        setToken(fcmToken);
      } else {
        setError("No registration token available. Try again.");
      }
    } catch (err) {
      setError(err?.message || "Unknown error retrieving FCM token.");
    }
  }, []);

  // Listen for foreground messages
  useEffect(() => {
    let unsubscribe = null;
    let cancelled = false;
    (async () => {
      const messaging = await getFirebaseMessaging();
      if (!messaging || cancelled) return;
      unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push received:", payload);
        setLastMessage(normalizeFcmPayload(payload));
      });
    })();
    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Auto-restore token if permission was already granted on a previous visit
  useEffect(() => {
    if (permission === "granted" && !token) {
      requestPermissionAndToken();
    }
  }, []);  // run once on mount

  return { token, permission, error, lastMessage, requestPermissionAndToken };
}