import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const api_key = import.meta.env.VITE_API_KEY;
const senderID = import.meta.env.VITE_SENDER_ID;
const applicationID = import.meta.env.VITE_APP_ID;
const measurementID = import.meta.env.VITE_MEASUREMENT_ID;

// Web App's configuration
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "snugglemeet.firebaseapp.com",
  projectId: "snugglemeet",
  storageBucket: "snugglemeet.firebasestorage.app",
  messagingSenderId: senderID,
  appId: applicationID,
  measurementId: measurementID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export { app, auth };
