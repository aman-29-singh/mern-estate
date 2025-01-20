// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-13b74.firebaseapp.com",
  projectId: "mern-estate-13b74",
  storageBucket: "mern-estate-13b74.firebasestorage.app",
  messagingSenderId: "820592207196",
  appId: "1:820592207196:web:096bd1791cea72d4b60d99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/*
weneed to crete project in google firebase this above code comes from project of google firebase
and we have to install i.e npm install firebase in client terminal and avove apiKey is secured in 
.env file with VITE_FIREBASE_API_KEY */