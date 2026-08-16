const NAV_LINKS = {
  home: [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#our-pricing" },
    { label: "Blog", href: "#" },
  ],
  pricing: [
    { label: "Home", href: "index.html" },
    { label: "Pricing", href: "pricing.html" },
    { label: "Company", href: "#" },
    { label: "Resource", href: "#" },
    { label: "Blog", href: "#" },
  ],
};

const FOOTER_COLUMNS = [
  {
    title: "AJAYLA",
    items: [
      { icon: "ri-mail-fill", label: "info@ajayla.com" },
      { icon: "ri-phone-fill", label: "+1 (303) 549-1580" },
      { icon: "ri-phone-fill", label: "+1 (414) 394-7267" },
    ],
  },
  { title: "About", items: [{ label: "Home" }, { label: "Pricing" }, { label: "Company" }, { label: "Resource" }] },
  { title: "Features", items: [{ label: "Blog" }, { label: "Privacy Policy" }, { label: "Terms & Conditions" }] },
  { title: "Contact", items: [{ label: "Department" }, { label: "Media" }, { label: "Support" }] },
];

const SOCIAL_ICONS = ["ri-facebook-fill", "ri-twitter-fill", "ri-instagram-line", "ri-youtube-fill"];

const LOGO = "AJAYLA🚀";

function navMarkup(page, cta) {
  const links = (NAV_LINKS[page] || [])
    .map((link) => `<li class="link"><a href="${link.href}">${link.label}</a></li>`)
    .join("");
  return `
    <div class="nav__logo">${LOGO}</div>
    <ul class="nav__links">${links}</ul>
    <button class="btn">${cta}</button>`;
}

function footerMarkup() {
  const columns = FOOTER_COLUMNS.map((column) => {
    const items = column.items
      .map((item) => {
        const icon = item.icon ? `<span><i class="${item.icon}"></i></span> ` : "";
        return `<p>${icon}${item.label}</p>`;
      })
      .join("");
    return `<div class="footer__col"><h4>${column.title}</h4>${items}</div>`;
  }).join("");
  return `<div class="footer__grid">${columns}</div>`;
}

function footerBarMarkup(copyright) {
  const socials = SOCIAL_ICONS.map((icon) => `<span><i class="${icon}"></i></span>`).join("");
  return `<p>${copyright}</p><div class="socials">${socials}</div>`;
}

function renderNav() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  nav.innerHTML = navMarkup(nav.dataset.nav, nav.dataset.navCta || "Contact Us");
}

function renderFooter() {
  const footer = document.querySelector("[data-footer]");
  if (footer) footer.innerHTML = footerMarkup();

  const footerBar = document.querySelector("[data-footer-bar]");
  if (footerBar) footerBar.innerHTML = footerBarMarkup(footerBar.dataset.footerBar);
}

function initAccordion() {
  for (const box of document.getElementsByClassName("question__box")) {
    box.addEventListener("click", () => box.classList.toggle("active"));
  }
}

renderNav();
renderFooter();
initAccordion();
