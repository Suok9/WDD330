import ProductData from "./productdata.mjs";
import ProductList from "./productlist.mjs";
// data source for tents.json
const dataSource = new ProductData("tents");

// the <ul> on the home page where cards will go
const listElement = document.querySelector(".product-list");

// build and initialize the product list
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
