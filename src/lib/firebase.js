import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYDHX855fspV9qhA_YNe-5gCKsMeEmAUk",
  authDomain: "socials-auth-9f8dc.firebaseapp.com",
  projectId: "socials-auth-9f8dc",
  storageBucket: "socials-auth-9f8dc.appspot.com",
  messagingSenderId: "1090394935455",
  appId: "1:1090394935455:web:0b921905c15302362592aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
