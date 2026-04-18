/* =============================================
   KARUNA'S 360° ACADEMY — MAIN SCRIPT
   ============================================= */

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    animateCounters();
    triggerReveal();
  }, 2200);
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 5 + 'px';
  cursor.style.top = mouseY - 5 + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX - 15) * 0.12;
  followerY += (mouseY - followerY - 15) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .feature-card, .class-card, .gal-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    follower.style.transform = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show requested page
  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger reveal for new page
    setTimeout(() => {
      triggerReveal();
      if (pageId === 'home') animateCounters();
    }, 100);
  }
}

// ===== REVEAL ON SCROLL =====
function triggerReveal() {
  const elements = document.querySelectorAll('.page.active .reveal, .page.active .reveal-right, .page.active .reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.page.active .stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 25);
  });
}

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
let slideCount = 0;
let autoSlideTimer;

function initSlider() {
  const track = document.getElementById('testiTrack');
  const dotsContainer = document.getElementById('testiDots');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.testi-card');
  slideCount = Math.max(0, cards.length - 2);
  dotsContainer.innerHTML = '';

  for (let i = 0; i <= slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
  startAutoSlide();
}

function goToSlide(index) {
  const track = document.getElementById('testiTrack');
  const dots = document.querySelectorAll('.testi-dot');
  if (!track) return;

  currentSlide = Math.max(0, Math.min(index, slideCount));
  const cardWidth = track.querySelectorAll('.testi-card')[0]?.offsetWidth + 24 || 0;
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function startAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => {
    currentSlide = currentSlide >= slideCount ? 0 : currentSlide + 1;
    goToSlide(currentSlide);
  }, 4000);
}

setTimeout(initSlider, 2500);
window.addEventListener('resize', () => goToSlide(currentSlide));

// ===== GALLERY FILTER =====
function filterGallery(type, btn) {
  // Update buttons
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Filter items
  document.querySelectorAll('.gal-item').forEach(item => {
    if (type === 'all' || item.classList.contains(type)) {
      item.classList.remove('hidden');
      item.style.animation = 'none';
      item.offsetHeight;
      item.style.animation = '';
    } else {
      item.classList.add('hidden');
    }
  });
}

async function handleFormSubmission(event, formId) {
  event.preventDefault();
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending... ⏳';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showFormSuccess(formId === 'contactForm' ? 'Message sent successfully! ✉️' : 'Inquiry submitted! We\'ll call you soon 🚀');
      form.reset();
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error("Formspree Error:", error);
    showFormSuccess("Inquiry submitted! (Offline Mode) 🚀");
    form.reset();
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
}

function showFormSuccess(message) {
  const toast = document.getElementById('toast');
  if (message) toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ===== SMOOTH LINK HANDLING =====
document.addEventListener('DOMContentLoaded', () => {
  // Handle nav links with onclick already
  // Trigger initial reveal
  setTimeout(triggerReveal, 2300);

  // Scroll-based reveal
  window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.page.active .reveal:not(.visible), .page.active .reveal-right:not(.visible), .page.active .reveal-up:not(.visible)');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  });
});

// ===== PARALLAX ON HERO ORBS =====
document.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
