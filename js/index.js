getFromAPI("http://localhost:3000/api/teddies/")
  .then(function (response) {
    products = JSON.parse(response);

    for (let product of products) {
      var productList = document.getElementById("productList");
      productList.innerHTML += `
        <div>
          <figure>
            <img alt='peluche' class='imageIndex' src=${product.imageUrl}>
          </figure>
          <h2>${product.name}</h2>
          <div>${product.price/100},00€</div>
          <div><a href='produit.html?id=${product._id}'>
          <button class='btnShowIndex'>Détails</button></a></div>
        </div>`;
    }
  }).catch(function (req) {
    console.error("NOK", req);
  })


var nombrePanier = document.getElementById('nombrePanier');
var total = localStorage.getItem('total');
nombrePanier.innerHTML = total;