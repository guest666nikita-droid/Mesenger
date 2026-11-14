importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB8abx-xLG-SUevMlLXVq8ITjHZLkfmacY",
  authDomain: "masenger-656fe.firebaseapp.com",
  projectId: "masenger-656fe",
  storageBucket: "masenger-656fe.firebasestorage.app",
  messagingSenderId: "312081552783",
  appId: "1:312081552783:web:6cfda43e4e631d0bdd67fa"
});

// Уведомления с полем notification показывает сам Firebase.
firebase.messaging();

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => l.length ? l[0].focus() : clients.openWindow('./')));
});
