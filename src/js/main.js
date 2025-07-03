import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {

  new Alert().init();

  loadHeaderFooter();


  const form = document.getElementById("search-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const query = document.getElementById("search-input").value.trim();
      if (query) {
        window.location.href =
          "/src/index.html?search=" + encodeURIComponent(query);
      }
    });
  }
});