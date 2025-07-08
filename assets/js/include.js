document.addEventListener("DOMContentLoaded", () => {
  loadComponent("components/navbar.html", "#navbar-container", () => {
    initRouter(); // Espera a que se cargue navbar y luego inicia el router
  });
  loadComponent("components/footer.html", "#footer-container");
});

function loadComponent(url, selector, callback) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
      if (typeof callback === 'function') callback();
    })
    .catch(err => console.error(`Error al cargar ${url}:`, err));
}
