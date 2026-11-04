// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGpY8DMkFYAwr_DkL5nMwXkqh0kc_lSaY",
  authDomain: "practice-ac721.firebaseapp.com",
  projectId: "practice-ac721",
  storageBucket: "practice-ac721.firebasestorage.app",
  messagingSenderId: "842073114178",
  appId: "1:842073114178:web:cd9b4d4fdc535108190fdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export {auth, db};
