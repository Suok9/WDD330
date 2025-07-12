import { getLocalStorage } from "./utils.mjs";
// src/cart/js/cart.js
import ShoppingCart from '../js/ShoppingCart.mjs';

const cart = new ShoppingCart('so-cart', '.product-list');
cart.init();