import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

class FirebaseService {
    requestPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            return true;
        } else {
            console.log('Notification permission denied.');
            return false;
        }
    };

    requestForToken = async () => {
        return await getToken(messaging, { vapidKey: "BOXJkAGA464w2OBoYtO-7JIyN9m1GmT_weNzUKkeTVGTxn-vyUESTh-wG_2wRkO8i6zs7J1qAXjm_dqBIyn3Dk8" })
            .then((currentToken) => {
                if (currentToken) {
                    console.log("Current token for client: ", currentToken);
                    return currentToken;
                } else {
                    console.log("No registration token available. Request permission to generate one.");
                    return null;
                }
            })
            .catch((err) => {
                console.error("An error occurred while retrieving token: ", err);
                return null;
            });
    };

    onMessageListener = () =>
        new Promise((resolve) => {
            onMessage(messaging, (payload) => {
                console.log("Message received: ", payload);
                resolve(payload);
            });
        });
}


const firebaseService = new FirebaseService();
export default firebaseService;
