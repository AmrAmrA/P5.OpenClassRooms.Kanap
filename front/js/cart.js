let cart = JSON.parse(localStorage.getItem("cart")) || [];

let globalSection = document.querySelector("#cart__items");

for (i = 0; i < cart.length; i++) {
  let itemId = cart[i].productId;
  let itemColor = cart[i].colorsProduct;
  let itemQuantity = cart[i].quantityProduct;

  fetch(`http://localhost:3000/api/products/${itemId}`)
    .then((response) => response.json())
    .then((data) => {
      // Création et placement des éléments HTML dans le DOM

      // Création de l'élément HTML Article
      let newSection = document.createElement("article");
      newSection.classList.add("cart__item");
      newSection.dataset.id = `${itemId}`;
      newSection.dataset.color = `${itemColor}`;
      globalSection.appendChild(newSection);

      // Option de suppression d'article
      let deleteContainer = document.createElement("div");
      deleteContainer.classList.add("cart__item__content__settings__delete");
      let deleteParagraph = document.createElement("p");
      deleteParagraph.classList.add("deleteItem");
      deleteParagraph.innerHTML = "Supprimer";
      deleteParagraph.dataset.id = `${itemId}`;
      deleteParagraph.dataset.color = `${itemColor}`;

      // Partie HTML concernant la quantité contenant un texte et un input
      let quantityContainer = document.createElement("div");
      quantityContainer.classList.add("cart__item__content__settings");
      let quantityUnderContainer = document.createElement("div");
      quantityUnderContainer.classList.add(
        "cart__item__content__settings__quantity"
      );
      let quantityParagraph = document.createElement("p");
      quantityParagraph.innerHTML = "Qté:";
      let quantityInput = document.createElement("input");
      quantityInput.value = itemQuantity;
      quantityInput.setAttribute("type", "number");
      quantityInput.classList.add("itemQuantity");
      quantityInput.setAttribute("name", "itemQuantity");
      Object.assign(quantityInput, { min: 1, max: 100 });

      // Nom du canapé
      let newTitle = document.createElement("h2");
      newTitle.innerText = data.name;

      // Couleur du canapé
      let newColor = document.createElement("p");
      newColor.innerHTML += `${itemColor}`;
      // Prix du canapé
      let newPrice = document.createElement("p");
      newPrice.innerText = data.price * itemQuantity + `${" €"}`;
      // Image du canapé
      let newImage = document.createElement("img");
      newImage.src = data.imageUrl;
      newImage.alt += `${data.altTxt}`;
      let imageContainer = document.createElement("div");
      imageContainer.classList.add("cart__item__img");
      newSection.appendChild(imageContainer);
      // Container qui regroupe l'image, le prix, la quantité, le nom et l'image du canapé
      let descriptionContainer = document.createElement("div");
      descriptionContainer.classList.add("cart__item__content");
      newSection.appendChild(descriptionContainer);

      // On imbrique des éléments HTML pour correspondre au design initial imposé en HTML
      itemDescription = document.createElement("div");
      itemDescription.classList.add("cart__item__content__description");
      descriptionContainer.appendChild(itemDescription);
      descriptionContainer.appendChild(quantityContainer);
      quantityContainer.appendChild(quantityUnderContainer);
      quantityContainer.appendChild(deleteContainer);
      deleteContainer.appendChild(deleteParagraph);
      quantityUnderContainer.appendChild(quantityParagraph);
      quantityUnderContainer.appendChild(quantityInput);
      itemDescription.appendChild(newTitle);
      itemDescription.appendChild(newColor);
      itemDescription.appendChild(newPrice);
      imageContainer.appendChild(newImage);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Regex pour interdire à l'utiliser d'entrer des strings dans les inputs de quantité
      quantityInput.addEventListener("input", setInputValue);

      function valideInteger(e) {
        let regexInput = /^[0-9]+$/;
        return e.match(regexInput);
      }

      function setInputValue() {
        if (
          !valideInteger(quantityInput.value) ||
          quantityInput.value > 100 ||
          quantityInput.value <= 0
        ) {
          quantityInput.value = quantityInput.value.substring(
            0,
            quantityInput.value.length - 1
          );
        }
      }

      // Fonction qui permet de calculer le nombre de produits et leur prix global
      function cartCount() {
        let quantityCart = JSON.parse(localStorage.getItem("cart"));
        let totalArticle = 0;
        let totalPrice = 0;
        quantityCart.forEach((product) => {
          totalArticle += parseInt(product.quantityProduct);
          let ArticlesQuantity = (document.getElementById(
            "totalQuantity"
          ).textContent = totalArticle);
        });
        quantityCart.forEach((product) => {
          totalPrice += product.priceProduct;
          let ArticlesPrice = (document.getElementById(
            "totalPrice"
          ).textContent = totalPrice);
        });
      }

      cartCount();

      // Suppression d'un article
      deleteParagraph.addEventListener("click", function deleteItem(p) {
        p.preventDefault();
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (g = 0; g < cart.length; g++) {
          if (
            cart[g].productId === deleteParagraph.dataset.id &&
            cart[g].colorsProduct === deleteParagraph.dataset.color
          ) {
            p.target.closest(".cart__item").remove();
            let newCart = JSON.parse(localStorage.getItem("cart"));
            newCart.splice([g], 1);
            localStorage.setItem("cart", JSON.stringify(newCart));
            location.reload();
          }
        }
      });
      // Fonction pour incrémenter et décrementer le total des articles et leur prix
      // Modification de la quantité et du prix
      // function modifyQuantity() {
      //   quantityInput.addEventListener("change", (e) => {
      //     e.preventDefault()
      //     articleToChange     = quantityInput.closest("article");
      //     let articleId       = articleToChange.getAttribute("data-id");
      //     let articleColor    = articleToChange.getAttribute("data-color");
      //     let quantityDynamic = 0;
      //     let priceDynamic    = 0; 
      //     for (b = 0; b < cart.length; b++) {
      //       if (
      //         cart[b].colorsProduct === articleColor &&
      //         cart[b].productId     === articleId
      //       ) {
      //         cartCount();
      //         cart[b].quantityProduct = quantityInput.valueAsNumber;
      //         cart[b].priceProduct   =  parseInt(newPrice.innerHTML) * cart[b].quantityProduct;
      //         quantityDynamic         = parseInt(cart[b].quantityProduct);
      //         document.getElementById('totalQuantity').textContent  = quantityDynamic;
      //         document.getElementById('totalPrice').textContent  = cart[b].priceProduct;
      //         localStorage.setItem("cart", JSON.stringify(cart));
              
              
      //       }
      //     }
      //   });
      // }
      // modifyQuantity(); 
    });
  }
  // let calculTotalPrice = cart[b].priceProduct * quantityDynamic; 
  // priceDynamic.push(calculTotalPrice); 
  // let reducer = (accumulator, currentValue) => accumulator + currentValue; 
  // let notrePrix = priceDynamic.reduce(reducer, 0); 
  // document.getElementById('totalPrice').textContent  = notrePrix;
  // console.log(notrePrix);
  // console.log(cart);
  
