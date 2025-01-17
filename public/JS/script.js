// Load header and footer
document.addEventListener("DOMContentLoaded", function () {
    fetch("/partials/header.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("header").innerHTML = data;
      });
  
    fetch("/partials/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer").innerHTML = data;
      });
  });
  
  // Cart functionality
  let cart = [];
  
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("buy-button")) {
      const game = event.target.getAttribute("data-game");
      const price = parseFloat(event.target.getAttribute("data-price"));
      addToCart(game, price);
    }
  });
  
  function addToCart(game, price) {
    cart.push({ game, price });
    updateCartCount();
  }
  
  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = cart.length;
  }