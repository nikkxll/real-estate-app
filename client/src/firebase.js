import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "nikkel-estate.firebaseapp.com",
  projectId: "nikkel-estate",
  storageBucket: "nikkel-estate.appspot.com",
  messagingSenderId: "511379285735",
  appId: "1:511379285735:web:a2762e0448d4e903b5a442"
};

export const app = initializeApp(firebaseConfig);