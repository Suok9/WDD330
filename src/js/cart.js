import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';
import { loadHeaderFooter, renderNumberOfItemsBackpack } from './utils.mjs';

loadHeaderFooter();
// ------------ RENDER CART ------------
function renderCartContents() {
  let cartItems = getLocalStorage('so-cart') || [];

  if (!Array.isArray(cartItems)) cartItems = [cartItems];

  const cartListEl = document.querySelector('.product-list');

  // Empty cart
  if (cartItems.length === 0) {
    cartListEl.innerHTML = '<p>Your cart is empty.</p>';
    document.querySelector(".cart-total").textContent = "$0.00";
    return;
  }

  const htmlItems = cartItems.map(item => cartItemTemplate(item));
  cartListEl.innerHTML = htmlItems.join('');

  addRemoveListeners();
  addQuantityListeners();
  addInputListeners();
  updateCartTotal();
}

// ------------ ITEM TEMPLATE ------------
function cartItemTemplate(item) {
  return `
  <li class="cart-card divider" data-id="${item.id}">
    <a href="../product_pages/index.html?product=${item.id}" class="cart-card__image">
      <img src="${item.Image || ''}" alt="${item.Name || 'Product Image'}" />
    </a>

    <a href="../product_pages/index.html?product=${item.id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <p class="cart-card__color">
      ${item.Colors?.[0]?.ColorName || 'No color specified'}
    </p>

    <p class="cart-card__price">$${item.FinalPrice}</p>

    <div class="cart-card__quantity">
      <button class="quantity-decrease">-</button>
      <input type="number" class="quantity-input" value="${item.quantity}" min="1" />
      <button class="quantity-increase">+</button>
    </div>

    <button class="remove-btn" data-id="${item.id}">Remove</button>
  </li>`;
}

// ------------ REMOVE ITEMS ------------
function addRemoveListeners() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      removeItem(id);
    });
  });
}

function removeItem(id) {
  let cartItems = getLocalStorage('so-cart') || [];
  const newCart = cartItems.filter(item => String(item.id) !== String(id));
  setLocalStorage('so-cart', newCart);
  renderCartContents();
  updateCartBadge();
}

// ------------ QUANTITY BUTTONS ------------
function addQuantityListeners() {
  const decreaseButtons = document.querySelectorAll('.quantity-decrease');
  const increaseButtons = document.querySelectorAll('.quantity-increase');

  decreaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.nextElementSibling;
      let qty = parseInt(input.value);
      if (qty > 1) {
        qty--;
        input.value = qty;
        updateCartQuantity(button.closest('.cart-card').dataset.id, qty);
      }
    });
  });

  increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      let qty = parseInt(input.value);
      qty++;
      input.value = qty;
      updateCartQuantity(button.closest('.cart-card').dataset.id, qty);
    });
  });
}

// ------------ DIRECT INPUT UPDATE ------------
function addInputListeners() {
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', () => {
      let qty = parseInt(input.value);
      if (qty < 1 || isNaN(qty)) qty = 1;
      input.value = qty;

      const id = input.closest('.cart-card').dataset.id;
      updateCartQuantity(id, qty);
    });
  });
}

// ------------ UPDATE CART DATA ------------
function updateCartQuantity(id, quantity) {
  let cartItems = getLocalStorage('so-cart') || [];

  const index = cartItems.findIndex(item => String(item.id) === String(id));
  if (index !== -1) {
    cartItems[index].quantity = quantity;
    setLocalStorage('so-cart', cartItems);
  }

  updateCartTotal();
  updateCartBadge();
}

// ------------ TOTAL PRICE ------------
function updateCartTotal() {
  const cartItems = getLocalStorage('so-cart') || [];
  const total = cartItems.reduce(
    (sum, item) => sum + (item.FinalPrice * item.quantity),
    0
  );

  document.querySelector(".cart-total").textContent = `$${total.toFixed(2)}`;
}

// ------------ CART BADGE ------------
function updateCartBadge() {
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart"
  );
}

// ------------ ADD TO CART (USED ON PRODUCT PAGE) ------------
export function addToCart(product) {
  const cartItems = getLocalStorage('so-cart') || [];

  const index = cartItems.findIndex(item => item.id === product.id);

  if (index > -1) {
    cartItems[index].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
  updateCartBadge();
}

// ------------ LOAD CART ON PAGE READY ------------
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  updateCartBadge();
  updateCartTotal();
});

document.getElementById("clear-cart").addEventListener("click", () => {
  setLocalStorage("so-cart", []);
  renderCartContents();
  updateCartBadge();
});