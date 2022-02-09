import {db} from './libs/firebase/firebaseConfig'
import {ref as databaseRef, get, remove} from 'firebase/database'

const shoeform = document.forms['rentalForm']

async function pageInit() {
    const key = sessionStorage.getItem('key')
    const path = `shoes/${key}`
    const shoeRemoveRef = databaseRef(db,path)
    const shoeSnapShot = await get (shoeRemoveRef)

    if (shoeSnapShot.exists()) {
        setFieldValues(shoeSnapShot.val())
    }

    shoeform.addEventListener('submit', onDeleteShoe)
}
    function onDeleteShoe(e) {
        e.preventDefault();
        deleteProductData()
    }

    
function setFieldValues({urlPath,price,shoe,type}) {
    document.querySelector('#uploadImage img').src = urlPath
    shoeform.elements['shoePrice'].value = price
    shoeform.elements['shoeName'].value = shoe
    shoeform.elements['shoeType'].value = type
}

function deleteProductData() {
    const key = sessionStorage.getItem('key')
    const dataRef = databaseRef(db, `shoes/${key}`)

    if(confirm("Are you sure that you want to delete this shoe?")) {
        remove(dataRef, {
            key
        })
        
        document.querySelector('#uploadImage img').src = 'goodbye-image.jpeg'
        document.querySelector('.user-msg').innerHTML = "SHOE DELETED"

        
    } 
    
}




pageInit();