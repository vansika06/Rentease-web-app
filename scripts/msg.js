import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
const db=getFirestore();
const auth=getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
      var id = user.uid;
      console.log(id);
      var docRef = collection(db, "messages");
      //ref=collection(docRef,"rented");
      const docSnap = await getDocs(docRef);
      docSnap.forEach(async(doc) => {
        const data=doc.data();
        if(data["userid"]===id){
       
        const li=document.createElement("li");
        li.classList.add("list-group-item");
        const btn=document.createElement("button");
           btn.classList.add("btn");
           btn.classList.add("btn-warning");
           btn.textContent="View Product";
           btn.addEventListener("click", function() {
            // Extract the id associated with the clicked button
            
            view(data["itemid"]);})
            const msg=document.createElement("h2");

           msg.textContent=`Your message---${data["msg"]}`;
           const reply=document.createElement("h2");
           reply.textContent=`Reply received--${data["reply"]}`;
        li.appendChild(btn);
        li.appendChild(msg);
        li.appendChild(reply);
        const ul=document.querySelector("#yourmsg")
        ul.appendChild(li) }
      else if(data["renter"]===id){
        console.log("running")
        const rents=document.querySelector("#rentmsg");
        const li=document.createElement("li");
        li.classList.add("list-group-item");
        const btn=document.createElement("button");
           btn.classList.add("btn");
           btn.classList.add("btn-warning");
           btn.textContent="View Product";
           btn.addEventListener("click", function() {
            // Extract the id associated with the clicked button
            
            view(data["itemid"]);})
            const user=document.createElement("h2");
            user.textContent=`Username--${data["username"]}`;
            console.log(user)
            const msg=document.createElement("h2");

           msg.textContent=`Message---${data["msg"]}`;
           console.log(msg);
        li.appendChild(btn);
        li.appendChild(user);

        li.appendChild(msg);
        const h2=document.createElement("h2");
            h2.textContent="REPLY"
        //const form=document.createElement("form");
       const inputText = document.createElement("input");
        inputText.setAttribute("type", "text");
        //const text=document.createElement("textarea");
        console.log(li);
        inputText.classList.add("form-control");
        const btn2=document.createElement("button");
        btn2.classList.add("btn");
        btn2.classList.add("btn-warning");
        btn2.textContent="SUBMIT";
        btn2.setAttribute("type", "submit");
        //li.appendChild(inputText);
        //li.appendChild(btn2);
        btn2.addEventListener("submit",async(e)=>{
          e.preventDefault();
          if(inputText.value!==""){
            const ref=doc(db,"messages",doc.id)
            await updateDoc(ref,{
              reply:text
            });
            li.appendChild(h2);
           // li.appendChild(form);
            rents.appendChild(li);
          }
        })
      }})}})
      function view(id) {
        window.location.href = `../html files/section.html?search=${encodeURIComponent(JSON.stringify(id))}`
      }
      