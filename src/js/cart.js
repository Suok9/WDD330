import { getLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  const qty = item.quantity || 1;
  const priceEach = Number(item.FinalPrice) || 0;
  const lineTotal = (priceEach * qty).toFixed(2);

  const colorName = (item.Colors && item.Colors[0] && item.Colors[0].ColorName) || '';

  return `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img src='${item.Image || ''}' alt='${item.Name || ''}'/>
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name || ''}</h2>
  </a>
  <p class='cart-card__color'>${colorName}</p>
  <p class='cart-card__quantity'>qty: ${qty}</p>
  <p class='cart-card__price'>$${lineTotal}</p>
</li>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const container = document.querySelector('.product-list');
  if (container) {
    container.innerHTML = htmlItems.join('');
  } else {
    console.warn('Cart render: .product-list not found in DOM.');
  }
}

function calculateCartTotal() {
  const cartItems = getLocalStorage('so-cart') || [];
  const total = cartItems.reduce((sum, item) => {
    const qty = item.quantity || 1;
    const price = Number(item.FinalPrice) || 0;
    return sum + price * qty;
  }, 0);
  const totalEl = document.querySelector('.cart-total');
  if (totalEl) totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

renderCartContents();
calculateCartTotal();

// update when other parts of the app signal cart changed
window.addEventListener('cartUpdated', () => {
  renderCartContents();
  calculateCartTotal();
});
