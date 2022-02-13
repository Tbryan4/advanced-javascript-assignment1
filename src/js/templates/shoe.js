function renderShoe({key,urlPath,price,shoe,type,ratingValue}) {

  var outputSection 
  if (ratingValue == 1) 
  {
    outputSection = "⭐"
  }

  else if(ratingValue == 2) {
    outputSection = "⭐⭐"
  }

  else if(ratingValue == 3) {
    outputSection = "⭐⭐⭐"
  }

  else if(ratingValue == 4) {
    outputSection = "⭐⭐⭐⭐"
  }
  else if(ratingValue == 5) {
    outputSection = "⭐⭐⭐⭐⭐"
  }

    const template =  `
    <li class="shoe">
    <figure>
      <img src="${urlPath}" width="260" height="179" alt="${shoe} type: ${type}">
      <figcaption>
        <h2 class="shoe-name">${shoe}</h2>
        <p class="shoe-price">$${price}</p>
        <p class="shoe-type">${type}</p>
        <div id="${ratingValue}" class="stars-output">
        ${outputSection}
        </div>
        <div class="button-section">
          <button id="edit" data-key="${key}" data-img="${urlPath}" >Edit</button>
          <button id="delete" data-key="${key}">Delete</button>
        </div>
      </figcaption>
    </figure>
  </li>
    `
    

    const element = document.createRange().createContextualFragment(template).children[0]
    addShoeControls(element)
    return element
}

function addShoeControls (shoe) {
  shoe.querySelector('#edit').addEventListener('click', onEditShoe)
  shoe.querySelector('#delete').addEventListener('click', onDeleteShoe)
  
 }

 function onEditShoe(e) {
  const urlPath = e.target.dataset.img
  const key = e.target.dataset.key
  sessionStorage.setItem('key',key)
  sessionStorage.setItem('img',urlPath)
  window.location.assign('update.html')
  
}

function onDeleteShoe(e) {
  const key = e.target.dataset.key
  sessionStorage.setItem('key',key)
  window.location.assign('delete.html')
  console.log(e.target.dataset.key)
}

export {renderShoe}