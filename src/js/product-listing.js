import { loadHeaderFooter, getParam } from "./utils.mjs";
// Import the ProductData class from the module
import ProductData from "./ProductData.mjs";

// Create a instance of ProductList class in the main.js file
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

//console.log("Product ID:", productId);

// first create an instance of the ProductData class.
const dataSource = new ProductData();

// Si quieres probar que funciona, puedes obtener los datos así (opcional para prueba)
//dataSource.getData().then(data => console.log(data));

// then get the element you want the product list to render in
const element = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, element);
// Call the init method to fetch and render the product list
productList.init();
