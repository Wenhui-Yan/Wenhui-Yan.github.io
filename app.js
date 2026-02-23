const postList = document.getElementById("post-list");
const posts = Array.from(document.querySelectorAll(".post-intro"));
const mainPanel = document.querySelector(".main-panel");

const buildPostDirectory = () => {
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const title = post.dataset.title || post.querySelector("h2")?.textContent;
    const date = post.dataset.date || "";

    const link = document.createElement("a");
    link.href = `#${post.id}`;

    const dateSpan = document.createElement("span");
    dateSpan.className = "toc-date";
    dateSpan.textContent = date;

    const dotsSpan = document.createElement("span");
    dotsSpan.className = "toc-dots";

    const titleSpan = document.createElement("span");
    titleSpan.className = "toc-text";
    titleSpan.textContent = title;

    link.appendChild(dateSpan);
    link.appendChild(dotsSpan);
    link.appendChild(titleSpan);

    const item = document.createElement("li");
    item.appendChild(link);

    fragment.appendChild(item);
  });

  postList.appendChild(fragment);
};

const revealIntros = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2, root: mainPanel || null }
  );

  posts.forEach((post) => observer.observe(post));
};

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

const bindPublicationAbstracts = () => {
  const toggles = document.querySelectorAll(".pub-abstract-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const container = toggle.closest(".pub-item");
      if (!container) {
        return;
      }

      const abstract = container.querySelector(".pub-abstract");
      if (!abstract) {
        return;
      }

      const isHidden = abstract.hasAttribute("hidden");
      if (isHidden) {
        abstract.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        abstract.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
};

buildPostDirectory();
revealIntros();
bindPanelLinks();
bindPublicationAbstracts();
