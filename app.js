const mainPanel = document.querySelector(".main-panel");

const bindPanelLinks = () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });
};

const bindPublicationToggles = () => {
  const toggles = document.querySelectorAll(".pub-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const container = toggle.closest(".pub-item");
      if (!container) {
        return;
      }

      const targetSelector = toggle.getAttribute("data-target");
      if (!targetSelector) {
        return;
      }

      const panel = container.querySelector(targetSelector);
      if (!panel) {
        return;
      }

      const isHidden = panel.hasAttribute("hidden");
      if (isHidden) {
        panel.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        panel.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
};

bindPanelLinks();
bindPublicationToggles();
