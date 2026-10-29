import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";



export const VAPID_KEY =
  "BK0lCAt4ZojuZua0-diEqo0RoKXHX6gjCJJzw7Uzln8QtM5z-vqBBKMsFiFYM_Zj9op9zQ1CKueURdVpJiwyyTI";

const app = initializeApp(firebaseConfig);

let messagingInstance = null;

/**
 * Returns the Firebase Messaging instance, or null when push isn't available.
 * iPhone Safari (in a normal tab) and iOS < 16.4 have no PushManager/Notification,
 * so getMessaging() THROWS there. Always go through this helper.
 */
export async function getFirebaseMessaging() {
  try {
    if (typeof window === "undefined") return null;
    if (!("serviceWorker" in navigator)) return null;
    if (!(await isSupported())) return null;
    if (!messagingInstance) messagingInstance = getMessaging(app);
    return messagingInstance;
  } catch (err) {
    console.warn("[FCM] messaging unavailable:", err?.message || err);
    return null;
  }
}

export { getToken, onMessage };
export default app;