/* =============================================
   KARUNA'S 360° ACADEMY — MAIN SCRIPT
   ============================================= */


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
  if (!menu) return;
  menu.classList.toggle('open');
  const isOpen = menu.classList.contains('open');
  const toggleBtn = document.getElementById('hamburgerBtn') || document.querySelector('.hamburger');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

// ===== PAGE METADATA CONFIGURATION =====
const PAGE_METADATA = {
  home: {
    title: "Karuna's 360° Academy | Holistic School Coaching in Tragad, Ahmedabad",
    description: "Discover Karuna's 360° Academy in Tragad, Ahmedabad. We offer holistic coaching for Std 1 to 12 across CBSE, ICSE, GSEB, and Cambridge with proven academic results.",
    canonicalUrl: "https://www.karunas360academy.com/",
    ogUrl: "https://www.karunas360academy.com/",
    ogType: "website",
    image: "https://www.karunas360academy.com/images/Logo.webp"
  },
  about: {
    title: "About Us | Karuna's 360° Academy Tragad",
    description: "Learn about Karuna's 360° Academy in Tragad, Ahmedabad—our mission, dedicated educators, and commitment to nurturing every child's academic and personal growth.",
    canonicalUrl: "https://www.karunas360academy.com/",
    ogUrl: "https://www.karunas360academy.com/#about",
    ogType: "website",
    image: "https://www.karunas360academy.com/images/Logo.webp"
  },
  academics: {
    title: "Academic Programs (Std 1–12) | Karuna's 360° Academy",
    description: "Explore academic coaching programs for Std 1 to 12 at Karuna's 360° Academy, covering CBSE, ICSE, GSEB, and Cambridge curricula with tailored personal attention.",
    canonicalUrl: "https://www.karunas360academy.com/",
    ogUrl: "https://www.karunas360academy.com/#academics",
    ogType: "website",
    image: "https://www.karunas360academy.com/images/Logo.webp"
  },
  learning: {
    title: "360° Learning Model & Skill Programs | Karuna's 360° Academy",
    description: "Discover the 360° Learning Model at Karuna's Academy—combining core academics with English speaking, Vedic Maths, Phonics, and emotional wellbeing counselling.",
    canonicalUrl: "https://www.karunas360academy.com/",
    ogUrl: "https://www.karunas360academy.com/#learning",
    ogType: "website",
    image: "https://www.karunas360academy.com/images/Logo.webp"
  },
  admissions: {
    title: "Admissions 2025–26 | Karuna's 360° Academy Ahmedabad",
    description: "Apply for admissions 2025–26 at Karuna's 360° Academy in Tragad. Secure your child's seat for comprehensive academic coaching and skill development programs.",
    canonicalUrl: "https://www.karunas360academy.com/",
    ogUrl: "https://www.karunas360academy.com/#admissions",
    ogType: "website",
    image: "https://www.karunas360academy.com/images/Logo.webp"
  },
  gallery: {
    title: "Photo Gallery | Student Life at Karuna's 360° Academy",
    description: "View photos from Karuna's 360° Academy showcasing academic sessions, student activities, the Quizathon competition, workshops, and memorable milestones.",
    canonicalUrl: "https://www.karunas360academy.com/",
    ogUrl: "https://www.karunas360academy.com/#gallery",
    ogType: "website",
    image: "https://www.karunas360academy.com/images/Logo.webp"
  },
  contact: {
    title: "Contact Us | Karuna's 360° Academy Tragad, Ahmedabad",
    description: "Get in touch with Karuna's 360° Academy in Tragad, Ahmedabad. Find campus locations, phone numbers, email, Google Maps directions, and our contact form.",
    canonicalUrl: "https://www.karunas360academy.com/",
    ogUrl: "https://www.karunas360academy.com/#contact",
    ogType: "website",
    image: "https://www.karunas360academy.com/images/Logo.webp"
  }
};

