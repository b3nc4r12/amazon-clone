import { getApps, getApp, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const config = {
    apiKey: "AIzaSyB-yMqcGNCBJV6xtTJneuDj3fAjZ5vBg8U",
    authDomain: "clone-359802.firebaseapp.com",
    projectId: "amazon-clone-359802",
    storageBucket: "amazon-clone-359802.appspot.com",
    messagingSenderId: "296847917235",
    appId: "1:296847917235:web:7552db6e1bcd2c4c1170c6"
}

const app = !getApps().length ? initializeApp(config) : getApp();
export const db = getFirestore(app);