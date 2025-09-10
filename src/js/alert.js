export default class Alert {
  constructor(jsonPath = "./js/alerts.json") {
    this.jsonPath = jsonPath;
  }

  async showAlerts() {
    try {
      const response = await fetch(this.jsonPath);
      const data = await response.json();

      if (data.length > 0) {
        const section = document.createElement("section");
        section.classList.add("alert-list");

        data.forEach((alert) => {
          const p = document.createElement("p");
          p.textContent = alert.message;
          p.style.backgroundColor = alert.background;
          p.style.color = alert.color;
          section.appendChild(p);
        });

        document.querySelector("main").prepend(section);
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }
}
