document.addEventListener("DOMContentLoaded", () => {
  loadComponent("components/navbar.html", "#navbar-container");
  loadComponent("components/footer.html", "#footer-container");
});

function loadComponent(url, selector) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch(err => console.error(`Error al cargar ${url}:`, err));
}
