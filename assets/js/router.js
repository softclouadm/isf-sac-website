const routes = {
  home: "views/home.html",
  about: "views/about.html",
  contact: "views/contact.html",
  service: "views/service.html",
  project: "views/project.html",
  team: "views/team.html",
  testimonial: "views/testimonial.html",
  blog: "views/blog.html",
  faqs: "views/faqs.html",
   marcas: "views/marcas.html",
  notFound: "views/404.html",
  
};

function loadView(route) {
  const url = routes[route] || routes.notFound;
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.text();
    })
    .then(html => {
      const container = document.getElementById("vista-principal");
      if (!container) {
        console.error("No se encontró el contenedor #vista-principal");
        return;
      }
      container.innerHTML = html;

      // Inicializar componentes específicos por vista
      if (route === "home") {
        setTimeout(() => {
          if (typeof $ === "function" && $(".header-carousel").length > 0) {
            $(".header-carousel").owlCarousel({
              items: 1,
              autoplay: true,
              smartSpeed: 2000,
              center: false,
              dots: false,
              loop: true,
              margin: 0,
              nav: true,
              navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
              ]
            });
          }
        }, 100);
      }
    })
    .catch(err => {
      console.error("Error al cargar vista:", err);
      const container = document.getElementById("vista-principal");
      if (container) container.innerHTML = "<p>Error al cargar la vista.</p>";
    });
}

// Manejo de cambio de hash para SPA
window.addEventListener("hashchange", () => {
  const hash = location.hash.replace("#", "") || "home";
  loadView(hash);
});

// Carga inicial al entrar a la página
window.addEventListener("DOMContentLoaded", () => {
  const hash = location.hash.replace("#", "") || "home";
  loadView(hash);
});
