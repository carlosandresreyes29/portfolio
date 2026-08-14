// Portfolio Website - Main JavaScript File
// Author: Carlos Andrés Reyes
// Enhanced with AOS animations and improved button effects

(function() {
    'use strict';

    // ============================================
    // Initialize AOS (Animate On Scroll)
    // ============================================
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                delay: 100
            });
        }
    }

    // ============================================
    // Enhanced Button Animations
    // ============================================
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .project-card');
        
        buttons.forEach(button => {
            // Ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Enhanced hover effect with scale
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    updateActiveNavLink(href);
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: true
                        });
                    }
                }
            });
        });
    }

    // ============================================
    // Update Active Navigation Link on Scroll
    // ============================================
    function updateActiveNavLink(currentSection) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // Scroll Spy - Highlight active section
    // ============================================
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        
        function checkActiveSection() {
            const scrollPosition = window.scrollY + navHeight + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    updateActiveNavLink('#' + sectionId);
                }
            });
        }
        
        window.addEventListener('scroll', checkActiveSection);
        checkActiveSection(); // Run on page load
    }

    // ============================================
    // Back to Top Button Functionality
    // ============================================
    function initBackToTop() {
        const backToTopButtons = document.querySelectorAll('.btn-back-to-top, [href="#top"], .back-to-top');
        
        backToTopButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ============================================
    // Project Card Hover Animation Enhancement
    // ============================================
    function initProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // ============================================
    // Image Lazy Loading
    // ============================================
    function initLazyLoading() {
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

    // ============================================
    // Navbar Background on Scroll
    // ============================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        function handleNavbarScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', handleNavbarScroll);
        handleNavbarScroll(); // Run on page load
    }

    // ============================================
    // Animation on Scroll (Fade In)
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => animationObserver.observe(element));
    }

    // ============================================
    // Form Validation (if applicable)
    // ============================================
    function initFormValidation() {
        const forms = document.querySelectorAll('form.needs-validation');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });
    }

    // ============================================
    // Mobile Menu Enhancement
    // ============================================
    function initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (!navbarToggler || !navbarCollapse) return;
        
        // Add aria-label for accessibility
        navbarToggler.setAttribute('aria-label', 'Toggle navigation menu');
    }

    // ============================================
    // Initialize All Functions
    // ============================================
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initAOS();
                initButtonAnimations();
                initSmoothScroll();
                initScrollSpy();
                initBackToTop();
                initProjectCardAnimations();
                initLazyLoading();
                initNavbarScroll();
                initScrollAnimations();
                initFormValidation();
                initMobileMenu();
            });
        } else {
            initAOS();
            initButtonAnimations();
            initSmoothScroll();
            initScrollSpy();
            initBackToTop();
            initProjectCardAnimations();
            initLazyLoading();
            initNavbarScroll();
            initScrollAnimations();
            initFormValidation();
            initMobileMenu();
        }
    }

    // ============================================
    // Run Initialization
    // ============================================
    init();

})();

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}