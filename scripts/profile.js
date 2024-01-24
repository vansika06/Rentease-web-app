


import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

  const auth = getAuth();
  const db = getFirestore();


var uid;
let data;
    onAuthStateChanged(auth,async (user) => {
       
            if (user) {
                uid= console.log(user.uid);
               let docRef = doc(db, "userlist", user.uid);
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) {
                     data = docSnap.data();
                    console.log("Document data:", data);
                    const form=document.querySelector("#profile")
                    form.elements.u.value=data["username"];
                    form.elements.f.value=`${data["firstname"]} ${data["lastname"]}`;
                    form.elements.c.value=data["contact"];
                    form.elements.e.value=data["email"];
                } 
                else {
                    console.log("Document does not exist");
                    alert("no user");
                }
                
            } else {
               
            }
        });
 
