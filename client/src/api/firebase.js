import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web App's configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoHaomXwtrwRCTtzdwYMw9dn7_DB7Gcv4",
  authDomain: "snugglemeet.firebaseapp.com",
  projectId: "snugglemeet",
  storageBucket: "snugglemeet.firebasestorage.app",
  messagingSenderId: "961468684328",
  appId: "1:961468684328:web:3dd650265ad1e791813d1d",
  measurementId: "G-Z7Z24GJS8C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
