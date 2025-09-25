// Theme Manager for Portfolio
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeToggle();
    this.setupSystemThemeListener();
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getStoredTheme() {
    return localStorage.getItem('portfolio-theme');
  }

  storeTheme(theme) {
    localStorage.setItem('portfolio-theme', theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.updateThemeToggle();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Add styles
    themeToggle.style.cssText = `
      position: fixed;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      background: var(--primary-color);
      color: var(--white-color);
      border: none;
      border-radius: 50%;
      width: 5rem;
      height: 5rem;
      font-size: 2rem;
      cursor: pointer;
      transition: var(--transition);
      z-index: 999;
      box-shadow: var(--shadow-medium);
    `;

    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    document.body.appendChild(themeToggle);
  }

  updateThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const icon = toggle.querySelector('i');
      icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }

  setupSystemThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Advanced Animations Manager
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
    this.setupHoverAnimations();
    this.setupLoadingAnimations();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    // Observe elements
    document.querySelectorAll('.bar, .box, .timeline .container, .contact-item').forEach(el => {
      observer.observe(el);
    });
  }

  setupParallaxEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupHoverAnimations() {
    // Skill bars hover effect
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.bar')) {
        const bar = e.target.closest('.bar');
        bar.style.transform = 'translateY(-10px) scale(1.05)';
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.bar')) {
        const bar = e.target.closest('.bar');
        bar.style.transform = 'translateY(0) scale(1)';
      }
    });
  }

  setupLoadingAnimations() {
    // Animate elements on load
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Animate navigation items
      const navItems = document.querySelectorAll('.navbar a');
      navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in-down');
      });

      // Animate social icons
      const socialIcons = document.querySelectorAll('.social-icons a');
      socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('bounce-in');
      });
    });
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    this.measureLoadTime();
    this.setupPerformanceObserver();
    this.monitorFPS();
  }

  measureLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.metrics.loadTime = loadTime;
      console.log(`Page load time: ${loadTime}ms`);
    });
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.metrics.lcp = entry.startTime;
            console.log('LCP:', entry.startTime);
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  monitorFPS() {
    let lastTime = performance.now();
    let frameCount = 0;

    const measureFPS = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.metrics.fps = fps;
        
        if (fps < 30) {
          console.warn('Low FPS detected:', fps);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  getMetrics() {
    return this.metrics;
  }
}

// Accessibility Manager
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIALabels();
    this.setupReducedMotion();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupFocusManagement() {
    const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const menuButton = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');

    if (menuButton && navbar) {
      menuButton.addEventListener('click', () => {
        const isOpen = navbar.classList.contains('nav-toggle');
        menuButton.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
          const firstFocusable = navbar.querySelector(focusableElements);
          if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
          }
        }
      });
    }
  }

  setupARIALabels() {
    // Add ARIA labels to dynamic content
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer) {
      skillsContainer.setAttribute('role', 'region');
      skillsContainer.setAttribute('aria-label', 'Skills and technologies');
    }
  }

  setupReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition', 'none');
      
      // Disable animations
      const animatedElements = document.querySelectorAll('[class*="animate"]');
      animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
    }
  }
}

// Advanced Portfolio Manager that extends the original
class AdvancedPortfolioManager extends PortfolioManager {
  constructor() {
    super();
    this.themeManager = new ThemeManager();
    this.animationManager = new AnimationManager();
    this.performanceMonitor = new PerformanceMonitor();
    this.accessibilityManager = new AccessibilityManager();
    this.initAdvancedFeatures();
  }

  initAdvancedFeatures() {
    this.setupSearchFunctionality();
    this.setupAnalytics();
    this.setupServiceWorker();
    this.setupErrorHandling();
  }

  setupSearchFunctionality() {
    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.id = 'search-overlay';
    searchOverlay.className = 'search-overlay hidden';
    searchOverlay.innerHTML = `
      <div class="search-container">
        <div class="search-header">
          <input type="text" id="search-input" placeholder="Search skills, projects, or experience...">
          <button id="search-close" aria-label="Close search">&times;</button>
        </div>
        <div id="search-results" class="search-results"></div>
      </div>
    `;

    document.body.appendChild(searchOverlay);

    // Add search trigger (Ctrl+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleSearch();
      }
      
      if (e.key === 'Escape') {
        this.closeSearch();
      }
    });

    // Setup search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.performSearch(e.target.value, searchResults);
      });
    }
  }

  toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    
    if (overlay.classList.contains('hidden')) {
      overlay.classList.remove('hidden');
      setTimeout(() => input.focus(), 100);
    } else {
      this.closeSearch();
    }
  }

  closeSearch() {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.add('hidden');
  }

  performSearch(query, resultsContainer) {
    if (!query.trim()) {
      resultsContainer.innerHTML = '';
      return;
    }

    // Search through different content types
    const searchableContent = this.getSearchableContent();
    const results = this.searchContent(searchableContent, query.toLowerCase());
    
    this.displaySearchResults(results, resultsContainer);
  }

  getSearchableContent() {
    return [
      // Skills
      ...Array.from(document.querySelectorAll('.bar span')).map(el => ({
        type: 'skill',
        title: el.textContent,
        element: el.closest('.bar')
      })),
      
      // Education
      ...Array.from(document.querySelectorAll('.education .box h3')).map(el => ({
        type: 'education',
        title: el.textContent,
        element: el.closest('.box')
      })),
      
      // Experience
      ...Array.from(document.querySelectorAll('.timeline h2')).map(el => ({
        type: 'experience',
        title: el.textContent,
        element: el.closest('.container')
      }))
    ];
  }

  searchContent(content, query) {
    return content.filter(item => 
      item.title.toLowerCase().includes(query)
    ).slice(0, 10);
  }

  displaySearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<div class="no-results">No results found</div>';
      return;
    }

    const resultHTML = results.map(result => `
      <div class="search-result" data-type="${result.type}">
        <span class="result-type">${result.type}</span>
        <span class="result-title">${result.title}</span>
      </div>
    `).join('');

    container.innerHTML = resultHTML;

    // Add click handlers
    container.querySelectorAll('.search-result').forEach(resultEl => {
      resultEl.addEventListener('click', () => {
        const result = results.find(r => r.title === resultEl.querySelector('.result-title').textContent);
        this.scrollToElement(result.element);
        this.closeSearch();
      });
    });
  }

  scrollToElement(element) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const elementTop = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });

    // Highlight element temporarily
    element.style.outline = '2px solid var(--primary-color)';
    setTimeout(() => {
      element.style.outline = 'none';
    }, 2000);
  }

  setupAnalytics() {
    // Basic analytics without external dependencies
    const analytics = {
      startTime: Date.now(),
      interactions: 0,
      sections: new Set()
    };

    // Track section views
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          analytics.sections.add(sectionId);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    // Track interactions
    document.addEventListener('click', () => {
      analytics.interactions++;
    });

    // Send analytics on page unload
    window.addEventListener('beforeunload', () => {
      const sessionData = {
        duration: Date.now() - analytics.startTime,
        interactions: analytics.interactions,
        sectionsViewed: Array.from(analytics.sections),
        timestamp: new Date().toISOString()
      };
      
      console.log('Session Analytics:', sessionData);
      // Here you could send to your analytics service
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.showNotification('An error occurred. Please refresh the page.', 'error');
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.showNotification('Something went wrong. Please try again.', 'error');
    });
  }
}

// Initialize the advanced portfolio manager
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedPortfolioManager();
});