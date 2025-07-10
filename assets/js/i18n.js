// Idioma actual (debe coincidir con el de inicio)
let currentLang = 'es';

// Función para cambiar idioma
function setCurrentLanguage(lang) {
  currentLang = lang;
  loadLang(lang);
}
window.setCurrentLanguage = setCurrentLanguage;

// Carga archivo JSON y actualiza los textos
function loadLang(lang) {
  const route = location.hash.replace('#', '') || 'home';
  const jsonPath = `lang/${route}/${lang}.json`;

  fetch(jsonPath)
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) el.textContent = translations[key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key]) el.placeholder = translations[key];
      });
      document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        if (translations[key]) el.alt = translations[key];
      });
    })
    .catch(err => {
      console.error("Error cargando traducciones:", err);
    });
}
