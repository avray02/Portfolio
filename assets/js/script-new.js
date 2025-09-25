// ===== PORTFOLIO MANAGER CLASS =====
class PortfolioManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupTypedEffect();
    this.setupScrollReveal();
    this.setupTilt();
    this.loadSkills();
    this.loadProjects();
    this.setupContactForm();
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');
    
    if (menuBtn && navbar) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('fa-times');
        navbar.classList.toggle('nav-toggle');
      });
    }

    // Scroll events
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
        if (menuBtn && navbar) {
          menuBtn.classList.remove('fa-times');
          navbar.classList.remove('nav-toggle');
        }
      });
    });

    // Tab visibility change
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });
  }

  // ===== SCROLL HANDLING =====
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const menuBtn = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scroll-top');

    // Close mobile menu on scroll
    if (menuBtn && navbar) {
      menuBtn.classList.remove('fa-times');
      navbar.classList.remove('nav-toggle');
    }

    // Show/hide scroll to top button
    if (scrollTopBtn) {
      if (scrollTop > 300) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    }

    // Update active navigation link
    this.updateActiveNavLink();
  }

  // ===== ACTIVE NAVIGATION =====
  updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== TYPED EFFECT =====
  setupTypedEffect() {
    const typedElement = document.querySelector('.typing-text');
    if (typedElement && typeof Typed !== 'undefined') {
      new Typed('.typing-text', {
        strings: [
          'control theory',
          'reinforcement learning', 
          'computer vision',
          'machine learning',
          'robotics',
          'deep learning'
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
      });
    }
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  setupScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        reset: false
      });

      // Animate sections
      sr.reveal('.heading', { delay: 100 });
      sr.reveal('.about .content', { delay: 200, origin: 'right' });
      sr.reveal('.about .image', { delay: 200, origin: 'left' });
      sr.reveal('.skills .bar', { delay: 100, interval: 100 });
      sr.reveal('.education .box', { delay: 100, interval: 200 });
      sr.reveal('.timeline .container', { delay: 100, interval: 200 });
      sr.reveal('.contact .contact-item', { delay: 100, interval: 100 });
      sr.reveal('.contact-form-container', { delay: 300 });
    }
  }

  // ===== TILT EFFECT =====
  setupTilt() {
    if (typeof VanillaTilt !== 'undefined') {
      const tiltElements = document.querySelectorAll('.tilt');
      tiltElements.forEach(element => {
        VanillaTilt.init(element, {
          max: 15,
          speed: 400,
          glare: true,
          'max-glare': 0.2,
        });
      });
    }
  }

  // ===== SKILLS LOADING =====
  async loadSkills() {
    try {
      const response = await fetch('skills.json');
      if (!response.ok) throw new Error('Failed to load skills');
      
      const skills = await response.json();
      this.displaySkills(skills);
    } catch (error) {
      console.error('Error loading skills:', error);
      this.displaySkillsError();
    }
  }

  displaySkills(skills) {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;

    const skillsHTML = skills.map(skill => `
      <div class="bar" data-skill="${skill.name}">
        <div class="info">
          <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
          <span>${skill.name}</span>
        </div>
      </div>
    `).join('');

    skillsContainer.innerHTML = skillsHTML;
  }

  displaySkillsError() {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;

    skillsContainer.innerHTML = `
      <div class="error-message">
        <p>Unable to load skills at the moment. Please try again later.</p>
      </div>
    `;
  }

  // ===== PROJECTS LOADING =====
  async loadProjects() {
    try {
      const response = await fetch('./projects/projects.json');
      if (!response.ok) throw new Error('Failed to load projects');
      
      const projects = await response.json();
      this.displayProjects(projects.slice(0, 3)); // Show only first 3 projects
    } catch (error) {
      console.error('Error loading projects:', error);
      this.displayProjectsError();
    }
  }

  displayProjects(projects) {
    const projectsContainer = document.querySelector('.work .box-container');
    if (!projectsContainer) return;

    const projectsHTML = projects.map(project => `
      <div class="project-box">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            ${project.github ? `<a href="${project.github}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>` : ''}
            ${project.demo ? `<a href="${project.demo}" target="_blank" aria-label="Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;
  }

  displayProjectsError() {
    const projectsContainer = document.querySelector('.work .box-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = `
      <div class="error-message">
        <p>Unable to load projects at the moment. Please try again later.</p>
      </div>
    `;
  }

  // ===== CONTACT FORM =====
  setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactSubmit(contactForm);
    });
  }

  async handleContactSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      // Create mailto link with form data
      const mailtoLink = this.createMailtoLink(data);
      window.location.href = mailtoLink;

      // Show success message
      this.showNotification('Message prepared! Your email client should open now.', 'success');
      form.reset();

    } catch (error) {
      console.error('Error handling contact form:', error);
      this.showNotification('Something went wrong. Please try again.', 'error');
    } finally {
      // Reset button
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  }

  createMailtoLink(data) {
    const to = 'vray.av@orange.fr';
    const subject = encodeURIComponent(data.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }

  // ===== NOTIFICATIONS =====
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
    `;

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);

    document.body.appendChild(notification);
  }

  // ===== VISIBILITY CHANGE =====
  handleVisibilityChange() {
    const favicon = document.getElementById('favicon');
    
    if (document.visibilityState === 'visible') {
      document.title = 'Portfolio | A.VRAY';
      if (favicon) favicon.href = 'assets/images/logo/white.png';
    } else {
      document.title = 'Come Back To Portfolio';
      if (favicon) favicon.href = 'assets/images/logo/white.png';
    }
  }

  // ===== UTILITY METHODS =====
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification-close {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    margin-left: auto;
  }
  
  .notification-close:hover {
    opacity: 0.8;
  }
  
  .error-message {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
  }
`;
document.head.appendChild(style);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioManager();
});

// ===== SERVICE WORKER REGISTRATION (for PWA) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}