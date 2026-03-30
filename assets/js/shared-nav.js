(function () {
  function getBasePrefix(page) {
    return page === "blog" ? "index.html" : "";
  }

  function desktopLink({ href, id, icon, label, active }) {
    const activeClass = active ? ' class="active"' : "";
    return `<li><a href="${href}" id="${id}"${activeClass}><span class="icon solid ${icon}"></span><span class="nav-label">${label}</span></a></li>`;
  }

  function mobileLink({ href, icon, label, active, mobileTarget }) {
    const activeClass = active ? ' class="is-active"' : "";
    const targetAttr = mobileTarget ? ` data-mobile-nav-link="${mobileTarget}"` : "";
    return `<a href="${href}"${targetAttr}${activeClass}><i class="icon solid ${icon}" aria-hidden="true"></i><span>${label}</span></a>`;
  }

  function buildDesktopNav(page) {
    const prefix = getBasePrefix(page);

    const links = [
      { href: `${prefix}#top`, id: "top-link", icon: "fa-compass", label: "Intro", active: page === "index" },
      { href: `${prefix}#portfolio`, id: "portfolio-link", icon: "fa-layer-group", label: "Portfolio", active: false },
      { href: "blog.html", id: "blog-link", icon: "fa-pen-nib", label: "Blog", active: page === "blog" },
      { href: `${prefix}#about`, id: "about-link", icon: "fa-id-badge", label: "About Me", active: false }
    ];

    return `<nav id="nav"><ul>${links.map(desktopLink).join("")}</ul></nav>`;
  }

  function buildMobileNav(page) {
    const prefix = getBasePrefix(page);

    const links = [
      { href: `${prefix}#top`, icon: "fa-compass", label: "Intro", active: page === "index", mobileTarget: page === "index" ? "top" : "" },
      { href: `${prefix}#portfolio`, icon: "fa-layer-group", label: "Work", active: false, mobileTarget: page === "index" ? "portfolio" : "" },
      { href: "blog.html", icon: "fa-pen-nib", label: "Blog", active: page === "blog", mobileTarget: "" },
      { href: `${prefix}#about`, icon: "fa-id-badge", label: "About", active: false, mobileTarget: page === "index" ? "about" : "" }
    ];

    return links.map(mobileLink).join("");
  }

  function initializeSharedNav() {
    const desktopSlots = document.querySelectorAll("[data-shared-desktop-nav]");
    desktopSlots.forEach((slot) => {
      const page = slot.getAttribute("data-shared-desktop-nav") || "index";
      slot.innerHTML = buildDesktopNav(page);
    });

    const mobileSlots = document.querySelectorAll("[data-shared-mobile-nav]");
    mobileSlots.forEach((slot) => {
      const page = slot.getAttribute("data-shared-mobile-nav") || "index";
      slot.innerHTML = buildMobileNav(page);
    });
  }

  initializeSharedNav();
})();
