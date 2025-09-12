import ProductData from "./ProductData.mjs"; // Use relative path
import { setLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");
function addProductToCart(product) {
  const cartItem = {
    Image: product.Image,
    Name: product.Name,
    Colors: product.Colors || [{ ColorName: "Default" }],
    Quantity: 1,
    FinalPrice: product.FinalPrice,
  };
  let existingCart = JSON.parse(localStorage.getItem("so-cart"));
  // Ensure it's an array
  if (!Array.isArray(existingCart)) {
    existingCart = [];
  }
  existingCart.push(cartItem);
  localStorage.setItem("so-cart", JSON.stringify(existingCart));
}
// Add to cart button event handler
async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  if (!productId) {
    console.warn("No product ID found on button.");
    return;
  }
  try {
    const product = await dataSource.findProductById(productId);
    if (!product) {
      console.warn(`Product not found for ID: ${productId}`);
      return;
    }
    addProductToCart(product);
    console.log(`Product ${productId} added to cart.`);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}
// Wait for DOM to load before attaching event listener
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCartHandler);
  } else {
    console.warn("Add to Cart button not found in the DOM.");
  }
});
