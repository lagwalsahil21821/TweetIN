// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeiCoVJfLg8kfAAL3ge9HDvpowAlrvhLo",
  authDomain: "social-media-clone-e0d0a.firebaseapp.com",
  projectId: "social-media-clone-e0d0a",
  storageBucket: "social-media-clone-e0d0a.appspot.com",
  messagingSenderId: "259982067635",
  appId: "1:259982067635:web:9840c0af89d9dd253c6dc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();