const postList = document.getElementById("post-list");
const posts = Array.from(document.querySelectorAll(".post-intro"));

const buildPostDirectory = () => {
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const title = post.dataset.title || post.querySelector("h2")?.textContent;
    const date = post.dataset.date || "";

    const link = document.createElement("a");
    link.href = `#${post.id}`;
    link.textContent = title;

    const meta = document.createElement("div");
    meta.className = "toc-meta";
    meta.textContent = date;

    const item = document.createElement("li");
    item.appendChild(link);
    item.appendChild(meta);

    fragment.appendChild(item);
  });

  postList.appendChild(fragment);
};

const revealPosts = () => {
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

  const fullPosts = document.querySelectorAll(".post");
  fullPosts.forEach((post) => observer.observe(post));
};

buildPostDirectory();
revealPosts();
