// pour récuperer L url
var url = window.location.href;
// pour instancier l objet URL
var objetUrl = new URL(url);
// pour recuper les parametres de L'url
var id = objetUrl.searchParams.get("id");

getFromAPI("http://localhost:3000/api/teddies/" + id)
  .then(function (response) {
    product = JSON.parse(response);

    var productTeddy = document.getElementById("productTeddy");
    productTeddy.innerHTML = ` 
      <div class='ficheProduit'> 
      <figure><img alt='peluches' class='imageProduit' src=" ${product.imageUrl} "></figure>
      <h2 class='produitH2' > ${product.name}</h2>
      <div class='titleProduit'><p>D<u>escription</u></p><p class='infoProduit'>${product.description}</div></p>
      <div class='titleProduit'><P>P<u>rix</u></><p class='infoProduit'>${product.price / 100},00€</div></p>
      <div class='selectColor' id='choixCouleur'><label for='options'><p class='titleProduit'>C<u>hoisissez votre couleur</u></p></label></div>
      <div idOurs='id' class='titleProduit' name='id'><p>R<u>éférence</u></p><p class='infoProduit infoMargin'>${product._id}</div></p>
      <a id='ajouter' data-id='5be9c8541c9d440000665243' class='add-cart' href='#'>Ajouter au panier</a>" +
      </div>; `
 
    // ajout du choix des couleurs (non repris dans le panier)
    var oursColors = product.colors;
    for (let i = 0; i < oursColors.length; i++) {
      document.getElementById('choixCouleur').innerHTML = document.getElementById("choixCouleur").innerHTML +
        "<input id='optionCouleur' name='colorOurs' type='radio' value='" + oursColors + "'/>" + oursColors[i];
    }
    // bouton pour ajouter dans le panier
    var btnPanier = document.getElementById('ajouter');
    btnPanier.addEventListener('click', function () {
      var idOurs = product._id;
      // total de la quantité d'ours ajoutés dans le panier      
      var total = localStorage.getItem('total');
      if (total != null) {
        var quantite = parseInt(total);

      } else {
        var quantite = 0;
      }
      // si le panier n'existe pas
      if (localStorage.getItem('panier') != null) {
        var panier = JSON.parse(localStorage.getItem('panier'));
        var idExist = 0;
        var keyToModify = 0;
        quantite = quantite + 1;
        for (let i = 0; i < panier.length; i++) {
          // si l ID de l ours est connu dans le panier
          if (panier[i].id == idOurs) {
            idExist = 1;
            keyToModify = i;
          }
          // si IdExist à une valeur de 1              
        }
        if (idExist == 1) {
          panier[keyToModify].qty = panier[keyToModify].qty + 1;
        } else {
          var article = {
            "id": idOurs,
            "qty": 1
          };
          panier.push(article);
        }
        // si le panier est vide       
      } else {
        var panier = [];
        var article = {
          "id": idOurs,
          "qty": 1
        };
        panier.push(article);
        quantite = quantite + 1;
      }
      // enregistrement dans le localstorage 
      var panierJson = JSON.stringify(panier);
      localStorage.setItem('panier', panierJson);
      localStorage.setItem('total', quantite);
      // affichage de la quantité dans le panier
      var total = localStorage.getItem('total');
      var nombrePanier = document.getElementById('nombrePanier');
      nombrePanier.innerHTML = total;
      checkPanier();
    })
  })
  .catch(function (req) {
    console.error("NOK", req);
  })

getFromAPI("http://localhost:3000/api/teddies/")
  .then(function (response) {
    products = JSON.parse(response);
    for (let product of products) {
      var maisAussi = document.getElementById("maisAussi");
      maisAussi.innerHTML = maisAussi.innerHTML +
        "<div class='produitSup'>" +
        "<figure><img class='imagesup' src=" + product.imageUrl + "></figure>" +
        "<h2>" + product.name + "</h2>" +
        "<div class='showTeddy'><a href='produit.html?id=" + product._id + "'><button class='btnShowIndex'>Détails</button></a></div>" +
        "</div>";
    }
  }).catch(function (req) {
    console.error("NOK", req);
  })

var nombrePanier = document.getElementById('nombrePanier');
var total = localStorage.getItem('total');
nombrePanier.innerHTML = total;