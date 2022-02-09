import {ref as dataRef, get, set, push, remove} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {renderShoe} from './templates/shoe'

async function pageInit(){
    const shoeRef = dataRef(db, 'shoes/');
    const shoeSnapShot = await get(shoeRef)
    const data = shoeSnapShot.val();


    Object.values(data).map(shoe=>{
        const card = renderShoe(shoe)
        document.querySelector('.shoes').append(card)
    })


}

var hamburger = document.querySelector(".hamburger")
 hamburger.addEventListener("click",function(){
   document.querySelector("body").classList.toggle("active")
 })

pageInit()