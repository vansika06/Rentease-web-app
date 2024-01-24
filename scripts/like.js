import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,setPersistence} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,getDoc, query, where,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
const auth=getAuth();
const db=getFirestore();
const docRef=collection(db,"itemlist");
const docSnap=await getDocs(docRef);
const like=document.querySelector("#like");
const dlike=document.querySelector("#dlike");
// let l=0;
// let d=0;
docSnap.forEach(async(docs) => {
    var itemId=docs.id;
   var data=docs.data();
    const Ref=doc(db,"itemlist",itemId);
    const collec=collection(Ref,"liked");// Getting subcollections of collection storing item details 
  const collec2=collection(Ref,"unliked");
  const collec3=collection(Ref,"reviews");
  const docSnap1 = await getDocs(collec);
  const docSnap2 = await getDocs(collec2);
  const docSnap3 = await getDocs(collec3);
  
  docSnap1.forEach(async(doc1) => {
    var d1=doc1.data();
    //const itemId=doc1.id;
    
    onAuthStateChanged(auth,async(user)=>{
      if(user){
      const id=user.uid;
      if(id===d1["uid"]){
       // l++;
        display(data,"liked",itemId)}}})})
        //  if (docSnap2.size==0){
        //    const h=document.createElement("h2");
        //   const dlike=document.querySelector("#dlike");
          
        //    h.textContent="YOU HAVE NOT DISLIKED ANYTHING YET";
        //    h.classList.add("text-center");
        //    h.classList.add("my-5");
        //    dlike.appendChild(h)}
        //    else{
    docSnap2.forEach(async(doc2) => {
     // const itemId=doc2.id;
    
            var d2=doc2.data();
            onAuthStateChanged(auth,async(user)=>{
              if(user){
              const id=user.uid;
              if(id===d2["uid"]){
                //d++;
                display(data,"unliked",itemId)}}})})
                // if (docSnap3.size==0){
                //   const h=document.createElement("h2");
                //   const rev=document.querySelector("#rev");   
                //   h.textContent="YOU HAVE NOT SUBMITTED ANY REVIEW YET";
                //   h.classList.add("text-center");
                //   h.classList.add("my-5");
                //   rev.appendChild(h)}
                //   else{

                        
    docSnap3.forEach(async(doc3) => {
     // const itemId=doc3.id;
      var d3=doc3.data();
     let user=auth.currentUser;
        if(user){
        const uid=user.uid;
        
        if(uid===d3["uid"]){
          revdisplay(data,d3,itemId);

        }
        
    }})});
   
         function  display(data,stat,iid){
            
            const contdiv=document.createElement("div");
            contdiv.classList.add("col-md-3");
           // contdiv.classList.add("py-md-2");
            //contdiv.classList.add("py-3");
            contdiv.classList.add("cont");
            const imgdiv=document.createElement("div");
            //imgdiv.classList.add("card-img");
            const img=document.createElement("img");
            img.src=data["imgUrl"];
            img.classList.add("image-fluid");
            img.classList.add("w-100");
            imgdiv.appendChild(img);
           const div=document.createElement("div");
            //div.classList.add("card-content");
            const h2=document.createElement("h2");
            h2.textContent=data["itemName"];
            const btn=document.createElement("button");
            btn.classList.add("btn");
            btn.classList.add("btn-warning");
            btn.textContent="View";
            btn.addEventListener("click", function() {
              // Extract the id associated with the clicked button
              
              view(iid);})
            div.appendChild(h2);
            div.appendChild(btn);
            contdiv.appendChild(imgdiv);
            
            if(stat==="liked"){
              const h3=document.createElement("h1");
              h3.innerHTML="<i ></i>";
              h3.classList.add("bi");
              h3.classList.add("bi-hand-thumbs-up-fill");
              div.appendChild(h3);
              contdiv.appendChild(div);
              like.appendChild(contdiv);
            }
            else{
              const h3=document.createElement("h1");
              h3.innerHTML="<i ></i>";
              h3.classList.add("bi");
              h3.classList.add("bi-hand-thumbs-down-fill");
              div.appendChild(h3);
              contdiv.appendChild(div);
              dlike.appendChild(contdiv);
            }
            

         }
         function revdisplay(data,d,iid){
          const ol=document.createElement("ol");
          ol.classList.add("list-group");
          ol.classList.add("list-group-numbered");
          

          const li=document.createElement("li");
          li.classList.add("list-group-item");
         /* const imgdiv=document.createElement("div");
            imgdiv.classList.add("card");
            const img=document.createElement("img");
            img.src=data["imgUrl"];
            imgdiv.appendChild(img);
           li1.appendChild(imgdiv);
           ol.appendChild(li1)
          
           const li2=document.createElement("li");
           li2.classList.add("list-group-item");
           const div=document.createElement("div");
           div.classList.add("card-content");*/
           const div=document.createElement("div");
           const h2=document.createElement("h2");
           h2.textContent=data["itemName"];
           const btn=document.createElement("button");
           btn.classList.add("btn");
           btn.classList.add("btn-warning");
           btn.textContent="View Product";
           btn.addEventListener("click", function() {
            // Extract the id associated with the clicked button
            
            view(iid);})
          /* ol.appendChild(li2);
           const li3=document.createElement("li");
           li3.classList.add("list-group-item");*/
           const p=document.createElement("p");
           p.classList.add('lead');
           p.textContent=`Your Review--${d["rev"]}`;
           div.appendChild(h2);
           div.appendChild(btn);
           li.appendChild(div);
           li.appendChild(p);
          ol.appendChild(li)
           const rev=document.querySelector("#rev");
           rev.appendChild(ol)
            ; 
         }
         function view(id) {
          window.location.href = `../html files/section.html?search=${encodeURIComponent(JSON.stringify(id))}`
        }
        
         