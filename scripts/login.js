import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,collection } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
`` 
  const auth = getAuth();
  let signupForm=document.querySelector("#sub");
  const db=getFirestore();
  let ref;

// sign in a user
signupForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const email=signupForm.elements.e.value;
  const password=signupForm.elements.p.value;
  createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    //const user = userCredential.user;
    console.log("in");
    ref=doc(db,"userlist",userCredential.user.uid)
    
    console.log(userCredential.user.uid);
    await setDoc(ref,{
      username:signupForm.elements.u.value,
      email:String(signupForm.elements.e.value),
      contact:String(signupForm.elements.c.value),
      firstname:signupForm.elements.f.value,
      lastname:signupForm.elements.l.value
 
    })
    window.location.assign("../html files/about.html")
    

   
   
  })
  .catch((error) => {
    alert(error.message);
    console.log(error.message);
    console.log("out");
   
  })
 
  
});

  
 
