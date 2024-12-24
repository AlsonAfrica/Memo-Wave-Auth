import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaXW5qNZN1t-oNKJiB6f8-SS6IPzPo1S0",
  authDomain: "react-native-firebase-9913f.firebaseapp.com",
  projectId: "react-native-firebase-9913f",
  storageBucket: "react-native-firebase-9913f.appspot.com", // Corrected typo
  messagingSenderId: "746389986645",
  appId: "1:746389986645:web:e8a52c43a17be35770a3dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };

