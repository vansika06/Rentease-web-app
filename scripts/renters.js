import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,collection ,getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
const ourrenters=[];

const db=getFirestore();
const Ref=collection(db,"renters");
let docRef;
const docSnap=await getDocs(Ref);
docSnap.forEach(async(docdata) => {
    let i= docdata.data();
    console.log(i);



 
 if(!(ourrenters.includes(i["rentid"]))){
    ourrenters.push(i["rentid"])
 }})
 for (let i of ourrenters){
    docRef=doc(db,"userlist",i)
    const docSnap2 = await getDoc(docRef);  


    let d=docSnap2.data()
    console.log(d);
    
    display(d)   
 }

    async function display(d) {
        const main=document.querySelector(".main")
        const divs=document.createElement("div");
        divs.classList.add("col-md-3");
        divs.classList.add("cont");
       
        const h2=document.createElement("h2");
        h2.innerHTML=`<i></i>`
        h2.classList.add("bi");
        h2.classList.add("bi-person-square");
        h2.textContent=`  ${d["firstname"]} ${d["lastname"]}`;
        console.log(h2);
        const ul=document.createElement("ul");
        ul.classList.add("list-group");
        let ref=collection(docRef,"reviews");
        const docSnap2 = await getDocs(ref);
        console.log(docSnap2.size)
        if (docSnap2.size===0){
            const li=document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent="No reviews yet";
            ul.appendChild(li);
        }
        else{
            docSnap2.forEach(async(doc) => {
                const rev=doc.data();
                console.log(rev)
                const li=document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML=`${rev["username"]}--${rev["rev"]}<br>
                voter's email--${rev["email"]}`;
                ul.appendChild(li)


            }) }
            divs.appendChild(h2)
            divs.appendChild(ul);
            main.appendChild(divs);
        
          
    }