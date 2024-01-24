import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
const auth=getAuth();
const db=getFirestore();
const Results=JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get("id")));
console.log(Results);
const contact=document.querySelector("#contact");
contact.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const txt = document.querySelector("#msg");
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          var id = user.uid;
          console.log(id);
     // const r=doc(db,"messages");
      const r2=collection(db,"messages");
      const r1=doc(db,"userlist",id);
      const r3=doc(db,"itemlist",Results
        )
     const ref= await getDoc(r1);
     const data=ref.data();
     const name=data["username"];
     const ref2= await getDoc(r3);
     const data2=ref2.data();
     const rentid=data2["userid"];
     const collec1=collection(db, "renters");
     const querySnapshot = await getDocs(collection(db, "renters"));
    
     //const collec1=collection(db,"messages");
      //const collec=collection(r1,"messages");
          //const collec2=collection(r2,"itemmsg");
    
      await addDoc(r2,{
        itemid:Results,
        userid:id,
        username:name,
        renter:rentid,
        msg:txt.value,
        reply:"no reply yet"

      });
      alert("added");
      querySnapshot.forEach(async(doc) => {
        let data= doc.data()
        if(data["rentid"]===rentid);
        const newRef=collection(collec1,"itemmsg");
        await addDoc(r2,{
         itemid:Results,
         userid:id,
         username:name,
         renter:rentid,
         msg:txt.value,
          reply:"no reply yet"
       });
        ;
  });
      
      // await addDoc(collec2,{
      //   itemid:Results,
      //   uid:id,
      //   username:name,
      //   renter:rentid,
      //   msg:txt.value

      // });
      alert("added");
      window.location.assign("../html files/about.html");}})
      
     
    
      
})
