import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;                       // e.g. "so-cart"
    this.listElement = document.querySelector(listElement); // e.g. "#cart-list"
    this.template = document.querySelector("#cart-item-template");
  }

  init() {
    this.renderCartContents();
  }

  getCartItems() {
    return getLocalStorage(this.key) || [];
  }

  setCartItems(items) {
    setLocalStorage(this.key, items);
  }

  clearCart() {
    this.setCartItems([]);
    this.renderCartContents();
  }

  removeItem(id) {
    let cart = this.getCartItems();
    cart = cart.filter((item) => item.Id !== id);
    this.setCartItems(cart);
    this.renderCartContents();
  }

  renderCartContents() {
    const cartItems = this.getCartItems();

    // Clear list
    this.listElement.innerHTML = "";

    // Nothing in cart
    if (cartItems.length === 0) {
      this.listElement.innerHTML = `<p class="empty">Your cart is empty</p>`;
      return;
    }

    cartItems.forEach((item) => {
      const clone = this.template.content.cloneNode(true);

      // Populate template
      clone.querySelector(".cart-image").src = item.Image;
      clone.querySelector(".cart-name").textContent = item.Name;
      clone.querySelector(".cart-price").textContent = `$${item.FinalPrice}`;
      clone.querySelector(".cart-qty").textContent = item.Qty || 1;

      clone
        .querySelector(".remove-item")
        .addEventListener("click", () => this.removeItem(item.Id));

      this.listElement.appendChild(clone);
    });

    this.renderTotals();
  }

  renderTotals() {
    const cart = this.getCartItems();
    const total = cart.reduce((sum, item) => sum + Number(item.FinalPrice), 0);

    const totalElement = document.querySelector("#cart-total");
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
  }
}