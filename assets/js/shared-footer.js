(function () {
  function buildFooterContent(page) {
    if (page === "index") {
      return [
        "<li>&copy; kamran890. All rights reserved.</li>",
        '<li>Original base design: <a href="http://html5up.net" target="_blank" rel="noopener">HTML5 UP</a></li>'
      ].join("");
    }

    return [
      "<li>&copy; kamran890. All rights reserved.</li>",
      '<li>Design: <a href="http://html5up.net">HTML5 UP</a></li>'
    ].join("");
  }

  function initializeSharedFooter() {
    const footerSlots = document.querySelectorAll("[data-shared-footer]");
    footerSlots.forEach((slot) => {
      const page = slot.getAttribute("data-shared-footer") || "index";
      slot.innerHTML = `<ul class="copyright">${buildFooterContent(page)}</ul>`;
    });
  }

  initializeSharedFooter();
})();
