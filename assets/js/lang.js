// lang.js

function initLangSwitcher() {
  const langSwitcher = document.getElementById("lang-switcher");
  if (!langSwitcher) return; // Si no existe, no hace nada

  const defaultLang = localStorage.getItem("lang") || "es";
  loadLanguage(defaultLang);
  langSwitcher.value = defaultLang;

  langSwitcher.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("lang", selectedLang);
    loadLanguage(selectedLang);
  });
}

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (translations[key]) {
          elem.textContent = translations[key];
        }
      });
    })
    .catch(error => {
      console.error(`Error al cargar el archivo de idioma ${lang}:`, error);
    });
}
