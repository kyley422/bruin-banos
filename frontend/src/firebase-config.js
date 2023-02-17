// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCydAqLMHCyf_dRYKaVphUwXjL-3a6ki7U",
  authDomain: "bruin-banos.firebaseapp.com",
  projectId: "bruin-banos",
  storageBucket: "bruin-banos.appspot.com",
  messagingSenderId: "244737920627",
  appId: "1:244737920627:web:4b090fc7bdf1b9fe98a406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();