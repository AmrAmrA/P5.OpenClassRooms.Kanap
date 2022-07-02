function callProducts() {
  // Appel de l'API
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      // On boucle à travers toutes les données de l'API
      for (i = 0; i < data.length; i++) {
        // Création de tous les éléments HTML du DOM qui vont récupérer les données de l'API
        productLink = document.createElement("a");
        productArticle = document.createElement("article");
        productImage = document.createElement("img");
        productTitle = document.createElement("h3");
        productDescription = document.createElement("p");

        // Insertion des données de l'API dans les élémpents HTML créés juste plus haut
        productLink.href += `product.html?id=${data[i]._id}`;
        productImage.alt += `${data[i].altTxt}`;
        productImage.src = data[i].imageUrl;
        productTitle.innerText = data[i].name;
        productDescription.innerText = data[i].description;

        // Disposition des composants de chaque produit selon l'exemple fourni dans le index.html
        document.querySelector("#items").appendChild(productLink);
        productLink.appendChild(productArticle);
        productArticle.appendChild(productImage);
        productArticle.appendChild(productTitle);
        productArticle.appendChild(productDescription);
      }
    });
}

// Appel de la fonction pour l'exécuter
callProducts();
