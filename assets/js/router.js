const routes = {
  home: "views/home.html",
  about: "views/about.html",
  contact: "views/contact.html",
  service: "views/service.html",
  project: "views/project.html",
  team: "views/team.html",
  testimonial: "views/testimonial.html",
  blog: "views/blog.html",
  faqs: "views/faqs.html"
};

function loadView(view) {
  const path = routes[view] || "views/404.html";
  fetch(path)
    .then(res => res.text())
    .then(html => {
      document.getElementById("view-container").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("view-container").innerHTML = "<h2>Error al cargar la vista.</h2>";
    });
}

window.addEventListener("hashchange", () => {
  const view = location.hash.slice(2) || "home";
  loadView(view);
});

window.addEventListener("DOMContentLoaded", () => {
  const view = location.hash.slice(2) || "home";
  loadView(view);
});
