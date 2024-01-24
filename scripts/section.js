import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs ,updateDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

 


   const db = getFirestore();
   const auth=getAuth();
   
   
   var one=document.querySelector("#up");//span for upvotes
   var two=document.querySelector("#down");//span for downvotes
   const b2=document.querySelector("#bcc");//button to confirm item
   let lid;
   let did;
   const bu=document.querySelector("#iu");//for likes
const bd=document.querySelector("#idd");//for dislikes
 //to get itemid from url hence data from database 
  const searchResults=JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get("search")));
  console.log(searchResults);
  let  docRef = doc(db, "itemlist", searchResults);
  //getting subcollections liked unliked
  const collec=collection(docRef,"liked");
  const collec2=collection(docRef,"unliked");
  const docSnap = await getDoc(docRef);
  const docSnap1 = await getDocs(collec);
  const docSnap2 = await getDocs(collec2);  
            
 
  if (docSnap.exists()) {
    var data= docSnap.data()
    console.log("Document data:",data);
    Image=document.querySelector("#im");
    Image.src= data["imgUrl"];
    const h3=document.querySelector("h3");
    h3.innerText=`ItemName: ${data["itemName"]} `;
    const h2=document.querySelector("h2");

    h2.innerText=`Rs. ${data["itemPrice"]} per day/-`;
    const h4=document.querySelector("h4");
    
    h4.innerText=`Available For: ${data["idays"]} days`;
    const h5=document.querySelector("h5");
    const p=document.querySelector("p");
    p.innerHTML=`<b>Item Description</b> ${data["des"]}`;
    
    
    
    one.innerText=(data["upv"]);
    two.innerText=(data["dnv"]);
    //console.log(one.innerText);
    //console.log(typeof(one.innerText))
    if( data["istat"]==="Unavailable"){
      b2.disabled="true"
      stat.innerHTML="<b><u>ITEM PURCHASED STATUS UNAVAILABLE</u></b>"
    }
    const votedbtn=document.querySelector(".voted")
    //checking each data of the subcollections to check if user has voted or not
    docSnap1 .forEach(async(doc) => {
      let d=doc.data();
      onAuthStateChanged(auth,async(user)=>{
        if(user){
        const id=user.uid;//if user rented not showing options to vote by hiding
        if(id===d["uid"]){
          bu.classList.add("hide")
          bd.classList.add("hide")
          votedbtn.classList.remove("hide");
          
        }}
      })});
      docSnap2 .forEach(async(doc) => {
        let d2=doc.data();
        onAuthStateChanged(auth,async(user)=>{
          if(user){
          const id=user.uid;//if user has voted not showing options to vote by hiding
          if(id===d2["uid"]){
            bu.classList.add("hide");
            bd.classList.add("hide");
            votedbtn.classList.remove("hide");
           
          }}
        })})
      
   
      Contact(data["userid"])
   
    



  }

  async function Contact(uid){
    
    var  Ref = doc(db, "userlist", uid);
    const docSnap1 = await getDoc(Ref);
    if (docSnap1.exists()) {
      let data= docSnap1.data()
    console.log("Document data:",data);
    
    const un=document.querySelector("#un");
    un.innerText=`USERNAME:${data["username"]}`
      const f=document.querySelector("#fl");
      f.innerText=`FULLNAME: ${data["firstname"]}` 
      const  c=document.querySelector("#c");
      c.innerText=`CONTACT ME AT :${data["contact"]}`;
      const e=document.querySelector("#e");
      e.innerText=`EMAIL : ${data["email"]}`
     onAuthStateChanged(auth,async(user)=>{
        if(user){
        const id=user.uid;
        if(id===uid){
          alert("you are the owner of this product")
          b2.disabled="true"
        }}
      })

  }

  
  const cd=document.querySelector(".cont");
 const sec=document.querySelector("#sec");
 // selecting buy now button and opening popup
const b1=document.querySelector("#bnb");

b1.addEventListener("click",function openpop(){
 
  cd.classList.add("open");
  sec.classList.toggle("active");//make surrounding blur when pop up open
 
 })
 

 
 b2.addEventListener("click",
 async function closepop(){
  //alert("your item confirmed");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      var id = user.uid;
      console.log(id);
      //const rentId=data["userid"];}
    
  const r=doc(db,"userlist",id);
  const collec=collection(r,"bought");//storing user's purchase details
  //const collec2=collection(Ref,"rented");

  await addDoc(collec,{
    itemid:searchResults
  });
  let currentDate = new Date();//Date function to create a object
  let cDay = currentDate.getDate();//gives day of the from 1-31
  let cMonth = currentDate.getMonth() + 1;//gives month from 0-11
  let cYear = currentDate.getFullYear();//provides current year
  
  const c= cDay + "/" + cMonth + "/" + cYear
  await updateDoc(docRef,{
    purchase:id,
    istat:"Unavailable",
    purchaseOn:c
  });
  
    alert("your item confirmed pay the renter")
    b2.disabled=true;
   
  const stat=document.querySelector("#stat")
   stat.innerHTML="<b><u>ITEM PURCHASED STATUS UNAVAILABLE</u></b>"
    }
   
  })
 
 
})
const chat=document.querySelector("#chat");
  chat.addEventListener("click",()=>{
    window.location.href=`../html files/contact.html?id=${encodeURIComponent(JSON.stringify(searchResults))}` 
  })
