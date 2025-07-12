// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// utils.mjs
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// src/js/utils.mjs (add these functions if they don't exist)
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener('click', function(e) {
    if(e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  })
  const main = document.querySelector('main');
  main.prepend(alert);
  
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

// Function to add item to cart
export function addToCart(product) {
  const cartItems = getLocalStorage('so-cart') || [];
  
  // Check if item already exists
  const existingItem = cartItems.find(item => item.Id === product.Id);
  
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  
  setLocalStorage('so-cart', cartItems);
  alertMessage(`${product.Name} added to cart!`);
}