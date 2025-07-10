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

// Idioma actual
let currentLang = localStorage.getItem("preferredLang") || "es";

// Función principal de carga de vistas
function loadView(route) {
  const url = routes[route] || routes.notFound;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Error de red al cargar vista");
      return res.text();
    })
    .then(html => {
      const container = document.getElementById("vista-principal");
      if (!container) {
        console.error("No se encontró #vista-principal");
        return;
      }

      container.innerHTML = html;

      // Iniciar carrusel en home
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

      // Cargar JS específico de la vista si existe
      const scriptPath = `assets/js/${route}.js`;
      fetch(scriptPath)
        .then(jsRes => {
          if (!jsRes.ok) throw new Error("JS no encontrado");
          const script = document.createElement("script");
          script.src = scriptPath;
          script.defer = true;
          document.body.appendChild(script);
        })
        .catch(() => {
          console.warn(`No se encontró JS para la vista "${route}"`);
        });

      // Aplicar traducción para esta vista
      loadLang(currentLang, route);
    })
    .catch(err => {
      console.error("Error al cargar vista:", err);
      const container = document.getElementById("vista-principal");
      if (container) container.innerHTML = "<p>Error al cargar la vista.</p>";
    });
}

// Aplicar traducción con JSON cargado dinámicamente
function loadLang(lang, route = null) {
  const currentRoute = route || (location.hash.replace("#", "") || "home");
  const langPath = `lang/${currentRoute}/${lang}.json`;

  fetch(langPath)
    .then(res => {
      if (!res.ok) throw new Error(`No se encontró lang/${currentRoute}/${lang}.json`);
      return res.json();
    })
    .then(data => applyTranslations(data))
    .catch(() => {
      console.warn(`No se pudo cargar traducción para ${currentRoute} en idioma "${lang}"`);
    });
}

// Aplica los textos en la vista actual según el JSON
function applyTranslations(data) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (data[key]) el.innerHTML = data[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (data[key]) el.setAttribute("placeholder", data[key]);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach(el => {
    const key = el.getAttribute("data-i18n-alt");
    if (data[key]) el.setAttribute("alt", data[key]);
  });
}

function setCurrentLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("preferredLang", lang);

  // Recargar la vista actual para que todo se actualice con el nuevo idioma
  const currentRoute = location.hash.replace("#", "") || "home";
  loadView(currentRoute);
}

// Detectar cambios en el hash
window.addEventListener("hashchange", () => {
  const hash = location.hash.replace("#", "") || "home";
  loadView(hash);
});

// Cargar vista inicial
window.addEventListener("DOMContentLoaded", () => {
  // Establecer idioma desde localStorage si existe
  const langSelect = document.getElementById("lang-switcher");
  if (langSelect) langSelect.value = currentLang;

  const hash = location.hash.replace("#", "") || "home";
  loadView(hash);
});
