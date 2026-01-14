(function () {
  const KEY = "alimentarus_lang";
  const buttons = Array.from(document.querySelectorAll(".lang__btn"));
  const blocks = Array.from(document.querySelectorAll(".langblock"));

  function setLang(lang) {
    // toggle blocks
    blocks.forEach(el => {
      const show = el.getAttribute("data-lang") === lang;
      el.hidden = !show;
    });

    // toggle button state
    buttons.forEach(btn => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // set html lang attr for accessibility
    document.documentElement.setAttribute("lang", lang === "it" ? "it" : "en");

    // persist
    try { localStorage.setItem(KEY, lang); } catch(e) {}
  }

  // init
  let lang = "en";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "it" || saved === "en") lang = saved;
  } catch(e) {}

  setLang(lang);

  // handlers
  buttons.forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });
})();
