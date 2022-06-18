// On récupère un ID différent de chaque produit pour pouvoir afficher un produit différent pour chaque page
let productLocation = new URLSearchParams(window.location.search);
let productId = productLocation.get("id");

// On récupère les éléments HTMl à l'intérieur desquels on va injecter les caractéristiques de chaque canapé 
let itemArticle = document.querySelector(".item article");
let itemImage = document.querySelector(".item__img");
let itemTitle = document.querySelector(".item #title");
let itemPrice = document.querySelector(".item #price");
let itemDescription = document.querySelector(".item #description");
let itemColor = document.querySelector(".item #colors");

// On récupère les trois propriétes  des canapés grâce auxquels on créera un array pour l'envoyer directement au LocaLStorage
let productButton       = document.querySelector('#addToCart') ; 
let colors              = document.querySelector('#colors'); 
let quantity            = document.querySelector('#quantity'); 


// Fonction qui nous affiche le produit demandé grâce à l'insertion de la variable ProductId et nous permet d'envoyer les produits au LocalStorage
function fetchProduct() {
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
            // Insertion dans le HTML de toutes les données des canapés 
            itemImage.insertAdjacentHTML("afterbegin", `<img src="${data.imageUrl}" alt="Photographie d'un canapé ${data.name}">`);
            itemTitle.insertAdjacentHTML("afterbegin", data.name);
            itemPrice.insertAdjacentHTML("afterbegin", data.price);
            itemDescription.insertAdjacentHTML("afterbegin", data.description);
            itemColor.insertAdjacentHTML("beforeend", data.colors.map((color) => `<option value="${color}">${color}</option>`).join());

            //  Après le  lancer l'évènement click une fonction qui permet d'envoyer nos produits dans le localstorage
            productButton.addEventListener("click", () => {
                // On initialise notre panier
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                // On initialise un tableau avec les trois caractéristiques de chaque produit 
                let productContainer = { colorsproduct: colors.value, quantityProduct: parseInt(quantity.value), productId };
                // Condition pour pouvoir incrémenter la quantité de chaque produit et ne pas écraser un produit en ajoutant un nouveau 
                let findProduct = cart.find((p) => p.colorsproduct == productContainer.colorsproduct && p.productId == productContainer.productId);
                if (findProduct != undefined) {
                    findProduct.quantityProduct += productContainer.quantityProduct;
                } else {
                    quantityProduct = 1;
                    cart.push(productContainer);
                }
                // On stringifie notre panier pour que notre localStorage puisse le lire 
                localStorage.setItem("cart", productContainer);
                localStorage.setItem("cart", JSON.stringify(cart));
            });
            
        });
}
fetchProduct();