function setMetaTag(selector, attributeName, attributeValue, contentValue) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', contentValue);
}

function updatePageMetadata(pageId) {
  const meta = PAGE_METADATA[pageId] || PAGE_METADATA.home;

  // 1. Document Title
  document.title = meta.title;

  // 2. Meta Description
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);

  // 3. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonicalUrl);

  // 4. Open Graph Metadata
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.ogUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.image);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', "Karuna's 360° Academy");

  // 5. Twitter/X Metadata
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.image);
}

// Track active page ID to prevent redundant transitions
let activePageId = 'home';

// ===== PAGE NAVIGATION =====
function showPage(pageId, updateUrl = true) {
  if (!pageId || !PAGE_METADATA[pageId]) {
    pageId = 'home';
  }

  activePageId = pageId;

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show requested page
  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update dynamic metadata for current page view
    updatePageMetadata(pageId);

    // Sync URL in browser history
    if (updateUrl && window.history && window.history.pushState) {
      const targetHash = pageId === 'home' ? '' : '#' + pageId;
      const targetUrl = targetHash || window.location.pathname.replace(/\/index\.html$/i, '/');
      if (window.location.hash !== (pageId === 'home' ? '' : '#' + pageId)) {
        window.history.pushState({ pageId }, '', targetUrl);
      }
    }

    // Trigger reveal for new page
    setTimeout(() => {
      triggerReveal();
      if (pageId === 'home') {
        animateCounters();
        if (typeof updateSliderLayout === 'function') updateSliderLayout();
        if (typeof checkAndResumeAutoSlide === 'function') checkAndResumeAutoSlide();
      } else {
        if (typeof stopAutoSlide === 'function') stopAutoSlide();
      }
    }, 100);
  }
}

// ===== SPA ROUTE INITIALISATION & LISTENERS =====
function getPageFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const paramPage = params.get('page') || params.get('p');
    if (paramPage && PAGE_METADATA[paramPage.toLowerCase()]) {
      return paramPage.toLowerCase();
    }
  } catch (e) {}

  const rawHash = (window.location.hash || '').replace(/^#\/?(page-)?/i, '').toLowerCase();
  if (rawHash && PAGE_METADATA[rawHash]) {
    return rawHash;
  }

  return 'home';
}

function handleRoute() {
  const initialPage = getPageFromUrl();
  showPage(initialPage, false);
}

window.addEventListener('popstate', (e) => {
  const pageId = (e.state && e.state.pageId) ? e.state.pageId : getPageFromUrl();
  if (pageId !== activePageId) {
    showPage(pageId, false);
  }
});

