import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");

  // Carrito vacío
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    productList.innerHTML = `<li><p>Your cart is empty.</p></li>`;
    hideCartFooter();
    return;
  }

  // Renderizar productos
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Activar inputs para cambiar cantidad
  addQuantityListeners(cartItems);

  // Mostrar footer y total
  updateCartTotal(cartItems);
  showCartFooter();
}

function cartItemTemplate(item) {
  const colorName = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color";
  const quantity = item.quantity || 1;

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">
      qty: 
      <input type="number" min="1" value="${quantity}" data-id="${item.Id}" class="quantity-input">
    </p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function calculateCartTotal(items) {
  return items.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.FinalPrice * quantity;
  }, 0);
}

function updateCartTotal(items) {
  const total = calculateCartTotal(items);
  const totalElement = document.querySelector("#cartTotal");
  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }
}

function showCartFooter() {
  document.querySelector(".cart-footer").classList.remove("hide");
}

function hideCartFooter() {
  document.querySelector(".cart-footer").classList.add("hide");
}

function addQuantityListeners(cartItems) {
  const inputs = document.querySelectorAll(".quantity-input");

  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const newQuantity = parseInt(e.target.value);
      const productId = e.target.dataset.id;

      if (isNaN(newQuantity) || newQuantity < 1) return;

      const itemIndex = cartItems.findIndex((item) => item.Id === productId);

      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = newQuantity;
        setLocalStorage("so-cart", cartItems);
        updateCartTotal(cartItems);
      }
    });
  });
}


//function calculateCartTotal() {
  //const cartItems = getLocalStorage('so-cart');
  //const total = cartItems.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
  //document.querySelector('#total').textContent = `$${total.toFixed(2)}`;
//}

//calculateCartTotal();

renderCartContents();
