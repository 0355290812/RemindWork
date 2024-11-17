
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCEfeTUDpM-yBy-s51yKQAAHeVxWDfPYcg",
    authDomain: "remindwork-e38ab.firebaseapp.com",
    projectId: "remindwork-e38ab",
    storageBucket: "remindwork-e38ab.appspot.com",
    messagingSenderId: "745496361944",
    appId: "1:745496361944:web:7aeb0f6422070fb50a10ad",
    measurementId: "G-CV3VM0X3C0"
});

const messaging = getMessaging(firebaseApp);

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    window.self.registration.showNotification(notificationTitle, notificationOptions);
});