const postList = document.getElementById("post-list");
const posts = Array.from(document.querySelectorAll(".post-intro"));

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
    { threshold: 0.2 }
  );

  posts.forEach((post) => observer.observe(post));
};

buildPostDirectory();
revealIntros();
