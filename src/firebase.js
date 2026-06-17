import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAD5fA_NjuZerOt_YNDQ3vLSOMK-Jbb7sY",
  authDomain: "mokanik-app.firebaseapp.com",
  projectId: "mokanik-app",
  storageBucket: "mokanik-app.firebasestorage.app",
  messagingSenderId: "462229284274",
  appId: "1:462229284274:web:1a422e2f4b0e6ca48770ab",
  measurementId: "G-RBV5XDKB7W",
};

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