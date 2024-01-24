import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,collection ,getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
  const auth = getAuth();
  const db=getFirestore();
  let c=1;
  onAuthStateChanged(auth,async (user) => {
    
         if (user) {
            
            let docRef = doc(db, "userlist", user.uid);
            console.log(user.uid)
            let ref=collection(docRef,"rented")//getting subcollections
            let ref2=collection(docRef,"bought")
           const docSnap = await getDocs(ref);
           console.log(docSnap.size
            )
             const docSnap2 = await getDocs(ref2);  
             if (docSnap.size===0){
              const h2=document.createElement("h2");//if no data rented size of docsnap=0 
              const rent=document.querySelector("#rent");
              h2.textContent="YOU HAVE NOT RENTED ANYTHING YET";
              h2.classList.add("text-center");
              h2.classList.add("my-5");
              rent.appendChild(h2);
              rent.classList.remove("timeline");
             }
             else{
             docSnap .forEach(async(doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let d=doc.data()//getting rented data
                console.log(d);
                console.log(d["itemid"])
                
                display(d["itemid"])})}
                if (docSnap2.size==0){
                  const h=document.createElement("h2");
                  const purchase=document.querySelector("#purchase");
                  h.textContent="YOU HAVE NOT PURCHASED ANYTHING YET";
                  h.classList.add("text-center");
                  h.classList.add("my-5");
                  purchase.appendChild(h);
                  purchase.classList.remove("timeline")
                 }
                else{
                docSnap2 .forEach(async(doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  let d1=doc.data()//getting purchased data
                  console.log(d1["itemid"])
                  console.log(typeof(d1["itemid"]))
                  display2(d1["itemid"])})}}
                  else {
              console.log("no user")
                  }
            });
            const maindiv=document.querySelector("#rent");
            const maindiv2=document.querySelector("#purchase")
          async function display(itmid){

                let r=doc(db,"itemlist",itmid)
                const docS=await getDoc(r);
                if (docS.exists()) {
                  let data1= docS.data()
               console.log(data1)
                const contdiv=document.createElement("div");
                contdiv.classList.add("container")
                if(c%2===1){
                  contdiv.classList.add("left")
                }
                else{
                  contdiv.classList.add("right");
                }
                c++;
                const textdiv=document.createElement("div")
                textdiv.classList.add("text");
                const iname = document.createElement("h3");
                
                
                iname.textContent =`Name: ${data1.itemName}`;
              
                const ipr = document.createElement("h4");
                
                ipr.textContent = `Price: ${data1['itemPrice']}`;
              
                
              
                const imag = document.createElement("img");
                //imag.classList.add("cardimg");
                //imag.classList.add("img-fluid");
                imag.src = data1["imgUrl"];
                const idays=document.createElement("h4");
    
                idays .textContent=`Available For: ${data1["idays"]} days`;
                const date=document.createElement("h4")
                date.textContent=`rented on ${data1["date"]}`
               
                textdiv.appendChild(iname);
                textdiv.appendChild(ipr);
                textdiv.appendChild(idays);
                textdiv.appendChild(date);
                contdiv.appendChild(imag);
                console.log(data1["purchase"])
                if(data1["purchase"]!=="null"){
                  const purId=data1["purchase"];
                  const purchasedOn=document.createElement("h3");
                  purchasedOn.textContent=`Purchased on--${data1["purchaseOn"]}`;
                  console.log(purId);
                  const purchaseRef=doc(db,"userlist",purId);
                  const purchaseDoc=await getDoc(purchaseRef);
                  const purchaseData=purchaseDoc.data();
                  console.log(purchaseData);
                  const pur=document.createElement("h3");
                  pur.textContent=`Purchased by -- ${purchaseData["firstname"]} ${purchaseData["lastname"]}`;
                  const email=document.createElement("h3");
                  email.textContent=`Email -- ${purchaseData["email"]}`;
                  const contact=document.createElement("h3");
                  contact.textContent=`contact-- ${purchaseData["contact"]}`;
                  textdiv.appendChild(pur);
                  textdiv.appendChild(email);
                  textdiv.appendChild(contact);
                  textdiv.appendChild(purchasedOn);
                }
                contdiv.appendChild(textdiv);

                maindiv.appendChild(contdiv)
                }
                else{
                  console.log("no data")
                }
             
              
             
              }  
              let p=1;
              async function display2(prcid){

                let r=doc(db,"itemlist",prcid)
                const docs=await getDoc(r);
               const data=docs.data();
               const r1=doc(db,"userlist",data["userid"])
               const docsnap=await getDoc(r1);
               const rentdata=docsnap.data()
                const contdiv=document.createElement("div");
               
                contdiv.classList.add("container")
                if(p%2===1){
                  contdiv.classList.add("left")
                }
                else{
                  contdiv.classList.add("right");
                }
                p++;
                const textdiv=document.createElement("div")
                textdiv.classList.add("text");
                const iname = document.createElement("h3");
                
                iname.textContent =`Name:${data["itemName"]}`;
              
                const ipr = document.createElement("h4");
                
                ipr.textContent = `Price:${data['itemPrice']}`;
              
                const renter = document.createElement("h4");
                const name=document.createElement("h4");
                
                renter.textContent = `Renter's Email ${rentdata["email"]}`;
                name.textContent=`Renter's Name ${rentdata["firstname"]} ${rentdata["lastname"]}`
                console.log((data["userid"]).email)
              
                const imag = document.createElement("img");
                //imag.classList.add("cardimg");
                //imag.classList.add("img-fluid");
                imag.src = data["imgUrl"];
                const idays=document.createElement("h4");
                const purchased=document.createElement("h3");
                purchased.textContent=`Purchased On--${data["purchaseOn"]}`
                idays .textContent=`Available For: ${data["idays"]} days`;
                const date=document.createElement("h4")
                date.textContent=`rented on ${data["date"]}`
                textdiv.appendChild(iname);
                textdiv.appendChild(ipr);
                textdiv.appendChild(idays);
                textdiv.appendChild(date);
                textdiv.appendChild(name);
                textdiv.appendChild(renter);
                textdiv.appendChild(purchased);
               
                contdiv.appendChild(imag);
                contdiv.appendChild(textdiv);
                maindiv2.appendChild(contdiv)
              
             
              
             
              }     