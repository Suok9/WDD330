import { setLocalStorage } from "./utils.mjs";
import ProductData from "./productdata.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get current cart from localStorage
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Add the new product to the cart
  cart.push(product);

  // Save the updated cart back to localStorage
  localStorage.setItem("so-cart", JSON.stringify(cart));  // Using localStorage directly for now
}

async function renderProductDetails(productId) {
  // Fetch the product by ID from the data source
  const product = await dataSource.findProductById(productId);
  if (!product) {
    document.querySelector("#product-details").innerHTML = "<p>Product not found.</p>";
    return;
  }

  // Render the product details dynamically in the HTML
  document.querySelector("#product-details").innerHTML = `
    <img src="${product.Image}" alt="${product.Name}">
    <h2>${product.Name}</h2>
    <p>${product.DescriptionHtmlSimple}</p>
    <p>Price: $${product.FinalPrice}</p>
    <button id="addToCart" class="btn" data-id="${product.Id}">Add to Cart</button>
  `;

  // Add event listener for Add to Cart button
  const addBtn = document.getElementById("addToCart");
  addBtn.addEventListener("click", () => {
    addProductToCart(product);
    window.location.href = "/cart/index.html";  // Redirect to the cart page after adding
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");  // Get the product ID from the URL
  if (productId) {
    renderProductDetails(productId);  // Load and display product details
  }
});

