import { getLocalStorage } from "./utils.mjs";

// Render the contents of the cart
function renderCartContents() {
  // Get the cart items from localStorage, or default to an empty array
  const cartItems = getLocalStorage("so-cart") || [];  

  // If no items are in the cart, display a message
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  // Map over the cart items and generate HTML for each item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  
  // Join the array into a string and set the innerHTML of the product list
  document.querySelector(".product-list").innerHTML = htmlItems.join(""); 
}

// Template for each item in the cart
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color available"}</p>
      <p class="cart-card__quantity">Qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

document.addEventListener("DOMContentLoaded", renderCartContents);
