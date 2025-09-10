import { numberOfCartItems } from "./cartItems";
import { getLocalStorage } from "./utils.mjs";
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <li class="cart-empty">
        <p>Your cart is empty</p>
        <p>Continue shopping <a href="../index.html">here</a></p>
      </li>
    `;
    document.querySelector(".cart-total").innerHTML = "";
    numberOfCartItems();
    return;
  }

  numberOfCartItems();
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  displayCartTotal(cartItems);
  setupEventListeners(); // **Ensure event listeners reattach after rerender**
};

function displayCartTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.FinalPrice) * (item.quantity || 1),
    0
  );
  document.getElementById("cart-total-amount").textContent = total.toFixed(2);
}

function setupEventListeners() {
  document.querySelectorAll(".cart-card__quantity__down").forEach((button) => {
    button.removeEventListener("click", updateQuantityHandler);
    button.addEventListener("click", updateQuantityHandler);
  });

  document.querySelectorAll(".cart-card__quantity__up").forEach((button) => {
    button.removeEventListener("click", updateQuantityHandler);
    button.addEventListener("click", updateQuantityHandler);
  });

  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.removeEventListener("click", removeItemHandler);
    button.addEventListener("click", removeItemHandler);
  });

  const checkoutButton = document.getElementById("checkout-button");
  if (checkoutButton) {
    checkoutButton.removeEventListener("click", handleCheckoutClick);
    checkoutButton.addEventListener("click", handleCheckoutClick);
  }
}


function updateQuantityHandler(event) {
  const index = parseInt(event.target.dataset.index, 10);
  let change;
  if (event.target.classList.contains("cart-card__quantity__up")) {
    change = 1; // Increase quantity
  } else {
    change = -1; // Decrease quantity
  }
  updateQuantity(index, change);
};

function updateQuantity(index, change) {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems[index]) {
    cartItems[index].quantity = Math.max(1, (cartItems[index].quantity || 1) + change);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
    setupEventListeners(); // **Ensure listeners reattach after updating quantity**
  }
}

function removeItemHandler(event) {
  const index = parseInt(event.target.dataset.index, 10);
  removeFromCart(index);
};

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
  setupEventListeners(); // **Reattach listeners after item removal**
  numberOfCartItems();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <div class="cart-card__details">
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <div class="cart-card__quantity__buttons">
        <button class="cart-card__quantity__down" data-index="${index}">-</button>
        <button class="cart-card__quantity__up" data-index="${index}">+</button>
      </div>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="cart-card__remove" data-index="${index}">Remove</button>
    </div>
  </li>`;

  return newItem;
};

// Initialize the cart display when the page loads and set up event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  setupEventListeners();
});