//window.location.href=`../html files/contact.html?id=${encodeURIComponent(JSON.stringify(searchResults))}`
// catch(error){
//Window.location.href("../html files/contact.html")
 
const b3=document.querySelector("#bnc")
b3.addEventListener("click",()=>{
cd.classList.remove("open")
sec.classList.remove("active")})}//closing pop up

const sub = document.querySelector("#rev");
const ul1 = document.querySelector("#review");

sub.addEventListener("submit", async (e) => {
  e.preventDefault();
  const txt = document.querySelector("#fa");

  console.log(txt.value);

 

 /* let newRev = document.createElement('li');
  let btag = document.createElement('b');*/
  if(txt.value!==""){
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      var id = user.uid;
      console.log(id);
      let r = doc(db, "userlist", id);
      
      let collec=collection(docRef,"reviews");
      

      const docSnap2 = await getDoc(r);
      if (docSnap2.exists()) {
        var userData = docSnap2.data();
       //let ref = collection(db,  searchResults);
        await addDoc(collec, {
          username:userData.username,
          rev: txt.value,
         uid:id
        });
        alert("Your review has been added successfully. THANK YOU!");
        txt.value = "";
      } else {
        console.log("No user signed in");
      }}})
     

    // Fetch and display all reviews
   await fetchAndDisplayReviews();

        
      
   
    }
    else{
      alert("please enter the valid review")
    }
});
// Initial fetch and display when the page loads
fetchAndDisplayReviews();
async function fetchAndDisplayReviews() {
  
  const querySnapshot=await getDocs(collection(docRef, "reviews")); 
  
    ul1.innerHTML = ""; // Clear the existing list
  
    querySnapshot.forEach((doc) => {
      const reviewData = doc.data();
      let newRev = document.createElement('li');
      newRev.classList.add("reviews")
      let btag = document.createElement('b');
      
      btag.append(reviewData.username);
      newRev.append(btag);
      newRev.append(` - ${reviewData.rev}`);
      
      ul1.appendChild(newRev);  // Append the new review to the existing list
    });
  }
  
  
  

let islike=false;
let isDislike=false;


