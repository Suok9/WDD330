
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Function to calculate the total price of all items in the cart
function calculateTotal(cartItems) {
  let total = 0;

  // Loop through each cart item and calculate the total price
  cartItems.forEach(item => {
    total += Number(item.FinalPrice) * (item.qty ?? item.quantity ?? 1); // Price * Quantity
  });

  // Update the total price in the HTML
  document.getElementById('totalPrice').textContent = total.toFixed(2); // Display the total with two decimal places
}

// Render the contents of the cart
function renderCartContents() {
  // Get the cart items from localStorage, or default to an empty array
  const cartItems = getLocalStorage("so-cart") || [];  

  // If no items are in the cart, display a message
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById('totalPrice').textContent = "0.00"; // Set total to 0 if cart is empty
    return;
  }

  // Map over the cart items and generate HTML for each item
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  
  // Join the array into a string and set the innerHTML of the product list
  document.querySelector(".product-list").innerHTML = htmlItems.join(""); 
  
  // Add event listeners to the remove buttons after content is rendered
  addRemoveButtonListeners();

   // Calculate and display the total price
  calculateTotal(cartItems);  // Call the function to update the total
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
      <p class="cart-card__quantity">Qty: ${(item.qty ?? item.quantity ?? 1)}</p>
      <p class="cart-card__price">
      $${(Number(item.FinalPrice) * (item.qty ?? item.quantity ?? 1)).toFixed(2)}
      </p>
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

// Add event listener to the "Add to Cart" button
const addToCartButton = document.querySelector('.add-to-cart-button');

if (addToCartButton) { // Ensure the button is found
  addToCartButton.addEventListener('click', function() {
    // Create a product object with the required information
    const product = {
      Name: 'Marmot Ajax Tent',          // Product name
      FinalPrice: 199.99,               // Product price
      qty: 1,                           // Quantity added
      Image: 'image-url',               // Product image URL
      Colors: [{ ColorName: 'Terracotta' }],  // Product colors
      quantity: 1                        // Product quantity
    };

    // Add the product to the cart and update the total
    addToCart(product);  // This will call your addToCart function
  });
} else {
  console.log('Add to Cart button not found');
}

// Function to add a product to the cart
function addToCart(product) {
  // Get current cart items from localStorage
  const cartItems = getLocalStorage("so-cart") || [];

  // Check if the product already exists in the cart (Optional)
  const existingProductIndex = cartItems.findIndex(item => item.Name === product.Name);
  if (existingProductIndex >= 0) {
    // If it exists, increase the quantity
    cartItems[existingProductIndex].qty += product.qty;
  } else {
    // If it doesn't exist, add the new product
    cartItems.push(product);
  }

  // Save the updated cart to localStorage
  setLocalStorage("so-cart", cartItems);

  // Re-render the cart and recalculate the total
  renderCartContents(); // This will trigger the total calculation as well
}
document.addEventListener("DOMContentLoaded", renderCartContents); // Call function when DOM is loaded
