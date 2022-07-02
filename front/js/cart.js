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
      let newSection = document.createElement("article");
      newSection.classList.add("cart__item");
      newSection.dataset.id = `${itemId}`;
      newSection.dataset.color = `${itemColor}`;

      globalSection.appendChild(newSection);

      let deleteContainer = document.createElement("div");
      deleteContainer.classList.add("cart__item__content__settings__delete");

      let deleteParagraph = document.createElement("p");
      deleteParagraph.classList.add("deleteItem");
      deleteParagraph.innerHTML = "Supprimer";

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
      Object.assign(quantityInput, {
        min: 1,
        max: 100,
      });

      let newTitle = document.createElement("h2");
      newTitle.innerText = data.name;

      let newColor = document.createElement("p");
      newColor.innerHTML += `${itemColor}`;

      let newPrice = document.createElement("p");
      newPrice.innerText = data.price += `${"€"}`;

      let newImage = document.createElement("img");
      newImage.src = data.imageUrl;
      newImage.alt += `${data.altTxt}`;

      let imageContainer = document.createElement("div");
      imageContainer.classList.add("cart__item__img");
      newSection.appendChild(imageContainer);

      let descriptionContainer = document.createElement("div");
      descriptionContainer.classList.add("cart__item__content");
      newSection.appendChild(descriptionContainer);

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

      // Regex to prohibit strings in the input values
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

      deleteParagraph.addEventListener("click", function (p) {
        p.target.closest(".cart__item").remove();
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
        location.reload;
      });

      function cartCount() {
        let newCart = JSON.parse(localStorage.getItem("cart"));
        let totalArticle = 0;
        newCart.forEach((product) => {
          totalArticle += parseInt(product.quantityProduct);
          let ArticlesQuantity = (document.getElementById(
            "totalQuantity"
          ).textContent = totalArticle);
        });
      }

      cartCount();
    });

    console.table(cart)
}

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
    console.log(cart[i].productId);
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

  console.log(order);

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
      console.log(data);
      // localStorage.clear();

      window.location.href = `/front/html/confirmation.html?orderId=${data.orderId}`;
    });
});
