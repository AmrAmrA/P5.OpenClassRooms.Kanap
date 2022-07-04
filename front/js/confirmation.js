let productLocation = new URLSearchParams(window.location.search).get("orderId");

function searchId() {
  let textId = document.querySelector("#orderId");
  textId.innerHTML = `${productLocation}`;
  localStorage.clear();
}

searchId();
