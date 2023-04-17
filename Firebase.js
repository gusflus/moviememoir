// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { FIREBASE_API_KEY } from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "moviememoir-81f83.firebaseapp.com",
  projectId: "moviememoir-81f83",
  storageBucket: "moviememoir-81f83.appspot.com",
  messagingSenderId: "154291335330",
  appId: "1:154291335330:web:5d5db287f8d94aeecc67fb",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
