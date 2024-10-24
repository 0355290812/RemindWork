import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCEfeTUDpM-yBy-s51yKQAAHeVxWDfPYcg",
    authDomain: "remindwork-e38ab.firebaseapp.com",
    projectId: "remindwork-e38ab",
    storageBucket: "remindwork-e38ab.appspot.com",
    messagingSenderId: "745496361944",
    appId: "1:745496361944:web:7aeb0f6422070fb50a10ad",
    measurementId: "G-CV3VM0X3C0"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging };