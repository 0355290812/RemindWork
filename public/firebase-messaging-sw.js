// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCEfeTUDpM-yBy-s51yKQAAHeVxWDfPYcg",
    authDomain: "remindwork-e38ab.firebaseapp.com",
    projectId: "remindwork-e38ab",
    storageBucket: "remindwork-e38ab.appspot.com",
    messagingSenderId: "745496361944",
    appId: "1:745496361944:web:7aeb0f6422070fb50a10ad",
    measurementId: "G-CV3VM0X3C0"
});

const messaging = firebase.messaging();

// Xử lý thông báo khi nhận
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);
    // Tùy chỉnh hiển thị thông báo
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});