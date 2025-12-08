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



export default class ExternalServices {
  constructor(category = "tents") {
    this.category = category;
    this.path = `../json/${this.category}.json`; 
  }
  
  
  async getData(category) {
  const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
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