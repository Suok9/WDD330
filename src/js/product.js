// Remove this if you aren’t using it (or switch to the helper below):
// import { setLocalStorage } from "./utils.mjs";

import ProductData from "./productdata.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // If you want to use the helper instead, uncomment:
  // const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  // cart.push(product);
  // localStorage.setItem("so-cart", JSON.stringify(cart));

  // Using plain localStorage for now (matches your code):
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  cart.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

async function renderProductDetails(productId) {
  // Ensure number-to-number comparison for item.Id
  const product = await dataSource.findProductById(Number(productId));
  const container = document.querySelector("#product-details");
  if (!container) return;

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <img src="${product.Image}" alt="${product.Name}">
    <h2>${product.Name}</h2>
    <p>${product.DescriptionHtmlSimple ?? ""}</p>
    <p>Price: $${product.FinalPrice}</p>
    <button id="addToCart" class="btn" data-id="${product.Id}">Add to Cart</button>
  `;

  const addBtn = document.getElementById("addToCart");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addProductToCart(product);
      // relative path so it works under any base
      window.location.href = "../cart/index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  if (productId) {
    renderProductDetails(productId);
  } else {
    const container = document.querySelector("#product-details");
    if (container) container.innerHTML = "<p>No product selected.</p>";
  }
});


