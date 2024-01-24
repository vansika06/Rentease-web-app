import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
  //For creating a span on top of each item indicating its category
  const electronics=["SPEAKER","TRIPOD STAND","LAPTOP","CHARGER","ADAPTER","LAN WIRE" ];
  const lab=  ["LABCOAT","DRAFTER"];
  const stationary=["CALCULATOR","BOOKS"];
  const accessories=["SHOES","DRESS","SANDALS"];
  let itemId;
  
   const auth = getAuth();
  
   const db = getFirestore();
   //getting all data from itemlist
   const querySnapshot = await getDocs(collection(db, "itemlist"));
    querySnapshot.forEach((doc) => {
      let data= doc.data()
      itemId=  doc.id;
      display(data);
});


     
// creating divs and appending  
function display(data){
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("card")
    console.log("created")
    itemContainer.id = itemId;
    itemContainer.classList.add("col-md-3")
    itemContainer.classList.add("g-3");

    itemContainer.classList.add("items");
    
    itemContainer.classList.add("text-center");
  itemContainer.classList.add("box");
    const s=document.createElement("span");
    s.classList.add("badge");
    s.classList.add("bg-info");

    if(electronics.includes(data["itemName"])){
      s.textContent="Electronics";
    }
    else if(lab.includes(data["itemName"])){
      s.textContent="Lab Help";
    }
    else if(stationary.includes(data["itemName"])){
      s.textContent="Your class Help";
    }
    else if(accessories.includes(data["itemName"])){
      s.textContent="Helping you to get ready";
    }
    else if((data["itemName"])=="CYCLE"){
      s.textContent="Cycle";
    }
    else{
      s.textContent="Other Items";
    }
    
  
    
    
    const maindata=document.querySelector("#maindata");
    maindata.appendChild(itemContainer);
  

  // Create elements for the item details
  const iname = document.createElement("h3");
  iname.classList.add("text");
  iname.classList.add("card-title");
  iname.textContent = data["itemName"];

  const ipr = document.createElement("h4");
  ipr.classList.add("text");
  ipr.textContent = `Rs. ${data['itemPrice']} per day`;

  const stat = document.createElement("h4");
  stat.classList.add("text");
  stat.textContent = data["istat"];
  if (data["istat"]=="Unavailable"){
    stat.classList.add("red")
  }
  else{
    stat.classList.add("green")
  }
  const imgdiv=document.createElement("div");

  const imag = document.createElement("img");
  imag.classList.add("card-img-top");
  imag.classList.add("img-fluid");
  imag.src = data["imgUrl"];
  imgdiv.appendChild(imag);

  const btn=document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add("btn-info");
  btn.classList.add("mybutton")

  btn.innerText="VIEW"
  // Append elements to the item container
  
  btn.addEventListener("click", function() {
    // Extract the id associated with the clicked button
    const id = itemContainer.getAttribute("id");
    view(id);})
    itemContainer.appendChild(s);
  itemContainer.appendChild(imgdiv);
  itemContainer.appendChild(iname);
  itemContainer.appendChild(ipr);
  itemContainer.appendChild(stat);
itemContainer.appendChild(btn)
}
//takes to section.html page with value of search=id and its encoded to make it suitable as a url
function view(id) {
  window.location.href = `../html files/section.html?search=${encodeURIComponent(JSON.stringify(id))}`
}

  


   const signout=document.getElementById("out");
  signout.addEventListener("click",(e)=>{
    e.preventDefault();
   signOut(auth).then(() => {
// //     // Sign-out successful.
  alert("sign out")
  window.location.href="../html files/index2.html";

    }).catch((error) => {
      alert("error out")
      console.log(error.message)
//       An error happened.
    })} )        
  

const searchForm=document.querySelector("#srch") 
 searchForm.addEventListener("submit",async function gets(e){
   e.preventDefault();
   //retrieving value of search form and covert to uppercase
 const search=(searchForm.elements.s.value).toUpperCase();//extracting value of searchform's element whose name is s 
 console.log("search:",search);

 window.location.href=`../html files/search.html?search=${encodeURIComponent(JSON.stringify(search))}`})//directing to search page on submit with itemname
