import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
  <li class="product-card">
  <a href="./index.html?product=${product.Id}">
  <img src="${product.Image}" alt="${product.Name}">
  <h3>${product.Name}</h3>
  <p class="price">${product.FinalPrice}</p>
  </a>
</li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

    this.product = [];
  }

  async init() {
    this.products = await this.dataSource.getData();
    this.renderList(this.products);
  }

  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
    products,
  'afterbegin',
true
);
  }
}
