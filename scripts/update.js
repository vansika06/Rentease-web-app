import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,collection ,getDocs,getDoc,updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

  
  const auth = getAuth();
  const db=getFirestore();
  onAuthStateChanged(auth,async (user) => {
    
    if (user) {
       
       let docRef = doc(db, "userlist", user.uid);
       console.log(user.uid);
       let ref=collection(docRef,"rented");//getting rented subcollection on that userid
      
        const docSnap = await getDocs(ref);
       
        docSnap .forEach(async(doc) => {
           
           let d=doc.data()
           console.log(d["itemid"])
         
           display(d["itemid"])})
        }})
        const maindiv=document.querySelector(".update")
        async function display(itmid){

              let r=doc(db,"itemlist",itmid)
              const docS=await getDoc(r);
              if (docS.exists()) {
                let data= docS.data()
             
              const contdiv=document.createElement("div");
              contdiv.classList.add("card")
             // contdiv.classList.add("col-4")
              contdiv.classList.add("col-lg-3")
              contdiv.classList.add("mt-5")
              contdiv.classList.add("mx-5")
              contdiv.classList.add("cont")
              
              
              const textdiv=document.createElement("div")
              textdiv.classList.add("card-body");
              const iname = document.createElement("h3");
              
             // const btndiv=document.createElement("div")
             // btndiv.classList.add("d-grid");
              //btndiv.classList.add("gap-2");
              //btndiv.classList.add("d-md-block");
              iname.textContent =`Name: ${data.itemName}`;
              const btn=document.createElement("a");
              btn.href="../html files/history.html";
             
              btn.textContent="VIEW DETAILS"
              
              btn.classList.add( "mybutton")
                btn.classList.add("card-link")
              const istat = document.createElement("h4");
              
              
              istat.textContent ="Current Status:";
                var s=document.createElement("span")
                s.classList.add("toggle")
               s.textContent=data.istat;//created a span so  that on toggling availability data changes
               istat.append(s);






              var btn2=document.createElement("a");
             
              btn2.textContent="TOGGLE AVAILABILITY"
           
            btn2.classList.add("mybutton");
            btn2.classList.add("card-link")
           
              const imag = document.createElement("img");
             // imag.classList.add("cardimg");
              imag.classList.add("card-img-top");
              //imag.classList.add("img-fluid");
              imag.src = data["imgUrl"];
             
              const date=document.createElement("h4")
              date.textContent=`rented on: ${data["date"]}`
              btn2.addEventListener("click",async  function togg() {
                const txt = s.textContent;
                console.log(txt)
                if (txt === "Available") {  // toggling the value of span
                  console.log("true")
                  alert("Modified")
                  s.textContent = "Unavailable";
                  
                } else {
                  s.textContent = "Available";
                  alert("Modified")
                }
                await updateDoc(r, {
                  istat:s.textContent
                });

              })
            
              
            

              textdiv.appendChild(iname);
              textdiv.appendChild(date);
              textdiv.appendChild(istat);
              textdiv.appendChild(btn);
              textdiv.appendChild(btn2);

              
              contdiv.appendChild(imag);
              contdiv.appendChild(textdiv);
              maindiv.appendChild(contdiv)}
              
              else{
               h2.textContent="No Rents Yet!!"
                console.log("no data")
              }
           
        }
        