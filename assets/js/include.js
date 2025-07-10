// include.js
function loadComponent(url, selector) {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch(err => console.error(`Error al cargar ${url}:`, err));
}

document.addEventListener("DOMContentLoaded", () => {
  // Primero carga el header y luego inicializa el selector de idioma
  loadComponent("components/header.html", "#header-container")
    .then(() => {
      initLangSwitcher(); // Inicializa el cambio de idioma cuando el header ya está cargado
      // Carga los demás componentes (footer, modals) sin esperar
      loadComponent("components/footer.html", "#footer-container");
      loadComponent("components/modals/contacto-modal.html", "#modals-container");
    });
});
