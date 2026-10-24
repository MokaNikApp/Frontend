import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getMessaging, getToken, onMessage } from "firebase/messaging";



export const VAPID_KEY =
  "BK0lCAt4ZojuZua0-diEqo0RoKXHX6gjCJJzw7Uzln8QtM5z-vqBBKMsFiFYM_Zj9op9zQ1CKueURdVpJiwyyTI";

const app = initializeApp(firebaseConfig);

let messagingInstance = null;

export function getFirebaseMessaging() {
  if (typeof window === "undefined") return null;
  if (!("serviceWorker" in navigator)) return null;
  if (!messagingInstance) {
    messagingInstance = getMessaging(app);
  }
  return messagingInstance;
}

export { getToken, onMessage };
export default app;