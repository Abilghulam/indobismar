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

// Gallery slide effect
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", function () {
  let items = document.querySelectorAll(".gallery-item");
  document.querySelector(".gallery-slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".gallery-item");
  document.querySelector(".gallery-slide").prepend(items[items.length - 1]); // here the length of items = 6
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

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
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

// Add click effect to CTA button
document.querySelector(".cta-button")?.addEventListener("click", function (e) {
  // Create ripple effect
  const ripple = document.createElement("span");
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

  this.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation CSS
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(rippleStyle);

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
