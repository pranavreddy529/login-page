// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnR3xML5RyZf9XboEtjYposc9xFTT5x5w",
  authDomain: "login-page-d74a9.firebaseapp.com",
  projectId: "login-page-d74a9",
  storageBucket: "login-page-d74a9.firebasestorage.app",
  messagingSenderId: "360861591030",
  appId: "1:360861591030:web:6f000e38d4c54b49c913d7",
  measurementId: "G-CMWJJP09PY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 

export {auth};