function initRouter() {
  const routes = {
    home: 'views/home.html',
    about: 'views/about.html',
    service: 'views/service.html',
    project: 'views/project.html',
    team: 'views/team.html',
    testimonial: 'views/testimonial.html',
    blog: 'views/blog.html',
    faqs: 'views/faqs.html',
    contact: 'views/contact.html',
    '404': 'views/404.html'
  };

  function loadView(route) {
    const path = routes[route] || routes['404'];
    fetch(path)
      .then(res => res.ok ? res.text() : Promise.reject('Vista no encontrada'))
      .then(html => {
        document.getElementById('view-container').innerHTML = html;
        setActiveLink(route);
      })
      .catch(err => {
        document.getElementById('view-container').innerHTML = `<p>Error: ${err}</p>`;
      });
  }

  function setActiveLink(route) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${route}`);
    });
  }

  window.addEventListener('hashchange', () => {
    const route = location.hash.slice(1) || 'home';
    loadView(route);
  });

  const route = location.hash.slice(1) || 'home';
  loadView(route);
}
