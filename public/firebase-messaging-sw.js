importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAD5fA_NjuZerOt_YNDQ3vLSOMK-Jbb7sY",
  authDomain: "mokanik-app.firebaseapp.com",
  projectId: "mokanik-app",
  storageBucket: "mokanik-app.firebasestorage.app",
  messagingSenderId: "462229284274",
  appId: "1:462229284274:web:1a422e2f4b0e6ca48770ab",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? "New notification";
  const body  = payload.notification?.body  ?? "";
  self.registration.showNotification(title, {
    body,
    icon: "/logo192.png",
    data: payload.data ?? {},
  });
});