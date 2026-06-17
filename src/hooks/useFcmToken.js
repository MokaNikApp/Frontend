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
        setError("This browser does not support notifications.");
        return;
      }

      const result = await Notification.requestPermission();
      setPermission(result);

      if (result !== "granted") {
        setError("Notification permission was not granted.");
        return;
      }

      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

      const messaging = getFirebaseMessaging();
      if (!messaging) {
        setError("Firebase messaging is not supported in this browser.");
        return;
      }

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
    const messaging = getFirebaseMessaging();
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground push received:", payload);
      setLastMessage(normalizeFcmPayload(payload));
    });

    return () => unsubscribe();
  }, []);

  // Auto-restore token if permission was already granted on a previous visit
  useEffect(() => {
    if (permission === "granted" && !token) {
      requestPermissionAndToken();
    }
  }, []);  // run once on mount

  return { token, permission, error, lastMessage, requestPermissionAndToken };
}