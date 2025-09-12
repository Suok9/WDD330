// cart.js
const CART_KEY = "so-cart";

// --- storage helpers ---
function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  try {
    return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// --- render helpers ---
function money(v) {
  const n = Number(v ?? 0);
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}
function cartItemHTML(item, index) {
  const color = item?.Colors?.[0]?.ColorName ?? "Default";
  const qty = item?.Quantity ?? 1;
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}">
      </a>
      <a href="#"><h3>${item.Name}</h3></a>
      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: ${qty}</p>
      <p class="cart-card__price">${money(item.FinalPrice)}</p>
      <button class="remove-btn" data-index="${index}" aria-label="Remove ${item.Name}">
        Remove
      </button>
    </li>
  `;
}

function renderCart() {
  const list = document.querySelector(".product-list"); // <ul> on cart page
  const totalEl = document.querySelector(".cart-total"); // optional: <div class="cart-total"></div>
  const cart = getCart();

  if (!list) return;

  if (!cart.length) {
    list.innerHTML = `<li class="cart-card divider"><p>Your cart is empty.</p></li>`;
    if (totalEl) totalEl.textContent = "";
    return;
  }

  list.innerHTML = cart.map(cartItemHTML).join("");

  // total
  const total = cart.reduce(
    (sum, i) => sum + Number(i.FinalPrice ?? 0) * Number(i.Quantity ?? 1),
    0,
  );
  if (totalEl) totalEl.textContent = `Total: ${money(total)}`;
}

// --- events (event delegation) ---
function wireEvents() {
  const list = document.querySelector(".product-list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const idx = Number(btn.dataset.index);
    const cart = getCart();
    if (Number.isInteger(idx) && idx >= 0 && idx < cart.length) {
      cart.splice(idx, 1);
      saveCart(cart);
      renderCart();
    }
  });

  // (Optional) Clear all
  const clearBtn = document.querySelector(".clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      saveCart([]);
      renderCart();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  wireEvents();
});
