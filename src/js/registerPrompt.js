document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("register-modal");
    const closeBtn = document.getElementById("close-modal");
  
    if (!localStorage.getItem("hasVisited")) {
      modal.classList.remove("hidden");
      localStorage.setItem("hasVisited", "true");
    }
  
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  });
  