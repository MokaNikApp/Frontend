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

// Background message handler — shows a native OS notification
messaging.onBackgroundMessage((payload) => {
  const { title = "New notification", body = "" } = payload.notification ?? {};
  self.registration.showNotification(title, {
    body,
    icon: "/logo192.png", // swap for your app icon
    data: payload.data,
  });
});