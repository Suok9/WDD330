import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  let cartItems = getLocalStorage('so-cart') || [];

  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems]; 
  }

  const cartListE1 = document.querySelector('.product-list');

  // Check if cart is empty
  if (cartItems.length === 0) {
    cartListE1.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  cartListE1.innerHTML = htmlItems.join('');

  addRemoveListeners(); 
}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider" data-id="${item.id}">
    <a href="../product_pages/index.html?product=${item.id}" class="cart-card__image">
      <img src="${item.Image || ''}" alt="${item.Name || 'Product Image'}" />
    </a>
    <a href="../product_pages/index.html?product=${item.id}">
      <h2 class="card__name">${item.Name || 'Product Name'}</h2>
    </a>
    <p class="cart-card__color">${item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : 'No color specified'}</p>
    <p class="cart-card__quantity">qty: <span class="item-quantity">${item.quantity || 1}</span></p>
    <p class="cart-card__price">$${item.FinalPrice || '0.00'}</p>
    
    <div class="cart-card__quantity">
        <button class="quantity-decrease">-</button>
        <input type="number" class="quantity-input" value="${item.quantity || 1}" min="1" />
        <button class="quantity-increase">+</button>
    </div>
    <button class="remove-btn" data-id="${item.id}">Remove</button>
  </li>`;
}

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll('.remove-btn'); 

  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id; 
      removeItem(id); 
    });
  });
}

function removeItem(id) {
  let cartItems = getLocalStorage('so-cart') || [];

  // Filter out the item to remove
  const newCart = cartItems.filter(item => String(item.id) !== String(id));
  
  setLocalStorage('so-cart', newCart); 
  renderCartContents(); 
}

document.addEventListener("DOMContentLoaded", function() {
    const decreaseButtons = document.querySelectorAll('.quantity-decrease');
    const increaseButtons = document.querySelectorAll('.quantity-increase');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.nextElementSibling;
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
                updateCartQuantity(button.closest('.cart-card').dataset.id, quantityInput.value);
            }
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.previousElementSibling;
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
            updateCartQuantity(button.closest('.cart-card').dataset.id, quantityInput.value);
        });
    });
});

function updateCartQuantity(id, quantity) {
    let cartItems = getLocalStorage('so-cart') || [];
    const itemIndex = cartItems.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = parseInt(quantity); // Update quantity
        setLocalStorage('so-cart', cartItems);
    }
}

renderCartContents();

function addToCart(product) {
  const cartItems = getLocalStorage('so-cart') || [];
  
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingProductIndex > -1) {
    // If the product exists, increase quantity
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // New product, initialize quantity
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}
