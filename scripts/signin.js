import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,browserSessionPersistence,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

  const auth = getAuth();
 
 // /log in
const loginform=document.querySelector("#loginform")
loginform.addEventListener("submit",(e)=>{
  e.preventDefault()
  const email=loginform.elements.e.value;
  const password=loginform.elements.p.value;
  signInWithEmailAndPassword(auth, email, password)

.then((userCredential) => {
  // Signed in 
  console.log("logged in")
  console.log(userCredential.user)
  alert("User Loggin In Successfully")
  

window.location.assign("../html files/about.html")

  // ...
})
.catch((error) => {
  
  console.log( error.message)
  alert("Failed To Login Incorrect Credentials")
});

  
})
