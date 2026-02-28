import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEkFoOa_F38WPieGSjQLE5ueKaQKW3Euc",
  authDomain: "desibazaar-9a8a3.firebaseapp.com",
  projectId: "desibazaar-9a8a3",
  storageBucket: "desibazaar-9a8a3.firebasestorage.app",
  messagingSenderId: "755463510198",
  appId: "1:755463510198:web:f2ba24d810cef83e896e17"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };