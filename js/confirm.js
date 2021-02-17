    var lastName = localStorage.getItem('lastName');
    var prenom = document.getElementById('prenom');
    prenom.innerHTML = lastName;

    var firstName = localStorage.getItem('firstName');
    var nom = document.getElementById('nom');
    nom.innerHTML = firstName;

    var prixTotal = localStorage.getItem('prixTotal');
    var totalPanier = document.getElementById("totalPanier");
    totalPanier.innerHTML = +prixTotal + ".00€";

    var orderId = localStorage.getItem('orderId');
    var numeroCommande = document.getElementById("numeroCommande");
    numeroCommande.innerHTML = orderId;