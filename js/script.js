// Mobile menu toggle
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

mobileMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Add navigation bar scroll effect
let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Scroll ke atas → tampilkan navbar
    navbar.style.top = "0";
  } else {
    // Scroll ke bawah → sembunyikan navbar
    navbar.style.top = "-100px";
  }

  prevScrollPos = currentScrollPos;
};

// Dropdown menu navigation bar
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const toggleLink = document.querySelector(".dropdown > .nav-link");
  const arrow = toggleLink.querySelector("svg");

  // pastikan hanya 1 fungsi toggle dan JS berjalan setelah DOM siap
  toggleLink.addEventListener("click", function (e) {
    e.preventDefault(); // hindari follow href
    dropdown.classList.toggle("open");
    arrow.classList.toggle("rotated");
  });

  // klik di luar -> tutup dropdown (berguna di mobile)
  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      arrow.classList.remove("rotated");
    }
  });

  // resize -> reset state saat pindah ke desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      dropdown.classList.remove("open");
      arrow.classList.remove("rotated");
    }
  });
});

// Toogle Text "Read More"
function toggleText() {
  let moreText = document.getElementById("moreText");
  let link = document.getElementById("readMoreLink");

  if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    link.textContent = " less";
  } else {
    moreText.style.display = "none";
    link.textContent = "... more";
  }
}

// Gallery Slider Infinite Loop
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".gallery-track");
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const prevBtn = document.querySelector(".gallery-btn.prev");
  const nextBtn = document.querySelector(".gallery-btn.next");

  const visibleItems = 4.1;
  const total = items.length;

  // Gandakan item 5x biar panjang
  track.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    items.forEach((item) => track.appendChild(item.cloneNode(true)));
  }

  const allItems = track.querySelectorAll(".gallery-item");
  let index = total * 2;
  let isAnimating = false;

  // posisi awal
  track.style.transform = `translateX(-${index * (100 / visibleItems)}%)`;

  function slideTo(newIndex) {
    isAnimating = true;
    track.style.transition = "transform 0.5s ease-in-out";
    index = newIndex;
    track.style.transform = `translateX(-${index * (100 / visibleItems)}%)`;
  }

  nextBtn.addEventListener("click", () => {
    if (isAnimating) return;
    slideTo(index + 1);
  });

  prevBtn.addEventListener("click", () => {
    if (isAnimating) return;
    slideTo(index - 1);
  });

  track.addEventListener("transitionend", () => {
    track.style.transition = "none";

    // kalau sudah terlalu kanan → lompat balik ke tengah
    if (index >= allItems.length - total) {
      index = total * 2;
      track.style.transform = `translateX(-${index * (100 / visibleItems)}%)`;
    }

    // kalau terlalu kiri → lompat balik ke tengah
    if (index <= total) {
      index = total * 2;
      track.style.transform = `translateX(-${index * (100 / visibleItems)}%)`;
    }

    requestAnimationFrame(() => {
      track.style.transition = "transform 0.5s ease-in-out";
      isAnimating = false;
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Modal retail store
const modal = document.getElementById("store-modal");
const modalStoreName = document.getElementById("modal-store-name");
const modalStoreAddress = document.getElementById("modal-address");
const modalInstagram = document.getElementById("modal-instagram");
const modalFacebook = document.getElementById("modal-facebook");
const modalMap = document.getElementById("modal-map");
const closeBtn = document.querySelector(".close-btn");

// Klik tombol view
document.querySelectorAll(".btn-see").forEach((btn) => {
  btn.addEventListener("click", function () {
    const storeName = this.dataset.store;
    const storeAddress = this.dataset.address;
    const storeInstagram = this.dataset.instagram;
    const storeFacebook = this.dataset.facebook;
    const storeMap = this.dataset.map;

    modalStoreName.textContent = storeName;
    modalStoreAddress.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${storeAddress}`;
    modalInstagram.href = storeInstagram;
    modalFacebook.href = storeFacebook;
    modalMap.src = storeMap;

    modal.style.display = "flex";
  });
});

// Tutup modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Klik luar modal untuk tutup
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${index * 0.1}s`;
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Atur elemen galeri agar animasinya bergantian kiri-kanan
document
  .querySelectorAll(".gallery-grid .store-card .gallery-slide .gallery-item")
  .forEach((el, idx) => {
    const directionClass = idx % 2 === 0 ? "fade-in-left" : "fade-in-right";
    el.classList.add(directionClass);
    observer.observe(el);
  });

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add interactive hover effects to product and service cards
document.querySelectorAll(".product-card, .service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Counter animation for statistics
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + (target >= 1000 ? "+" : "");
  }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll(".stat-number");
      numbers.forEach((num) => {
        const target = parseInt(
          num.textContent.replace("+", "").replace("/7", "")
        );
        if (num.textContent.includes("/7")) {
          num.textContent = "24/7";
        } else {
          animateCounter(num, target);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
});

document
  .querySelector(".about-stats")
  ?.let((stats) => statsObserver.observe(stats));

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      if (text.charAt(i) === "<") {
        let tag = "";
        while (text.charAt(i) !== ">" && i < text.length) {
          tag += text.charAt(i);
          i++;
        }
        tag += text.charAt(i);
        element.innerHTML += tag;
      } else {
        element.innerHTML += text.charAt(i);
      }
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect after page load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150);
    }, 1000);
  }
});

// Add floating animation to product icons
document.querySelectorAll(".product-icon").forEach((icon, index) => {
  icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
});

// CSS for floating animation
const floatStyle = document.createElement("style");
floatStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
document.head.appendChild(floatStyle);

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add interactive background particles (optional enhancement)
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: #dc2626;
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.4;
            `;

  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";

  document.body.appendChild(particle);

  const animation = particle.animate(
    [
      { transform: "translateY(0px)", opacity: 0.7 },
      {
        transform: `translateY(-${window.innerHeight + 100}px)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 3000 + 2000,
      easing: "linear",
    }
  );

  animation.onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

console.log("PT. Indo Bismar website loaded successfully!");
