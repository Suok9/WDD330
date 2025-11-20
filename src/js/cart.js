import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  let cartItems = getLocalStorage('so-cart') || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems]; 
  }

  const cartListE1 = document.querySelector('.product-list');

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
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/index.html?product=${item.id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    
    <div class="cart-card__quantity">
        <button class="quantity-decrease">-</button>
        <input type="number" class="quantity-input" value="1" min="1" />
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
  const cartItems = getLocalStorage('so-cart') || [];

  // Filter out the item to remove
  const stringifiedId = String(id);
  const newCart = cartItems.filter(item => String(item.id) !== stringifiedId);



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
            }
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.previousElementSibling;
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
        });
    });
});

renderCartContents();
