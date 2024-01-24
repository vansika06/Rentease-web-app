import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { getFirestore,addDoc,doc,setDoc,collection } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import{getStorage,ref as sref,uploadBytes, uploadString,getDownloadURL}  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js'
import { getDatabase,ref, set  } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

   const rentForm=document.querySelector("#rent")
   const db1= getFirestore();
   const auth = getAuth();

  const storage = getStorage();
const imginput=document.getElementById("inputGroupFile02")
console.log(imginput);
console.log(imginput.files[0]);
rentForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const iname=(rentForm.elements.n.value).toUpperCase();
    const price=rentForm.elements.p.value;
    const days=rentForm.elements.d.value;
    const status=rentForm.elements.s.value;
    const description=rentForm.elements.des.value;
    console.log(imginput.files);
    const file=imginput.files[0];
    console.log(file);
    console.log(file.name)
    const storageRef = sref(storage, "images/"+file.name);
   
   
//let old_data=[]
uploadBytes(storageRef, file).then((snapshot) => {
  alert('Uploaded a blob or file!');
  getDownloadURL(storageRef)
  .then(async function(url){
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        var id = user.uid;
        console.log(id);
    const Ref=collection(db1,"renters");
    await addDoc(Ref,{
      rentid:id
    });}})
  //  if(localStorage.getItem('rentid')==null){
  //     localStorage.setItem('rentid',JSON.stringify(old_data))
  //     ;
    
  //   }
  // old_data=JSON.parse(localStorage.getItem('rentid'));
  //        let  id=((auth.currentUser).uid);
  //        console.log(id);
  //        if(!(old_data.includes(id))){
  //    old_data.push(id);}
  //     localStorage.setItem('rentid',JSON.stringify(old_data));
      let currentDate = new Date();//Date function to create a object
let cDay = currentDate.getDate();//gives day of the from 1-31
let cMonth = currentDate.getMonth() + 1;//gives month from 0-11
let cYear = currentDate.getFullYear();//provides current year
console.log(cDay + "/" + cMonth + "/" + cYear );
const c= cDay + "/" + cMonth + "/" + cYear
         const ref=collection(db1,"itemlist");
         let  id=((auth.currentUser).uid);
         const r=doc(db1,"userlist",id);
         const collec=collection(r,"rented");
        const docRef= await addDoc(ref,{//use addDoc to add by default id and use the reference docRef to get its id
          itemName:iname,
          itemPrice:price,
          idays:days,
          istat:status,
          imgUrl:url,
          userid:id,
          upv:0,
          dnv:0,
          date:c,
          des:description,
          purchase:"null",
          purchaseOn:"Not Purchased yet"
      
         });
                 
        
        
             const iid=(docRef.id);//get id where item is added to add that id in subcollection rented
             console.log(iid);
          
          await addDoc(collec,{
            itemid:iid,
           
          });
          alert("added successfully");
        window.location.assign("../html files/about.html")

      })
    
    

    })
  
  .catch(function(e){
   
    alert(e.message);// catch any error messages
  })

 
  

})