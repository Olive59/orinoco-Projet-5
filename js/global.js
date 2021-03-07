function getFromAPI(url) {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest()
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
        if (req.status == 200) {
          resolve(req.responseText)
        } else {
          reject(req)
        }
      }
    };
    req.open('GET', url, true);
    req.send(null);
  })
}

function postToAPI(url, product) {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest()
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
        if (this.readyState = 201) {
          resolve(JSON.parse(req.responseText));
        } else {
          reject(req)
        }
      }
    }
    req.open('POST', url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(product));
  })
}

function checkPanier() {
  var total = localStorage.getItem('total');
  if (total == null || total == 0) {
    document.getElementById("linkPanier").href = "javascript:void(0);"
    document.getElementById("linkPanier").style.cursor='default';
  } else {
    document.getElementById("linkPanier").href = "panier.html";
    document.getElementById("linkPanier").style.cursor='pointer';
  }
}