import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#rentalImage").addEventListener("change", onImageSelected);
document.forms["rentalForm"].addEventListener("submit", onAddShoe);
const textElement = document.querySelector(".success-message")
var ratingValue

var hamburger = document.querySelector(".hamburger")
 hamburger.addEventListener("click",function(){
   document.querySelector("body").classList.toggle("active")
 })

 const stars = document.querySelectorAll(".stars a");
 stars.forEach((star,index) => {
    star.addEventListener('click', () => {
      ratingValue = index + 1
      stars.forEach((clickedStar,clickedIndex) =>{
        if(clickedIndex <= index)
        {
          clickedStar.classList.add("active")
        }
        else {
          clickedStar.classList.remove("active")
        }
      })
    })
 });




    function onAddShoe(e) {
        e.preventDefault();
        uploadShoe();
        window.alert("Shoe Added");
    }
  

   function onImageSelected(e) {
    //selected file
    // file objets   [fileObj, fileObj, fileObj]
    let file = e.target.files[0];
    console.log(file)
    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);
     
    }

    async function uploadShoe() {
        // form data
        const shoe = document.querySelector('#shoeName').value.trim();
        const price = document.querySelector('#shoePrice').value.trim();
        const type = document.querySelector('#shoeType').value.trim();
        const file = document.querySelector('#rentalImage').files[0]
        
        // paths to the data to write
        const imageRef = storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'shoes')

        // uploading file to the storage bucket
        const uploadResult = await uploadBytes(imageRef, file);
        // url to the image stored in storage bucket
        const urlPath =  await getDownloadURL(imageRef) 
        // path on the storage bucket to the image
        const storagePath = uploadResult.metadata.fullPath;

        // firebase unique key
        const itemRef = await push(dataRef)
        
        set(itemRef,{
           key:itemRef.key,
           sku:`bkst${itemRef.key}`,
           urlPath,
           storagePath,
           shoe,
           price,
           type,
           ratingValue
        })        
    }
 