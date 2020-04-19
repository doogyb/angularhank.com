// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
carousel();

console.log("Being Called");

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 1000);
}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

var cartObject = {
  tote: {
    quantity: 0,
    price: 0
  }
};

var total = 0;
var totePrice = 7;
var tPrice = 10;

function addToCart(item) {
  if (item == "tote") {
    if (cartObject.tote.quantity == 0) {
      let newRow = cart.insertRow(-1);
      newRow.id = "tote";
    }
    cartObject.tote.quantity += 1;
    cartObject.tote.price += totePrice;
    row = document.getElementById("tote");
    row.innerHTML = "<td>Tote Bag</td><td>" + cartObject.tote.quantity + "</td><td>€" + cartObject.tote.price + "</td>";
    total += totePrice;
    document.getElementById("total").innerHTML = "€" + total;
  }
  if (item === "tshirt") {
    let cart = document.getElementById("cart");
    let sizes = document.getElementsByName("t-sizes");
    var size;
    for (var i = 0, len = sizes.length; i < len; i++) {
      if (sizes[i].checked) { // radio checked?
        size = sizes[i].value; // if so, hold its value in val
        break; // and break out of for loop
      }
    }
    // check t-shirt doesn't already exist
    if (!(size in cartObject)) {

      let newRow = cart.insertRow(-1);
      newRow.id = size;
      cartObject[size] = {};
      cartObject[size].quantity = 1;
      cartObject[size].price = tPrice;

    }
    row = document.getElementById(size);
    row.innerHTML = "<td>T-Shirt (" + size + ")</td><td>" + cartObject[size].quantity + "</td><td>€" + cartObject[size].price + "</td>";
    cartObject[size].quantity += 1;
    cartObject[size].price += tPrice;
    total += tPrice;
    document.getElementById("total").innerHTML = "€" + total;
  }


}
// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

paypal.Buttons({
  createOrder: function(data, actions) {
    // This function sets up the details of the transaction, including the amount and line item details.
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total,
          currency: 'EUR'
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function(details) {
      // This function shows a transaction success message to your buyer.
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }
}).render('#paypal-button-container');

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);
});