let productLocation = new URLSearchParams(window.location.search)
let productId =  productLocation.get('id'); 


let itemArticle = document.querySelector('.item article'); 
let itemImage = document.querySelector('.item__img')
let itemTitle = document.querySelector('.item #title')
let itemPrice = document.querySelector('.item #price')
let itemDescription = document.querySelector('.item #description')
let itemColor = document.querySelector('.item #colors')

//   For Local Storage 

let productButton       = document.querySelector('#addToCart') ; 
let colors              = document.querySelector('#colors'); 
let quantity            = document.querySelector('#quantity'); 



fetch(`http://localhost:3000/api/products/${productId}`)
.then(response  => response.json())
.then(data      =>  {
   itemImage.insertAdjacentHTML("afterbegin", `<img src="${data.imageUrl}" alt="Photographie d'un canapé ${data.name}">`);
   itemTitle.insertAdjacentHTML("afterbegin", data.name);
   itemPrice.insertAdjacentHTML("afterbegin", data.price);
   itemDescription.insertAdjacentHTML("afterbegin", data.description);
   itemColor.insertAdjacentHTML("beforeend", data.colors.map(color => `<option value="${color}">${color}</option>`).join());


   productButton.addEventListener('click', () => {

  
   let cart = JSON.parse(localStorage.getItem('cart')) || []; 
     
   let productContainer = {
      colorsproduct     : colors.value, 
      quantityProduct   : parseInt(quantity.value), 
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
   localStorage.setItem('cart', productContainer)
   localStorage.setItem('cart', JSON.stringify(cart));
  
})      
})

