let productLocation = new URLSearchParams(window.location.search)
let productId =  productLocation.get('orderId'); 

function searchId () {
    let textId  = document.querySelector('#orderId')
    textId.innerHTML = `${productId}`;
    localStorage.clear();
}

searchId()