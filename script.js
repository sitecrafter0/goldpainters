/* ========================================
   GOLDPAINTERS WEBSITE - MAIN JAVASCRIPT
   ======================================== */

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('[data-category]');
const contactForm = document.querySelector('form');
const modal = document.querySelector('.modal');

// ========================================
// NAVIGATION MENU TOGGLE
// =========================================
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      navLinks.classList.remove('show');
    }
  });
}

// ========================================
// ACTIVE PAGE HIGHLIGHTING
// =========================================
function setActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage.includes('index') && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActivePage();

// ========================================
// SCROLL TO TOP BUTTON
// =========================================
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// PORTFOLIO FILTER
// =========================================
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter portfolio items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'grid';
          setTimeout(() => {
            item.classList.add('fade-in');
          }, 10);
        } else {
          item.style.display = 'none';
          item.classList.remove('fade-in');
        }
      });
    });
  });

  // Set 'all' as active by default
  const allBtn = Array.from(filterBtns).find(btn => btn.getAttribute('data-filter') === 'all');
  if (allBtn) {
    allBtn.classList.add('active');
  }
}

// ========================================
// FORM SUBMISSION
// =========================================
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.fullname || !data.phone || !data.email || !data.service) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Email validation
    if (!isValidEmail(data.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Phone validation
    if (!isValidPhone(data.phone)) {
      showNotification('Please enter a valid phone number', 'error');
      return;
    }

    // Simulate form submission
    console.log('Form Data:', data);
    
    // Show success message
    showNotification('Thank you! We will contact you soon.', 'success');
    
    // Reset form
    contactForm.reset();

    // You can uncomment this to actually send the form via email service
    // sendFormViaPHP(data);
  });
}

// ========================================
// FORM VALIDATION HELPERS
// =========================================
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]{7,}$/;
  return re.test(phone);
}

// ========================================
// NOTIFICATIONS
// =========================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ========================================
// WHATSAPP LINK
// =========================================
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
  const phoneNumber = '0631492685'; // Replace with actual number
  whatsappBtn.href = `https://wa.me/${phoneNumber}?text=Hello%20Goldpainters%2C%20I%20am%20interested%20in%20your%20services.`;
  whatsappBtn.target = '_blank';
}

// ========================================
// MODAL FUNCTIONALITY
// =========================================
function openModal() {
  if (modal) {
    modal.classList.add('show');
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove('show');
  }
}

if (modal) {
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Open modal on page load (optional - uncomment if needed)
// setTimeout(() => {
//   openModal();
// }, 2000);

// ========================================
// SMOOTH SCROLL ENHANCEMENT
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ========================================
// IMAGE LAZY LOADING
// =========================================
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ========================================
// QUOTE BUTTON FUNCTIONALITY
// =========================================
const quoteButtons = document.querySelectorAll('[data-quote-btn]');
quoteButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const service = btn.getAttribute('data-quote-btn');
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
      const serviceSelect = contactForm.querySelector('select[name="service"]');
      if (serviceSelect) {
        serviceSelect.value = service;
      }
      // Scroll to contact form
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========================================
// INITIALIZATION
// =========================================
console.log('Goldpainters Website - All scripts loaded successfully');

// Export functions for external use
window.goldpainters = {
  openModal,
  closeModal,
  showNotification
};
