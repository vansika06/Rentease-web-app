
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp =  initializeApp({
  apiKey: "AIzaSyAB5fB5iz6u0Dqyu22VnalRgvZOLFZnmAw",
  authDomain: "rentease-1baab.firebaseapp.com",
  projectId: "rentease-1baab",
  storageBucket: "rentease-1baab.appspot.com",
  messagingSenderId: "741274460827",
  appId: "1:741274460827:web:5b0682441ee7ffae3d9c3e"
});

