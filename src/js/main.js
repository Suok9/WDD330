import { loadHeaderFooter } from './utils.mjs';
import { numberOfCartItems } from "./cartItems.js";

<<<<<<< HEAD
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list"); // Adjust selector based on your HTML
const productList = new ProductList("tents", dataSource, listElement);

productList.init();

import Alert from "./alert.js";

const alerts = new Alert();
alerts.showAlerts();
=======
loadHeaderFooter(numberOfCartItems);
>>>>>>> origin/main
