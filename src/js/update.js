import {ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database'
import {db, storage} from './libs/firebase/firebaseConfig'
const shoeform = document.forms['rentalForm']




async function pageInit() {
    const key = sessionStorage.getItem('key')
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
        type

     })


}

function setFieldValues({urlPath,price,shoe,type}) {
    document.querySelector('#uploadImage img').src = urlPath
    shoeform.elements['shoePrice'].value = price
    shoeform.elements['shoeName'].value = shoe
    shoeform.elements['shoeType'].value = type
}

pageInit()

