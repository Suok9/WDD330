import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  // Check if cart is empty
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <li class="cart-empty">
        <p>Your cart is empty</p>
        <p>Continue shopping <a href="../index.html">here</a></p>
      </li>
    `;
    return;
  }
  
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Add event listeners to remove buttons
  document.querySelectorAll(".cart-card__remove").forEach((button, index) => {
    button.addEventListener("click", () => removeFromCart(index));
  });
  
  // Calculate and display cart total
  displayCartTotal(cartItems);
}

function displayCartTotal(cartItems) {
  // If there's no cart total section, create one
  if (!document.querySelector(".cart-total")) {
    const totalSection = document.createElement("section");
    totalSection.className = "cart-total";
    totalSection.innerHTML = `
      <h3>Cart Summary</h3>
      <p>Total: $<span id="cart-total-amount">0.00</span></p>
      <button id="checkout-button" class="checkout-button">Checkout</button>
    `;
    document.querySelector(".products").appendChild(totalSection);
    
    // Add checkout button event listener
    document.getElementById("checkout-button").addEventListener("click", () => {
      alert("Checkout functionality would go here!");
    });
  }
  
  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.FinalPrice), 0);
  document.getElementById("cart-total-amount").textContent = total.toFixed(2);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <div class="cart-card__details">
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="cart-card__remove">Remove</button>
    </div>
  </li>`;

  return newItem;
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

// Initialize the cart display when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
});
