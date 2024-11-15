import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs,updateDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
const db=getFirestore();
const auth=getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
      var id = user.uid;
      console.log(id);
      var docRef = collection(db, "messages");
      //ref=collection(docRef,"rented");
      const docSnap = await getDocs(docRef);
      docSnap.forEach(async(docs) => {
        const data=docs.data();
<<<<<<< HEAD
        const docid=docs.id;
=======
          const docid=docs.id;
>>>>>>> 7908a1ca55923a8ec158d222edfeca05b63c8c6d
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
          if(data["reply"]==="no reply yet"){
        const h2=document.createElement("h2");
            h2.textContent="REPLY"
        //const form=document.createElement("form");
       const inputText = document.createElement("input");
        inputText.setAttribute("type", "text");
        //const text=document.createElement("textarea");
        console.log(li);
        if(data["reply"]==="no reply yet"){
        inputText.classList.add("form-control");
        const btn2=document.createElement("button");
        btn2.classList.add("btn");
        btn2.classList.add("btn-warning");
        btn2.textContent="SUBMIT";
        btn2.setAttribute("type", "submit");
        const form = document.createElement("form");
        li.appendChild(h2);
<<<<<<< HEAD
  form.appendChild(inputText);
  form.appendChild(btn2);
=======
       form.appendChild(inputText);
     form.appendChild(btn2);
>>>>>>> 7908a1ca55923a8ec158d222edfeca05b63c8c6d
    li.appendChild(form);
    rents.appendChild(li);
        //li.appendChild(inputText);
        //li.appendChild(btn2);
        form.addEventListener("submit",async(e)=>{
          e.preventDefault();
          if(inputText.value!==""){
<<<<<<< HEAD
            const ref1=doc(db,"messages",docid)
            try{
            await updateDoc(ref1,{
              reply:inputText.value
            });
            btn2.disabled=true;}
            catch(error){
              console.log(error);
            }
           // btn2.disabled=true;
           // li.appendChild(form);
            //rents.appendChild(li);
          }
        })}
        rents.appendChild(li);
=======
            const ref=doc(db,"messages",doc.id)
            await updateDoc(ref,{
              reply:inputText.value
            });
           
           // li.appendChild(form);
           // rents.appendChild(li);
          }
        })}
        rents.appendChild(li);  
>>>>>>> 7908a1ca55923a8ec158d222edfeca05b63c8c6d
      }})}})
      function view(id) {
        window.location.href = `../html files/section.html?search=${encodeURIComponent(JSON.stringify(id))}`
      }
      
