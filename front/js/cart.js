let cart                = JSON.parse(localStorage.getItem('cart')) || []; 

let globalSection       = document.querySelector('#cart__items');


for (i = 0; i < cart.length; i++) {
        
     let itemId         = cart[i].productId; 
     let itemColor      = cart[i].colorsproduct; 
     let itemQuantity   = cart[i].quantityProduct; 


        fetch(`http://localhost:3000/api/products/${itemId}`)
        .then(response  => response.json())
        .then(data      =>  {
                
                let newSection = document.createElement('article');
                newSection.classList.add('cart__item');
                newSection.dataset.id = `${itemId}`
                newSection.dataset.color = `${itemColor}`
 
                globalSection.appendChild(newSection);
                
                let deleteContainer = document.createElement('div'); 
                deleteContainer.classList.add('cart__item__content__settings__delete'); 

                let deleteParagraph = document.createElement('p'); 
                deleteParagraph.classList.add('deleteItem'); 
                deleteParagraph.innerHTML = "Supprimer"; 

                let quantityContainer = document.createElement('div'); 
                quantityContainer.classList.add('cart__item__content__settings'); 

                let quantityUnderContainer = document.createElement('div'); 
                quantityUnderContainer.classList.add('cart__item__content__settings__quantity'); 

                let quantityParagraph = document.createElement('p'); 
                quantityParagraph.innerHTML = "Qté:";
                
                let quantityInput = document.createElement('input'); 
                quantityInput.value = itemQuantity
              
                quantityInput.setAttribute('type', 'number'); 
                Object.assign(quantityInput, {
                        min : 1, 
                        max: 100, 
                })



                
                let newTitle = document.createElement('h2'); 
                newTitle.innerText = data.name;

                let newColor = document.createElement('p'); 
                newColor.innerHTML += `${itemColor}`
        
                let newPrice = document.createElement('p'); 
                newPrice.innerText = data.price+=`${'€'}`; 

                let newImage = document.createElement('img'); 
                newImage.src = data.imageUrl; 
                newImage.alt += `${(data.altTxt)}`; 

                let imageContainer = document.createElement('div')
                imageContainer.classList.add('cart__item__img')
                newSection.appendChild(imageContainer)

                let descriptionContainer = document.createElement('div'); 
                descriptionContainer.classList.add('cart__item__content'); 
                newSection.appendChild(descriptionContainer);

              

                itemDescription = document.createElement('div'); 
                itemDescription.classList.add('cart__item__content__description')
                descriptionContainer.appendChild(itemDescription); 
                descriptionContainer.appendChild(quantityContainer); 
                quantityContainer.appendChild(quantityUnderContainer);
                quantityContainer.appendChild(deleteContainer);
                deleteContainer.appendChild(deleteParagraph)
                quantityUnderContainer.appendChild(quantityParagraph); 
                quantityUnderContainer.appendChild(quantityInput); 
                itemDescription.appendChild(newTitle);
                itemDescription.appendChild(newColor);
                itemDescription.appendChild(newPrice)

                imageContainer.appendChild(newImage);
             



                // Regex to prohibit strings in the input values 
                quantityInput.addEventListener('input', setInputValue); 

                function valideInteger(e) {
                        let regexInput = /^[0-9]+$/; 
                        return e.match(regexInput); 
                }

                function setInputValue() {
                        if (!valideInteger(quantityInput.value) || (quantityInput.value > 100)  || (quantityInput.value <= 0))   {
                                quantityInput.value = quantityInput.value.substring(0, quantityInput.value.length-1)
                        }
                        
                }


                
                function cartCount() {
                        let newCart = JSON.parse(localStorage.getItem('cart')); 
                        let totalArticle = 0; 
                        newCart.forEach(product => {
                                totalArticle += parseInt(product.quantityProduct);
                                let ArticlesQuantity =  document.getElementById("totalQuantity").textContent = totalArticle;
                        });
                }

                cartCount()

     

        });
        console.log(cart);

}