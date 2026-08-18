// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-d1232.firebaseapp.com",
  projectId: "mern-project-d1232",
  storageBucket: "mern-project-d1232.firebasestorage.app",
  messagingSenderId: "209556877516",
  appId: "1:209556877516:web:b87d3616abc13c947d9269"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);