//handling like unlike btn
const toggleLike=async()=>{
  let up=parseInt(one.innerText); 
  let down=parseInt(two.innerText);
console.log(up);
console.log(down)
  if(islike){
    islike=false;
    
    up-=1;
    bu.classList.remove("bi-hand-thumbs-up-fill")
    bu.classList.add("bi-hand-thumbs-up")

    one.innerText=up
    let id;
    const user=auth.currentUser;
    if(user){
     id=user.uid
    }
     const delref=doc(docRef,"liked",lid);//if user liked already then only it will work
     console.log(lid);
    await updateDoc(delref,{
      uid:null
     
    })
    console.log("removed");
console.log(up)
  }
  else{
    islike=true;
    if(isDislike){
      isDislike=false;
     
      down-=1;
      two.innerText=down
      bd.classList.remove("bi-hand-thumbs-down-fill")
      bd.classList.add("bi-hand-thumbs-down")
      const dref=doc(docRef,"unliked",did);
      console.log(did);
     await updateDoc(dref,{
       uid:null
      
     })
  
    }
    up+=1;
    one.innerText=up
    bu.classList.add("bi-hand-thumbs-up-fill")
    bu.classList.remove("bi-hand-thumbs-up")
    let id;
    const user=auth.currentUser;
    if(user){
     id=user.uid
    }
     
   const add= await addDoc(collec,{
      uid:id
     
    });
  lid=(add).id;
  console.log("added");}
   
  
  await updateDoc(docRef, {
    upv: up,
    dnv:down
  })
  };
 
  



const toggledisLike=async()=>{
  let down=parseInt(two.innerText);
  let up=parseInt(one.innerText);
  if(isDislike){
    isDislike=false;
    //let up=parseInt(one.innerText);
    down-=1;
    two.innerText=down
    console.log(down)
    bd.classList.remove("bi-hand-thumbs-down-fill")
    bd.classList.add("bi-hand-thumbs-down")
    const dref=doc(docRef,"unliked",did);
      console.log(did);
     await updateDoc(dref,{
       uid:null
      
     })
  console.log("deleted")


  }
  else{
    isDislike=true;
    if(islike){
      islike=false;
      
      up-=1;
      one.innerText=up;
      bu.classList.remove("bi-hand-thumbs-up-fill")
      bu.classList.add("bi-hand-thumbs-up")
      const delref=doc(docRef,"liked",lid);
     console.log(lid);  //if clicks again on like remove it and set it to null which was stored
    await updateDoc(delref,{
      uid:null
     
    })
    console.log("removed");

    }
    down+=1;
    two.innerText=down
    bd.classList.add("bi-hand-thumbs-down-fill")
    bd.classList.remove("bi-hand-thumbs-down")
    let id;
    const user=auth.currentUser;
    if(user){
      id=user.uid
     }
      
    const add2= await addDoc(collec2,{
       uid:id
      
     });
   did=(add2).id;
   console.log("added");}
    
    
  
  
  await updateDoc(docRef, {
    upv: up,
    dnv: down
  });
}

 
  
bu.addEventListener("click",async()=>{
 
  await toggleLike();
 
})
 
bd.addEventListener("click",async()=>{
 
  await toggledisLike();
 
});
// for storing renters review
const renters=document.querySelector("#renterrev")
renters.addEventListener("submit", async (e) => {
  e.preventDefault();
  const txt = document.querySelector("#fr");

  console.log(txt.value);

 

  if(txt.value!==""){
    let id;
    const user=auth.currentUser;
    
    if(user){
     id=user.uid
     console.log(id)
    }
      let r = doc(db, "userlist",data["userid"]);
      let r1=doc(db,"userlist",id);
     
      let collec=collection(r,"reviews");
      

      const docSnap2 = await getDoc(r1);
      if (docSnap2.exists()) {
        var userData = docSnap2.data();
       //let ref = collection(db,  searchResults);
        await addDoc(collec, {
          username:userData.username,
          email:userData.email,

          rev: txt.value,
         
        });
        alert("Your review has been added successfully. THANK YOU!");
        txt.value = "";
      }
      else{
        console.log("No user");
      }
      }
    else{
      alert("Please enter a valid review");
    }})

