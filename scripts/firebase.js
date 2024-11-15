
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp =  initializeApp({
  apiKey: "AIzaSyCNqAFMQWq_X3UrA0au5OtbrLV1cFFc650",
  authDomain: "rent-8401c.firebaseapp.com",
  projectId: "rent-8401c",
  storageBucket: "rent-8401c.firebasestorage.app",
  messagingSenderId: "650110761056",
  appId: "1:650110761056:web:52b6f3afd59ba3756e2b05"
});

