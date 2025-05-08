// Function to get data from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return [];
  }
}

// Function to save data to localStorage
export function setLocalStorage(key, data) {
  let items = getLocalStorage(key);
  
  // Check if items is an array
  if (!Array.isArray(items)) {
    items = [];
  }
  
  // Add the new item to the array
  items.push(data);
  
  // Save back to localStorage
  localStorage.setItem(key, JSON.stringify(items));
}
