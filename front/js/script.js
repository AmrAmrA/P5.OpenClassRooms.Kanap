// On récupère la section ITEMS depuis l'index, on va y injecter des éléments grâce à la méthode Appenchild 
const items = document.querySelector('.items')


// On initialise des tableaux qui nous serviront pour y créer l'ensmeble de tous les éléments de la page Index 
let productLink         = []; 
let newArticle          = []; 
let productImage        = []; 
let productTitle        = []; 
let productDescription  = []; 

// Appel à l'API
function APICall() {
    fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => {
            // On boucle à travers les données fournies par l'API
            for (i = 0; i < data.length; i++) {
                // Créations dans le DOM de tous les éléments qui composent la carte de chaque canapé
                productLink         = document.createElement("a");
                newArticle          = document.createElement("article");
                productImage        = document.createElement("img");
                productTitle        = document.createElement("h3");
                productDescription  = document.createElement("p");

                // Après avoir créé les éléments, on y injecte toutes les données fournies par l'API
                productLink.href                += `product.html?id=${data[i]._id}`;
                productImage.alt                += `${data[i].altTxt}`;
                productImage.src                = data[i].imageUrl;
                productTitle.innerText          = data[i].name;
                productDescription.innerText    = data[i].description;

                // Enfin on place tous les éléments à l'intérieur de la section Items 
                items       .appendChild(productLink);
                productLink .appendChild(newArticle);
                newArticle  .appendChild(productImage);
                newArticle  .appendChild(productTitle);
                newArticle  .appendChild(productDescription);
            }
        });
}
// On appelle la fonction pour qu'elle se lance 
APICall();