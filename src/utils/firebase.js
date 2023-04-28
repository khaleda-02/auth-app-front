// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9cKlnuOkKAUFwcjp97MrqG2Ghj5llUzU",
  authDomain: "auth-app-6152d.firebaseapp.com",
  projectId: "auth-app-6152d",
  storageBucket: "auth-app-6152d.appspot.com",
  messagingSenderId: "227637409769",
  appId: "1:227637409769:web:ce019f79cc3b0960833d78",
  measurementId: "G-J6WPCM1QGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();