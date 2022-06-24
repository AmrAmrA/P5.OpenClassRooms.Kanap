
// Récupération dans l'URL de l'ID du produit sur lequel on a cliqué 
let productId = new URLSearchParams(window.location.search).get('id'); 

// Appel à l'API pour afficher les détails spécifiques de chaque produit 
function productComponents() {
   fetch(`http://localhost:3000/api/products/${productId}`)
   .then(response  => response.json())
   .then(data      =>  {
   document.querySelector('.item__img').innerHTML           = `<img src="${data.imageUrl}" alt="${data.altTxt}">`; 
   document.querySelector('.item #title').innerText         = data.name; 
   document.querySelector('.item #price').innerText         = data.price;
   document.querySelector('.item #description').innerText   = data.description; 
   document.querySelector('.item #colors').insertAdjacentHTML("beforeend", data.colors.map(color => `<option value="${color}">${color}</option>`));
   })
}
productComponents(); 





   // Lancement d'une fonction anonyme lors du clique sur le bouton "ajouter au panier"
   // La fonction permet d'ajouter un nouveau produit à notre localstorage et vous redirige directement sur la page du panier 
   document.querySelector('#addToCart').addEventListener('click', () => {

  
   let cart = JSON.parse(localStorage.getItem('cart')) || []; 
     
   let productContainer = {
      colorsproduct     : document.querySelector('#colors').value, 
      quantityProduct   : parseInt(document.querySelector('#quantity').value), 
      productId,  
   };    
   let findProduct = cart.find( p => p.colorsproduct  == productContainer.colorsproduct && 
      p.productId      == productContainer.productId); 
   if(findProduct != undefined) {
      findProduct.quantityProduct += productContainer.quantityProduct; 
   } else {
      quantityProduct = 1; 
      cart.push(productContainer); 
   }

   if (!quantityProduct  <= 0 || !quantityProduct  > 100 || !colorsproduct  == '') {
      window.location.href = 'cart.html';
  }


   localStorage.setItem('cart', productContainer)
   localStorage.setItem('cart', JSON.stringify(cart));
  
})      

