import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, writeBatch, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJiUS7KvK6rEJwzGev03S_Y8X36RDCoFs",
    authDomain: "task-manager-f1871.firebaseapp.com",
    projectId: "task-manager-f1871",
    storageBucket: "task-manager-f1871.firebasestorage.app",
    messagingSenderId: "60526983179",
    appId: "1:60526983179:web:ae07b9b74164152d032f0e",
    measurementId: "G-YY8LDMCT7H"
  };

  const app = initializeApp(firebaseConfig);

  // ✅ Initialize Firestore
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  export { db,auth, collection, getDocs, doc, updateDoc, writeBatch, addDoc };