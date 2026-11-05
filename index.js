const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const duration = 1100;
    const start = performance.now();

    function updateCount(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      counter.textContent = Math.round(target * eased).toLocaleString("es-MX");
      if (progress < 1) requestAnimationFrame(updateCount);
      else if (target === 24) counter.textContent = "24/7";
      else if (target === 1200) counter.textContent = "1,200+";
      else counter.textContent = `${target}+`;
    }

    requestAnimationFrame(updateCount);
    observer.unobserve(counter);
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((counter) => countObserver.observe(counter));
document.querySelector("#year").textContent = new Date().getFullYear();