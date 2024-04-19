// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-egy-estate.firebaseapp.com",
  projectId: "mern-egy-estate",
  storageBucket: "mern-egy-estate.appspot.com",
  messagingSenderId: "1024840009270",
  appId: "1:1024840009270:web:4fc4771026179d9aa9ba97",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
