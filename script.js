// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Sticky header on scroll
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('nav__menu--active');
            navToggle.classList.remove('nav__toggle--active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('nav__menu--active');
            navToggle.classList.remove('nav__toggle--active');
        }
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('nav__link--active'));
                if (navLink) {
                    navLink.classList.add('nav__link--active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Run on page load
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Constellation animation and interaction
function initConstellation() {
    const stars = document.querySelectorAll('.constellation__star');
    const lines = document.querySelectorAll('.constellation__lines line');
    
    // Floating animation for stars
    stars.forEach((star, index) => {
        star.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite alternate`;
        star.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animated line drawing
    lines.forEach((line, index) => {
        line.style.strokeDasharray = line.getTotalLength();
        line.style.strokeDashoffset = line.getTotalLength();
        line.style.animation = `drawLine 2s ease-in-out ${index * 0.3}s forwards`;
    });
    
    // Add click interaction for stars
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const strength = this.dataset.strength;
            console.log(`Clicked strength: ${strength}`);
            // Could add modal or more interaction here
        });
    });
}

// CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-10px); }
    }
    
    @keyframes drawLine {
        from { stroke-dashoffset: 400; }
        to { stroke-dashoffset: 0; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Hero section entrance animation
function animateHeroEntrance() {
    const heroElements = [
        '.hero__badge',
        '.hero__title',
        '.hero__subtitle',
        '.hero__stats',
        '.hero__actions'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
        }
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.firstName || !data.lastName || !data.email || !data.service) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = form.querySelector('.form__submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                
                // Show success message
                alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                
                // Reset form
                form.reset();
                
                // Reset button
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Initialize Calendly widget (placeholder functionality)
function initCalendlyWidget() {
    // In a real implementation, you would load the Calendly script:
    // const script = document.createElement('script');
    // script.src = 'https://assets.calendly.com/assets/external/widget.js';
    // document.head.appendChild(script);
    
    console.log('Calendly widget initialized (placeholder)');
}

// Newsletter form handling
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('.newsletter__input').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            const submitButton = form.querySelector('.newsletter__submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.textContent = 'Subscribed!';
                
                alert('Thank you for subscribing! You\'ll receive our weekly newsletter with strengths insights and tips.');
                
                form.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initConstellation();
    setTimeout(animateHeroEntrance, 300); // Slight delay for page load
    initContactForm();
    initCalendlyWidget();
    initNewsletterForm();
});