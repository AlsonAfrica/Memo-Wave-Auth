// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaXW5qNZN1t-oNKJiB6f8-SS6IPzPo1S0",
  authDomain: "react-native-firebase-9913f.firebaseapp.com",
  projectId: "react-native-firebase-9913f",
  storageBucket: "react-native-firebase-9913f.firebasestorage.app",
  messagingSenderId: "746389986645",
  appId: "1:746389986645:web:e8a52c43a17be35770a3dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)