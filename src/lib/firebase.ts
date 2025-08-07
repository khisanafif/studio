// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "gigconnect-b4xfl",
  "appId": "1:568220407632:web:c9dadf75f39e8f0062be55",
  "storageBucket": "gigconnect-b4xfl.appspot.com",
  "apiKey": "AIzaSyAMFoxemj_T-ZgNn0wN-uwAHhFYgZXey3Q",
  "authDomain": "gigconnect-b4xfl.firebaseapp.com",
  "messagingSenderId": "568220407632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };