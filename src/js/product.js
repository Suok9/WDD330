import { getParam } from './utils.mjs';
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

// 2. Create data source
const dataSource = new ProductData();

// 3. Create the product details controller
const product = new ProductDetails(productId, dataSource);

// 4. Load the page
product.init();