import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'



   const db = getFirestore();
   // from the page location getting value of search
const searchResults=JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get("search")));
console.log(searchResults);
const Ref = collection(db, "itemlist");

let results=[];
let id=[];
//let itemId
 try{
 const q = query(Ref, where("itemName", "==", searchResults));
 const querySnapshot = await getDocs(q);//retrieving all such queries
 console.log( querySnapshot);
 
 querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
  let itemId=doc.id;
   console.log(itemId);
   results.push(doc.data());
   id.push(itemId);
//
 });}
// window.location.href=`search.html?search=${encodeURIComponent(JSON.stringify(search))}`})
 catch(error){
 console.log(error.message);
 }

 
console.log(results);
if(results.length===0){
  const h2=document.querySelector("#ifsearch");
  h2.textContent="Sorry Items Not Found!!!";
}
const searchRow=document.querySelector("#search");
let c=0;

for(let i of results){
  let iid;
  iid=id[c];
  c++;
  console.log(iid);
  display(i,iid);}
function display(i,iid){
    const itemContainer = document.createElement("div");
    console.log("created")
    itemContainer.id = iid;
    console.log(itemContainer.id);
    itemContainer.classList.add("col-md-3"); 
    itemContainer.classList.add("items");
    itemContainer.classList.add("text-center");
   
    
    
    
    searchRow.appendChild(itemContainer);
  

  // Create elements for the item details
  const iname = document.createElement("h3");
  iname.classList.add("text");
  iname.textContent = i["itemName"];

  const ipr = document.createElement("h4");
  ipr.classList.add("text");
  ipr.textContent = i["itemPrice"];

  const stat = document.createElement("h4");
  stat.classList.add("text");
  stat.textContent = i["istat"];
  if (i["istat"]=="Unavailable"){
    stat.classList.add("red")
  }
  else{
    stat.classList.add("green")
  }

  const imag = document.createElement("img");
  imag.classList.add("cardimg");
  imag.classList.add("img-fluid");
  imag.src = i["imgUrl"];
  console.log(i["imgUrl"]);
  const btn=document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add("btn-warning");
  btn.classList.add("mybutton")
  btn.textContent="VIEW"
  btn.addEventListener("click", function() {
    // Extract the id associated with the clicked button
    const id = itemContainer.getAttribute("id");
    console.log(id)
    view(id);})

  // Append elements to the item container
  //itemContainer.innerHTML = ''; // Clear previous content if any
  itemContainer.appendChild(imag);
  itemContainer.appendChild(iname);
  itemContainer.appendChild(ipr);
  itemContainer.appendChild(stat);
  itemContainer.appendChild(btn)
}
function view(id) {
  window.location.href = `section.html?search=${encodeURIComponent(JSON.stringify(id))}`
}