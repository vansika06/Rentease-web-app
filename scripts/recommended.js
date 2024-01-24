import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

  const db = getFirestore();
  const docRef=collection(db,"itemlist")
  let results=[];
  let itemId;
  let counter=0;
  const main=document.querySelector(".contdiv");
   try{
   const q = query(docRef, where("upv", ">=",3));
   const querySnapshot = await getDocs(q);
   console.log( querySnapshot);
   
   querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     itemId=doc.id;
     results.push(doc.data())
    display(doc.data());
   });}
  // window.location.href=`search.html?search=${encodeURIComponent(JSON.stringify(search))}`})
   catch(error){
   console.log(error.message);
   }
   
   
  function display(d){
    const div=document.createElement("div");
    div.classList.add("card");
    div.classList.add("rounded-3")
    div.classList.add("col-lg-3"); 
    div.classList.add("items");
    div.classList.add("text-center");
    div.id=itemId;
   
    const main=document.querySelector(".contdiv");
   
    main.appendChild(div);
    const s=document.createElement("span");
    s.classList.add("badge");
    s.classList.add("bg-warning");
    s.textContent="Top Rated";
    const imgdiv=document.createElement("div");
    imgdiv.classList.add("border");
    imgdiv.classList.add("border-4");
    imgdiv.classList.add("rounded-3");

   const img= document.createElement("img");
   img.src=d["imgUrl"];
   img.classList.add("image-fluid");
   img.classList.add("w-100");
   imgdiv.appendChild(img);
   const Divcont=document.createElement("div");

   
   const h5=document.createElement("h5");
   h5.textContent=d["itemName"];
   const h4=document.createElement("h4");
   h4.textContent=d["istat"];
   if (d["istat"]=="Unavailable"){
    h4.classList.add("red")
  }
  else{
    h4.classList.add("green")
  }
   const p=document.createElement("b");
   //p.classList.add("lead");
   p.textContent=`LIKES FOR THE ITEM--${d["upv"]}  `
   const btn=document.createElement("button");
   btn.classList.add("btn");
   btn.classList.add("btn-warning");
   btn.classList.add("my-3");
   btn.textContent="VIEW";
   Divcont.appendChild(h5);
   Divcont.appendChild(h4);
   Divcont.appendChild(p);
   Divcont.appendChild(btn);
   div.appendChild(s);
  div.appendChild(imgdiv);
  div.appendChild(Divcont);
  btn.addEventListener("click", function() {
    // Extract the id associated with the clicked button
    const id = div.getAttribute("id");
    view(id);})
 

  }
  function view(id) {
    window.location.href = `../html files/section.html?search=${encodeURIComponent(JSON.stringify(id))}`
  }
  
   
  