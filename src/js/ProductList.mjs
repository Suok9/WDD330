import { renderListWithTemplate } from "./utils.mjs";

// This function will use  to return a template string
// that will be used to render the product list.
function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/?product= ${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h2 class="card__brand">${product.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`
}


// This is a class that will be used to create a list of products.
// It will be used in the product list page and the cart page.
export default class ProductList {
    constructor(category, dataSource, listElement) {
      // You passed in this information to make the class as reusable as possible.
      // Being able to define these things when you use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    async init() {
      // the dataSource will return a Promise...so you can use await to resolve it.
      const list = await this.dataSource.getData();
        // next, render the list – ** future **
        this.renderList(list);
    }

    // Create a method that will render the product list.
    renderList(list) {
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}