window.addEventListener('hashchange', () => {
  const pageId = getPageFromUrl();
  if (pageId !== activePageId) {
    showPage(pageId, false);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleRoute);
} else {
  handleRoute();
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
let autoSlideTimer = null;
let isManuallyPaused = false;
let isHovered = false;
let isFocused = false;

// Accessibility: detect and respect prefers-reduced-motion
const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
let prefersReducedMotion = reducedMotionMedia.matches;
if (prefersReducedMotion) {
  isManuallyPaused = true;
}

function handleReducedMotionChange(e) {
  prefersReducedMotion = e.matches;
  if (prefersReducedMotion) {
    isManuallyPaused = true;
    stopAutoSlide();
    updateToggleButton();
  } else {
    isManuallyPaused = false;
    updateToggleButton();
    checkAndResumeAutoSlide();
  }
}

if (typeof reducedMotionMedia.addEventListener === 'function') {
  reducedMotionMedia.addEventListener('change', handleReducedMotionChange);
} else if (typeof reducedMotionMedia.addListener === 'function') {
  reducedMotionMedia.addListener(handleReducedMotionChange);
}

function canAutoSlide() {
  if (slideCount <= 0) return false;
  if (isManuallyPaused) return false;
  if (isHovered) return false;
  if (isFocused) return false;
  if (prefersReducedMotion) return false;
  if (document.hidden) return false;
  const homePage = document.getElementById('page-home');
  if (homePage && !homePage.classList.contains('active')) return false;
  return true;
}

function updateLiveRegion(isPaused) {
  const track = document.getElementById('testiTrack');
  if (track) {
    track.setAttribute('aria-live', isPaused ? 'polite' : 'off');
  }
}

function updateToggleButton() {
  const btn = document.getElementById('testiToggleBtn');
  if (!btn) return;

  const isPaused = isManuallyPaused || prefersReducedMotion;
  const pauseIcon = btn.querySelector('.icon-pause');
  const playIcon = btn.querySelector('.icon-play');
  const srText = btn.querySelector('.sr-only');

  if (isPaused) {
    btn.setAttribute('aria-label', 'Play reviews carousel');
    btn.setAttribute('title', 'Play reviews carousel');
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('paused');
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (playIcon) playIcon.style.display = 'block';
    if (srText) srText.textContent = 'Play reviews carousel';
  } else {
    btn.setAttribute('aria-label', 'Pause reviews carousel');
    btn.setAttribute('title', 'Pause reviews carousel');
    btn.setAttribute('aria-pressed', 'false');
    btn.classList.remove('paused');
    if (pauseIcon) pauseIcon.style.display = 'block';
    if (playIcon) playIcon.style.display = 'none';
    if (srText) srText.textContent = 'Pause reviews carousel';
  }
}

function toggleAutoSlide() {
  if (isManuallyPaused) {
    isManuallyPaused = false;
    updateToggleButton();
    checkAndResumeAutoSlide();
  } else {
    isManuallyPaused = true;
    updateToggleButton();
    stopAutoSlide();
  }
}

function prevSlide() {
  const target = currentSlide <= 0 ? slideCount : currentSlide - 1;
  goToSlide(target);
  resetAutoSlideTimerIfAllowed();
}

function nextSlide() {
  const target = currentSlide >= slideCount ? 0 : currentSlide + 1;
  goToSlide(target);
  resetAutoSlideTimerIfAllowed();
}

function startAutoSlide() {
  stopAutoSlide();
  updateLiveRegion(false);
  if (!canAutoSlide()) return;
  autoSlideTimer = setInterval(() => {
    if (!canAutoSlide()) {
      stopAutoSlide();
      return;
    }
    currentSlide = currentSlide >= slideCount ? 0 : currentSlide + 1;
    goToSlide(currentSlide);
  }, 4000);
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
  updateLiveRegion(true);
}

function checkAndResumeAutoSlide() {
  if (canAutoSlide()) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }
}

function resetAutoSlideTimerIfAllowed() {
  if (canAutoSlide()) {
    startAutoSlide();
  }
}

function getVisibleCardCount() {
  const track = document.getElementById('testiTrack');
  if (!track) return 1;
  const cards = track.querySelectorAll('.testi-card');
  if (!cards.length) return 1;
  const slider = track.parentElement;
  const sliderWidth = slider ? slider.clientWidth : 0;
  if (!sliderWidth) return 1;

  const cardWidth = cards[0].offsetWidth;
  const trackStyle = window.getComputedStyle(track);
  const gap = parseFloat(trackStyle.gap || trackStyle.columnGap) || 0;

  if (cardWidth <= 0) return 1;
  const visible = Math.round((sliderWidth + gap) / (cardWidth + gap));
  return Math.max(1, Math.min(cards.length, visible));
}

function updateDots() {
  const track = document.getElementById('testiTrack');
  const dotsContainer = document.getElementById('testiDots');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.testi-card');
  const numDots = slideCount > 0 ? slideCount + 1 : (cards.length > 1 ? 1 : 0);

  if (dotsContainer.children.length !== numDots) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === currentSlide ? ' active' : '');
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Go to review slide ${i + 1}`);
      dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
      dot.onclick = () => {
        goToSlide(i);
        resetAutoSlideTimerIfAllowed();
      };
      dot.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToSlide(i);
          resetAutoSlideTimerIfAllowed();
        }
      };
      dotsContainer.appendChild(dot);
    }
  } else {
    Array.from(dotsContainer.children).forEach((d, i) => {
      const isActive = i === currentSlide;
      d.classList.toggle('active', isActive);
      d.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }
}

function updateSliderLayout() {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.testi-card');
  if (!cards.length) return;

  const visibleCards = getVisibleCardCount();
  slideCount = Math.max(0, cards.length - visibleCards);
  currentSlide = Math.max(0, Math.min(currentSlide, slideCount));

  updateDots();
  goToSlide(currentSlide);
  checkAndResumeAutoSlide();
}

function initSlider() {
  const track = document.getElementById('testiTrack');
  const dotsContainer = document.getElementById('testiDots');
  if (!track || !dotsContainer) return;

  updateSliderLayout();
  updateToggleButton();
  checkAndResumeAutoSlide();

  const toggleBtn = document.getElementById('testiToggleBtn');
  if (toggleBtn && !toggleBtn.dataset.toggleInit) {
    toggleBtn.dataset.toggleInit = 'true';
    toggleBtn.addEventListener('click', toggleAutoSlide);
  }

  const prevBtn = document.getElementById('testiPrevBtn');
  if (prevBtn && !prevBtn.dataset.navInit) {
    prevBtn.dataset.navInit = 'true';
    prevBtn.addEventListener('click', prevSlide);
  }

  const nextBtn = document.getElementById('testiNextBtn');
  if (nextBtn && !nextBtn.dataset.navInit) {
    nextBtn.dataset.navInit = 'true';
    nextBtn.addEventListener('click', nextSlide);
  }

  const slider = track.parentElement;
  if (slider && !slider.dataset.sliderInit) {
    slider.dataset.sliderInit = 'true';

    // Pause on mouse hover
    slider.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoSlide();
    });
    slider.addEventListener('mouseleave', () => {
      isHovered = false;
      checkAndResumeAutoSlide();
    });

    // Pause on keyboard focus
    slider.addEventListener('focusin', () => {
      isFocused = true;
      stopAutoSlide();
    });
    slider.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!slider.contains(document.activeElement)) {
          isFocused = false;
          checkAndResumeAutoSlide();
        }
      }, 0);
    });

    // Touch events
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      stopAutoSlide();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
      checkAndResumeAutoSlide();
    }, { passive: true });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        updateSliderLayout();
      });
      ro.observe(slider);
    }
  }
}

function goToSlide(index) {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.testi-card');
  if (!cards.length) return;

  const slider = track.parentElement;
  const sliderWidth = slider ? slider.clientWidth : 0;
  const totalTrackWidth = track.scrollWidth;
  const maxTranslate = Math.max(0, totalTrackWidth - sliderWidth);

  currentSlide = Math.max(0, Math.min(index, slideCount));

  let targetTranslate = 0;
  if (currentSlide === slideCount) {
    targetTranslate = maxTranslate;
  } else if (cards[currentSlide]) {
    targetTranslate = Math.min(cards[currentSlide].offsetLeft - cards[0].offsetLeft, maxTranslate);
  }

  track.style.transform = `translateX(-${targetTranslate}px)`;

  const dots = document.querySelectorAll('.testi-dot');
  dots.forEach((d, i) => {
    const isActive = i === currentSlide;
    d.classList.toggle('active', isActive);
    d.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

// Background / Visibility lifecycle
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoSlide();
  } else {
    checkAndResumeAutoSlide();
  }
});

window.addEventListener('blur', () => {
  stopAutoSlide();
});

window.addEventListener('focus', () => {
  checkAndResumeAutoSlide();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSlider);
} else {
  initSlider();
}
window.addEventListener('resize', updateSliderLayout);
window.addEventListener('orientationchange', updateSliderLayout);

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

let toastTimer;

// ===== MOBILE NUMBER VALIDATION =====
function validateMobileNumber(value) {
  if (!value || typeof value !== 'string') {
    return { valid: false, message: 'Please enter a valid mobile number.' };
  }
  
  const trimmed = value.trim();
  if (!trimmed) {
    return { valid: false, message: 'Please enter a valid mobile number.' };
  }

  // Reject letters or invalid special characters (allow only digits, +, spaces, hyphens, parentheses, dots)
  if (/[a-zA-Z]/.test(trimmed)) {
    return { valid: false, message: 'Mobile number cannot contain letters.' };
  }
  if (!/^[\d\s+\-().]+$/.test(trimmed)) {
    return { valid: false, message: 'Mobile number contains invalid characters.' };
  }

  // Normalise by stripping permitted formatting characters: spaces, hyphens, parentheses, dots
  const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

  // Case 1: Prefixed with +91
  if (cleaned.startsWith('+91')) {
    const digits = cleaned.slice(3);
    if (!/^\d{10}$/.test(digits)) {
      return { valid: false, message: 'Indian mobile number must contain exactly 10 digits after +91.' };
    }
    if (!/^[6-9]/.test(digits)) {
      return { valid: false, message: 'Indian mobile number must start with 6, 7, 8, or 9.' };
    }
    return { valid: true, normalized: '+91' + digits };
  }

  // Case 2: Prefixed with 91 (12 digits total)
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    const digits = cleaned.slice(2);
    if (!/^[6-9]/.test(digits)) {
      return { valid: false, message: 'Indian mobile number must start with 6, 7, 8, or 9.' };
    }
    return { valid: true, normalized: '+91' + digits };
  }

  // Case 3: Prefixed with leading 0 (11 digits total)
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    const digits = cleaned.slice(1);
    if (!/^[6-9]/.test(digits)) {
      return { valid: false, message: 'Indian mobile number must start with 6, 7, 8, or 9.' };
    }
    return { valid: true, normalized: digits };
  }

  // Case 4: Standard 10 digits (without country code)
  if (/^\d{10}$/.test(cleaned)) {
    if (!/^[6-9]/.test(cleaned)) {
      return { valid: false, message: 'Indian mobile number must start with 6, 7, 8, or 9.' };
    }
    return { valid: true, normalized: cleaned };
  }

  // Case 5: International number with other country code (+)
  if (cleaned.startsWith('+')) {
    if (/^\+[1-9]\d{6,14}$/.test(cleaned)) {
      return { valid: true, normalized: cleaned };
    }
    return { valid: false, message: 'Please enter a valid international mobile number with country code (e.g. +1... or +44...).' };
  }

  // General length feedback for purely numeric inputs
  if (/^\d+$/.test(cleaned)) {
    if (cleaned.length < 10) {
      return { valid: false, message: 'Mobile number must contain at least 10 digits.' };
    }
    return { valid: false, message: 'Indian mobile number must contain exactly 10 digits and start with 6, 7, 8, or 9.' };
  }

  return { valid: false, message: 'Please enter a valid 10-digit mobile number.' };
}

async function handleFormSubmission(event, formId) {
  event.preventDefault();
  const form = document.getElementById(formId);
  
  // Validate mobile number before proceeding
  const phoneInput = form.querySelector('input[name="mobile"], input[name="phone"], input[type="tel"]');
  if (phoneInput) {
    const validation = validateMobileNumber(phoneInput.value);
    if (!validation.valid) {
      if (typeof phoneInput.setCustomValidity === 'function') {
        phoneInput.setCustomValidity(validation.message);
        phoneInput.reportValidity();
      }
      
      let errorEl = form.querySelector('.phone-error-msg');
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'phone-error-msg';
        errorEl.style.color = '#d93025';
        errorEl.style.fontSize = '0.85rem';
        errorEl.style.marginTop = '6px';
        errorEl.style.fontWeight = '500';
        phoneInput.parentElement.appendChild(errorEl);
      }
      errorEl.textContent = validation.message;
      phoneInput.style.borderColor = '#d93025';

      showFormError(validation.message);
      phoneInput.focus();
      return;
    } else {
      phoneInput.setCustomValidity('');
      phoneInput.style.borderColor = '';
      const errorEl = form.querySelector('.phone-error-msg');
      if (errorEl) errorEl.textContent = '';
      if (validation.normalized) {
        phoneInput.value = validation.normalized;
      }
    }
  }

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
      let errorMessage = 'Failed to submit enquiry. Please try again.';
      try {
        const data = await response.json();
        if (data && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors.map(err => err.message || err.field).filter(Boolean).join(', ');
        } else if (data && data.error) {
          errorMessage = data.error;
        }
      } catch (_) {
        // Response was not JSON
      }
      showFormError(errorMessage || 'Submission failed. Please check your details and try again.');
    }
  } catch (error) {
    console.error("Submission Error:", error);
    showFormError('Network error: Unable to submit. Please check your connection and try again.');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  if (message) toast.innerText = message;
  if (isError) {
    toast.classList.add('error');
    toast.style.background = '#d93025';
  } else {
    toast.classList.remove('error');
    toast.style.background = '';
  }
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    toast.style.background = '';
  }, 4000);
}

function showFormSuccess(message) {
  showToast(message, false);
}

function showFormError(message) {
  showToast(message, true);
}

// ===== SMOOTH LINK HANDLING =====
let initialPageLoaded = false;
function initPageAnimations() {
  if (initialPageLoaded) return;
  initialPageLoaded = true;
  triggerReveal();
  animateCounters();
}

document.addEventListener('DOMContentLoaded', () => {
  // Clear mobile number validation errors when user types
  document.querySelectorAll('input[name="mobile"], input[name="phone"], input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
      input.setCustomValidity('');
      input.style.borderColor = '';
      const form = input.closest('form');
      if (form) {
        const errorEl = form.querySelector('.phone-error-msg');
        if (errorEl) errorEl.textContent = '';
      }
    });
  });

  // Handle nav links with onclick already
  // Trigger initial reveal and stats counters
  initPageAnimations();

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

if (document.readyState !== 'loading') {
  initPageAnimations();
}

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

// ===== GALLERY LIGHTBOX =====
function initLightbox() {
  if (document.getElementById('lightbox')) return;
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image gallery viewer');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.appendChild(lightbox);

  const lightboxImg = document.createElement('img');
  lightbox.appendChild(lightboxImg);

  const lightboxCaption = document.createElement('p');
  lightboxCaption.className = 'lightbox-caption';
  lightboxCaption.id = 'lightboxCaption';
  lightbox.appendChild(lightboxCaption);

  lightbox.setAttribute('aria-labelledby', 'lightboxCaption');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close image viewer');
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn);

  let lastFocusedTrigger = null;

  function openLightbox(triggerEl) {
    const img = triggerEl.querySelector('.gal-photo');
    if (!img) return;

    lastFocusedTrigger = triggerEl;
    const captionText = triggerEl.querySelector('.gal-overlay p')?.textContent || img.alt || '';
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = captionText;
    lightboxCaption.textContent = captionText;

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Move focus to close button inside dialog
    closeBtn.focus();

    // Attach keyboard listener only while open
    document.addEventListener('keydown', handleLightboxKeydown);
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('active')) return;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Remove keyboard listener
    document.removeEventListener('keydown', handleLightboxKeydown);

    // Return focus to triggering thumbnail
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
  }

  function handleLightboxKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = lightbox.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl || !lightbox.contains(document.activeElement)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl || !lightbox.contains(document.activeElement)) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target !== lightboxImg && e.target !== lightboxCaption) {
      closeLightbox();
    }
  });

  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(item);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  initLightbox();
}
