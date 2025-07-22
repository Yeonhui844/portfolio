//Activating Mobile Menu

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

//Toggling Menu by clicking in mobile menu links

const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");

  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// Changing Active Menu section while scrolling

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

// Scroll Reveal Settings

const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

sr.reveal(".home-title", {});
sr.reveal(".home-scroll", { delay: 200 });
sr.reveal(".home-img", { origin: "right", delay: 400 });

sr.reveal(".about-img", { delay: 500 });
sr.reveal(".about-subtitle", { delay: 300 });
sr.reveal(".about-profession", { delay: 400 });
sr.reveal(".about-text", { delay: 500 });
sr.reveal(".about-social-icon", { delay: 600, interval: 200 });

sr.reveal(".skills-subtitle", {});
sr.reveal(".skills-name", { distance: "20px", delay: 50, interval: 100 });
sr.reveal(".skills-img", { delay: 400 });

sr.reveal(".portfolio-img", { interval: 200 });

sr.reveal(".contact-subtitle", {});
sr.reveal(".contact-text", { interval: 200 });
sr.reveal(".contact-input", { delay: 400 });
sr.reveal(".contact-button", { delay: 600 });

const teamMembers = [
  { name: "Website redesign", role: "웹사이트리디자인" },
  { name: "App design", role: "앱디자인" },
  { name: "Branding design", role: "브랜딩디자인" },
  { name: "Detailed page", role: "상세페이지" },
  { name: "SNS Card news", role: "SNS카드뉴스" },
  { name: "Clone coding", role: "클론코딩" },
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (newIndex + cards.length) % cards.length;

  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;

    card.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden"
    );

    if (offset === 0) {
      card.classList.add("center");
    } else if (offset === 1) {
      card.classList.add("right-1");
    } else if (offset === 2) {
      card.classList.add("right-2");
    } else if (offset === cards.length - 1) {
      card.classList.add("left-1");
    } else if (offset === cards.length - 2) {
      card.classList.add("left-2");
    } else {
      card.classList.add("hidden");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  memberName.style.opacity = "0";
  memberRole.style.opacity = "0";

  setTimeout(() => {
    memberName.textContent = teamMembers[currentIndex].name;
    memberRole.textContent = teamMembers[currentIndex].role;
    memberName.style.opacity = "1";
    memberRole.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

leftArrow.addEventListener("click", () => {
  updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
  updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    updateCarousel(i);
  });
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    updateCarousel(i);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    updateCarousel(currentIndex - 1);
  } else if (e.key === "ArrowRight") {
    updateCarousel(currentIndex + 1);
  }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      updateCarousel(currentIndex + 1);
    } else {
      updateCarousel(currentIndex - 1);
    }
  }
}

updateCarousel(0);
