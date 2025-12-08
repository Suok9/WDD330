export const baseURL = import.meta.env.VITE_SERVER_URL;

// simplified convertToJson (no async)
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// image builder kept the same (only path cleanup)
export function buildImageUrl(path) {
  if (!path) return "../images/tents/tent.webp"; // fallback image  
  return path.startsWith("http") ?
    path :
    `${baseURL}${path.replace(/^\/+/, "")}`;
}



export default class ProductData {
  constructor(category = "tents") {
    this.category = category;
    this.path = `../json/${this.category}.json`; 
  }
  
  
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data.Result ?? data); // supports API or local JSON
  }
  

  async findProductById(id) {
    const products = await this.getData();
    return products.find((p) => p.Id === id);
  }
  

  async checkout(orderData) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    };
    
    const response = await fetch(`${baseURL}checkout`, options);
    return convertToJson(response);
  }
}