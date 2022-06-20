const items = document.querySelector('.items')
let newLink= []; 
let newArticle = []; 
let newImage = []; 
let newTitle = []; 
let newDescription = []; 


fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {

            newLink = document.createElement('a'); 
            newArticle = document.createElement('article');
            newImage = document.createElement('img'); 
            newTitle = document.createElement('h3')
            newDescription = document.createElement('p')
            
            newLink.href += `product.html?id=${(data[i]._id)}`; 
            newImage.alt += `${(data[i].altTxt)}`; 


            newImage.src = data[i].imageUrl;
            newTitle.innerText = data[i].name; 
            newDescription.innerText = data[i].description; 

            items.appendChild(newLink);
            newLink.appendChild(newArticle); 
            newArticle.appendChild(newImage); 
            newArticle.appendChild(newTitle); 
            newArticle.appendChild(newDescription)
        }
    })