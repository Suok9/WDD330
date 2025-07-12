import { getLocalStorage, setLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors ? item.Colors[0].ColorName : 'Standard'}</p>
    <p class="cart-card__quantity">
      <label for="qty-${item.Id}">Qty:</label>
      <select class="cart-quantity" data-id="${item.Id}" id="qty-${item.Id}">
        ${generateQuantityOptions(item.quantity || 1)}
      </select>
    </p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="cart-remove-item" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">
      ✕
    </button>
  </li>`;
}

function generateQuantityOptions(currentQty) {
  let options = '';
  for (let i = 1; i <= 10; i++) {
    options += `<option value="${i}" ${i === currentQty ? 'selected' : ''}>${i}</option>`;
  }
  return options;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async renderCartContents() {
    const cartItems = this.getCartContents();
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    
    // Get the cart container
    const cartContainer = document.querySelector(this.parentSelector);
    
    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Add some great outdoor gear to get started!</p>
          <a href="/index.html" class="button">Continue Shopping</a>
        </div>
      `;
      this.setCartFooter();
      return;
    }

    cartContainer.innerHTML = htmlItems.join('');
    
    // Calculate and display total
    this.calculateCartTotal();
    this.setCartFooter();
    
    // Add event listeners
    this.addCartEventListeners();
  }

  getCartContents() {
    const cartItems = getLocalStorage(this.key);
    return cartItems || [];
  }

  calculateCartTotal() {
    const cartItems = this.getCartContents();
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.FinalPrice * (item.quantity || 1));
    }, 0);
    this.total = total;
    return total;
  }

  setCartFooter() {
    this.calculateCartTotal();
    
    // Remove existing footer if it exists
    const existingFooter = document.querySelector('.cart-footer');
    if (existingFooter) {
      existingFooter.remove();
    }

    // Create new footer
    const cartSection = document.querySelector('.products');
    const footer = document.createElement('div');
    footer.className = 'cart-footer';
    
    const cartItems = this.getCartContents();
    const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    footer.innerHTML = `
      <div class="cart-total">
        <p class="cart-subtotal">
          <span>Items (${itemCount}):</span>
          <span>$${this.total.toFixed(2)}</span>
        </p>
        <div class="cart-checkout">
          <button class="checkout-btn" ${cartItems.length === 0 ? 'disabled' : ''}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    `;
    
    cartSection.appendChild(footer);
    
    // Add checkout event listener
    const checkoutBtn = footer.querySelector('.checkout-btn');
    if (checkoutBtn && !checkoutBtn.disabled) {
      checkoutBtn.addEventListener('click', () => {
        window.location.href = '/checkout/index.html';
      });
    }
  }

  addCartEventListeners() {
    // Quantity change listeners
    const quantitySelects = document.querySelectorAll('.cart-quantity');
    quantitySelects.forEach(select => {
      select.addEventListener('change', (e) => {
        const productId = e.target.dataset.id;
        const newQuantity = parseInt(e.target.value);
        this.updateQuantity(productId, newQuantity);
      });
    });

    // Remove item listeners
    const removeButtons = document.querySelectorAll('.cart-remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        this.removeItem(productId);
      });
    });
  }

  updateQuantity(id, quantity) {
    let cartItems = this.getCartContents();
    cartItems = cartItems.map(item => {
      if (item.Id === id) {
        item.quantity = quantity;
      }
      return item;
    });
    
    setLocalStorage(this.key, cartItems);
    this.renderCartContents();
  }

  removeItem(id) {
    let cartItems = this.getCartContents();
    cartItems = cartItems.filter(item => item.Id !== id);
    
    setLocalStorage(this.key, cartItems);
    this.renderCartContents();
    
    // Update cart count in header if it exists
    this.updateCartCount();
  }

  updateCartCount() {
    const cartItems = this.getCartContents();
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Update any cart count displays
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
      element.textContent = totalItems;
      element.style.display = totalItems > 0 ? 'inline' : 'none';
    });
  }
}