// ==========================================
// NAVIGATION
// ==========================================
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav__link');

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) header?.classList.add('scrolled');
  else header?.classList.remove('scrolled');
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute('id');

    const navLink = document.querySelector(`.nav__link[data-section="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navItems.forEach(item => item.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const offsetTop = target.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) backToTopBtn?.classList.add('visible');
  else backToTopBtn?.classList.remove('visible');
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// FORM VALIDATION
// ==========================================
const form = document.getElementById('contactForm');
const formFields = form?.querySelectorAll('input, textarea');

const patterns = {
  firstName: /^[a-zA-Z]{2,}$/,
  lastName: /^[a-zA-Z]{1,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+91[\-\s]?)?[6-9]\d{9}$/,
  message: /^.{10,}$/
};

const errorMessages = {
  firstName: 'Please enter a valid first name (minimum 2 letters)',
  lastName: 'Please enter a valid last name',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid Indian phone number',
  message: 'Message must be at least 10 characters long'
};

function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();
  const pattern = patterns[fieldName];
  const errorElement = field.parentElement.querySelector('.error');
  const fieldContainer = field.parentElement;

  if (!value) {
    fieldContainer.classList.add('invalid');
    errorElement.textContent = 'This field is required';
    return false;
  }

  if (pattern && !pattern.test(value)) {
    fieldContainer.classList.add('invalid');
    errorElement.textContent = errorMessages[fieldName];
    return false;
  }

  fieldContainer.classList.remove('invalid');
  errorElement.textContent = '';
  return true;
}

formFields?.forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.parentElement.classList.contains('invalid')) validateField(field);
  });
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;
  formFields.forEach(field => { if (!validateField(field)) isValid = false; });

  if (isValid) {
    const submitBtn = form.querySelector('.form__submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      alert('Message sent successfully! (Demo)');
      form.reset();
      formFields.forEach(field => {
        field.parentElement.classList.remove('invalid');
        field.parentElement.querySelector('.error').textContent = '';
      });
    }, 1200);
  } else {
    alert('Please fix the errors in the form');
  }
});

// ==========================================
// DYNAMIC FOOTER YEAR
// ==========================================
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
