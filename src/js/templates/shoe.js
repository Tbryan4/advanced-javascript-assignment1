function renderShoe({key,urlPath,price,shoe,type}) {
    const template =  `
    <li class="shoe">
    <figure>
      <img src="${urlPath}" width="260" height="179" alt="${shoe} type: ${type}">
      <figcaption>
        <h2 class="shoe-name">${shoe}</h2>
        <p class="shoe-price">$${price}</p>
        <p class="shoe-type">${type}</p>
        <img src="assets/images/5-stars.png" width="70" alt="5 stars">
        <div class="button-section">
          <button id="edit" data-key="${key}" >Edit</button>
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
  const key = e.target.dataset.key
  sessionStorage.setItem('key',key)
  window.location.assign('update.html')
  
}

function onDeleteShoe(e) {
  const key = e.target.dataset.key
  sessionStorage.setItem('key',key)
  window.location.assign('delete.html')
  console.log(e.target.dataset.key)
}

export {renderShoe}