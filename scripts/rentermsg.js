import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
const db=getFirestore();
const auth=getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
      var id = user.uid;
      console.log(id);
      var docRef = collection(db, "renters");
      
      const docSnap = await getDocs(docRef);
      docSnap.forEach(async(doc) => {
        const data=doc.data();
        if(data["rentid"]===id){
            let rentRef=doc(db,"renters")
            let ref=collection(docRef,"rented")//getting subcollections
            let ref2=collection(docRef,"bought")