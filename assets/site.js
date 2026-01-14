/* UPDATED assets/site.js (supports EN/IT/ES/DE/RU/TR) */
(function () {
  const KEY = "alimentarus_lang";
  const supported = ["en", "it", "es", "de", "ru", "tr"];

  const blocks = Array.from(document.querySelectorAll(".langblock"));
  const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));

  function setLang(lang) {
    if (!supported.includes(lang)) lang = "en";

    blocks.forEach((el) => {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });

    buttons.forEach((btn) => {
      const active = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  // init (saved → browser preference → EN)
  let lang = "en";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && supported.includes(saved)) {
      lang = saved;
    } else {
      const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
      if (supported.includes(nav)) lang = nav;
    }
  } catch (e) {}

  setLang(lang);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-set-lang")));
  });
})();
