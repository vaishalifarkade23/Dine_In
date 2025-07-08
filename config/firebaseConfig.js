// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiP6uEJjhtT3G5VQauM3zkEIOrHoJMaLQ",
  authDomain: "dinein-46fb1.firebaseapp.com",
  projectId: "dinein-46fb1",
  storageBucket: "dinein-46fb1.firebasestorage.app",
  messagingSenderId: "445719560457",
  appId: "1:445719560457:web:54c5c1a5cf22831d1c93d8",
  measurementId: "G-FPMH83N9NJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);