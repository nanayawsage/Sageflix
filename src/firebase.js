


  import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyA5QtrkNWakHpBKHNJ2w-0QAEYWtZUO3JQ",
  authDomain: "sageflix.firebaseapp.com",
  projectId: "sageflix",
  storageBucket: "sageflix.appspot.com",
  messagingSenderId: "652465226445",
  appId: "1:652465226445:web:8e5d693414a23972411f84",
  measurementId: "G-F30X05F63N"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore and export it