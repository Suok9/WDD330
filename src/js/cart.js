
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  
  // Join the array into a string and set the innerHTML of the product list
  document.querySelector(".product-list").innerHTML = htmlItems.join(""); 
  
  // Add event listeners to the remove buttons after content is rendered
  addRemoveButtonListeners();
}

// Template for each item in the cart
function cartItemTemplate(item, index) {
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
      <button class="remove-cart-item" data-index="${index}">Remove</button> <!-- Remove button -->
    </li>
  `;
}

// Remove item from the cart
function removeItemFromCart(index) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1); // Remove item at the specified index
  setLocalStorage("so-cart", cartItems); // Save updated cart to localStorage
  renderCartContents(); // Re-render the updated cart
}

// Add event listeners to all remove buttons
function addRemoveButtonListeners() {
  const removeButtons = document.querySelectorAll('.remove-cart-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index; // Get the index from the data attribute
      removeItemFromCart(index); // Call the remove function
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCartContents); // Call function when DOM is loaded