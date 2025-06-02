import { getParam, loadHeaderFooter } from "../js/utils.mjs";
import ExternalServices from "../js/ExternalServices.mjs";
import { renderListWithTemplate } from "../js/utils.mjs";

loadHeaderFooter();

const searchTerm = getParam("search");
const element = document.querySelector(".product-list");

const dataSource = new ExternalServices();

async function doSearch(term) {
  const allProducts = await dataSource.getData("all");
  const filtered = allProducts.filter(product =>
    product.Name.toLowerCase().includes(term.toLowerCase())
  );

  if (filtered.length === 0) {
    element.innerHTML = "<p>No products found.</p>";
  } else {
    renderListWithTemplate(productCardTemplate, element, filtered);
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

doSearch(searchTerm);
