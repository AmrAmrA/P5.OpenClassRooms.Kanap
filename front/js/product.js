// Récupérer l'ID propre à chaque produit pour tomber sur une page différente selon le canapé sélectionné
let productLocation = new URLSearchParams(window.location.search)
let productId =  productLocation.get('id'); 

// On récupère tous les éléments en HTML à l'intérieur desquels on va injecter les caractéristiques du produit 
let itemArticle = document.querySelector('.item article'); 
let itemImage = document.querySelector('.item__img')
let itemTitle = document.querySelector('.item #title')
let itemPrice = document.querySelector('.item #price')
let itemDescription = document.querySelector('.item #description')
let itemColor = document.querySelector('.item #colors')

function fetchProduct() {
    // On rappelle l'API pour récupèrer toutes les données qu'on veut afficher pour chaque produit 
fetch(`http://localhost:3000/api/products/${productId}`)
.then(response  => response.json())
.then(data      =>  {
//    On injecte dans le HTML les données récupérées depuis l'API
   itemImage.insertAdjacentHTML("afterbegin", `<img src="${data.imageUrl}" alt="Photographie d'un canapé ${data.name}">`);
   itemTitle.insertAdjacentHTML("afterbegin", data.name);
   itemPrice.insertAdjacentHTML("afterbegin", data.price);
   itemDescription.insertAdjacentHTML("afterbegin", data.description);
   itemColor.insertAdjacentHTML("beforeend", data.colors.map(color => `<option value="${color}">${color}</option>`).join()); 
})
}
fetchProduct(); 