// Section du formulaire avec validation de tous les champs

// Création des expressions régulières => RegExp

// Cette première Rgex sera mobilisée pour le prenom, nom et la ville
let textRegExp = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);
let emailReg = new RegExp(
  "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$"
);

// Récupérer le formulaire en dehors du contexte de la fonction pour ne pas avoir à le rappeler
let formulaire = document.querySelector(".cart__order__form");

// Validation du formulaire
function ValidationFormulaire() {
  // Validation du prénom

  formulaire.firstName.addEventListener("input", function () {
    validPrenom(this);
  });

  let validPrenom = function (inputPrenom) {
    let erreurPrenom = inputPrenom.nextElementSibling;
    erreurPrenom.innerHTML = "";
    if (!textRegExp.test(inputPrenom.value)) {
      erreurPrenom.innerHTML = "Votre prénom est invalide";
    }
  };
  // Validation du choix du nom

  formulaire.lastName.addEventListener("input", function () {
    valideNomFamille(this);
  });

  let valideNomFamille = function (inputNom) {
    let erreurNom = inputNom.nextElementSibling;
    erreurNom.innerHTML = "";
    if (!textRegExp.test(inputNom.value)) {
      erreurNom.innerHTML = "Votre nom est invalide";
    }
  };

  // Validation de l'adresse postale

  formulaire.address.addEventListener("input", function () {
    validAddresse(this);
  });

  let validAddresse = function (inputAddresse) {
    let erreurAdresse = inputAddresse.nextElementSibling;
    erreurAdresse.innerHTML = "";
    if (!addressRegExp.test(inputAddresse.value)) {
      erreurAdresse.innerHTML = "Votre adresse est invalide";
    }
  };

  // Validation du nom de la ville

  formulaire.city.addEventListener("input", function () {
    validVille(this);
  });

  let validVille = function (inputVille) {
    let erreurVille = inputVille.nextElementSibling;
    erreurVille.innerHTML = "";
    if (!textRegExp.test(inputVille.value)) {
      erreurVille.innerHTML = "Le nom de votre ville est invalide";
    }
  };

  // Vdlidation du mail

  formulaire.email.addEventListener("input", function () {
    validEmail(this);
  });

  let validEmail = function (inputEmail) {
    let erreurMail = inputEmail.nextElementSibling;
    erreurMail.innerHTML = "";
    if (!emailReg.test(inputEmail.value)) {
      erreurMail.innerHTML = "Votre adresse mail est invalide";
    }
  };
}
// Appel à la fonction pour qu'elle s'exécute
ValidationFormulaire();

// Envoi du formulaire validé vers le Backend
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();

  let productsId = [];
  for (let i = 0; i < cart.length; i++) {
    productsId.push(cart[i].productId);
  }

  let order = {
    contact: {
      firstName: formulaire.firstName.value,
      lastName: formulaire.lastName.value,
      address: formulaire.address.value,
      city: formulaire.city.value,
      email: formulaire.email.value,
    },
    products: productsId,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "content-type": "application/json",
    },
  };
  fetch("http://localhost:3000/api/products/order", options)
    .then((res) => res.json())
    .then((data) => {
      if (!cart.length <= 0) {
        window.location.href = `/front/html/confirmation.html?orderId=${data.orderId}`;
      } else {
        alert(
          "Votre panier est vide, vous ne pouvez pas envoyer de commande. Donc nous vous renvoyons vers notre sélection d'articles"
        );
        window.location.href = "index.html";
      }
    });
});
