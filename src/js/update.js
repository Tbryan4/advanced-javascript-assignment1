import {ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database'
import {db, storage} from './libs/firebase/firebaseConfig'
const shoeform = document.forms['rentalForm']
var ratingValue

var hamburger = document.querySelector(".hamburger")
console.log(hamburger)
hamburger.addEventListener("click",function(){
document.querySelector("body").classList.toggle("active")
})


async function pageInit() {
    const key = sessionStorage.getItem('key')
    const img = sessionStorage.getItem('img')
    const shoeRef = databaseRef(db, `shoes/${key}`)
    const shoeSnapShot = await get(shoeRef)
   
    if(shoeSnapShot.exists()){
        setFieldValues(shoeSnapShot.val())
    }

    shoeform.addEventListener('submit', onUpdateShoe)    
}

function onUpdateShoe(shoe) {
    shoe.preventDefault();
    updateShoeData()
}

const stars = document.querySelectorAll(".stars a");
stars.forEach((star,index) => {
   star.addEventListener('click', () => {
     ratingValue = index + 1
     console.log(ratingValue)
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

async function updateShoeData () {
    const file = document.querySelector('#rentalImage').files[0]
    const price = shoeform.elements['shoePrice'].value.trim()
    const shoe = shoeform.elements['shoeName'].value.trim() 
    const type = shoeform.elements['shoeType'].value.trim() 
    const imageRef = storageRef(storage, `images/${file.name}`);
    const key = sessionStorage.getItem('key')
    const dataRef =  databaseRef( db, `shoes/${key}`)
    const uploadResult = await uploadBytes(imageRef, file);
    const urlPath =  await getDownloadURL(imageRef); 
    const storagePath = uploadResult.metadata.fullPath;

    set(dataRef,{
        key,
        sku:`bkst${key}`,
        urlPath,
        storagePath,
        shoe,
        price,
        type,
        ratingValue
     })

     location.assign("index.html")
}

function setFieldValues({urlPath,price,shoe,type}) {
    document.querySelector('#uploadImage img').src = urlPath
    shoeform.elements['shoePrice'].value = price
    shoeform.elements['shoeName'].value = shoe
    shoeform.elements['shoeType'].value = type
    shoeform.elements['stars'] = ratingValue

    
}



pageInit()

