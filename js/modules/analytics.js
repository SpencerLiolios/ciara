/**
 * Simple Analytics Module for Strengths Consulting
 * Provides visitor and interaction tracking for coaching website
 */

export class Analytics {
  constructor(measurementId) {
    this.measurementId = measurementId;
    this.isInitialized = false;
    this.debugMode = false; // Set to true to see console logs
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    // Load Google Analytics
    this.loadGoogleAnalytics();
    
    // Track page views
    this.trackPageView();
    
    // Set up click tracking
    this.setupClickTracking();
    
    // Track form interactions
    this.setupFormTracking();
    
    // Track strengths-specific interactions
    this.setupStrengthsTracking();
    
    this.isInitialized = true;
  }

  loadGoogleAnalytics() {
    // Only load if measurement ID is provided and not already loaded
    if (!this.measurementId || window.gtag) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      anonymize_ip: true, // Privacy-friendly
      cookie_flags: 'SameSite=None;Secure'
    });

    if (this.debugMode) {
      console.log('Analytics: Google Analytics loaded');
    }
  }

  trackPageView() {
    const pageData = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    };

    this.track('page_view', pageData);

    if (this.debugMode) {
      console.log('Analytics: Page view tracked', pageData);
    }
  }

  setupClickTracking() {
    // Track all links and buttons
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button, [data-track]');
      if (!target) return;

      let eventData = {
        element_type: target.tagName.toLowerCase(),
        element_text: this.getElementText(target).substring(0, 100),
        element_url: target.href || null,
        element_id: target.id || null,
        element_classes: target.className || null
      };

      // Use data-track attribute if available
      const trackingLabel = target.dataset.track;
      if (trackingLabel) {
        eventData.event_label = trackingLabel;
      }

      // Determine event name based on element type and context
      let eventName = 'click';
      
      if (target.tagName === 'A') {
        if (target.href && target.href.startsWith('mailto:')) {
          eventName = 'email_click';
          eventData.email_address = target.href.replace('mailto:', '');
        } else if (target.href && target.href.startsWith('tel:')) {
          eventName = 'phone_click';
          eventData.phone_number = target.href.replace('tel:', '');
        } else if (target.target === '_blank') {
          eventName = 'external_link_click';
        } else if (target.classList.contains('social-link')) {
          eventName = 'social_click';
          const platform = target.querySelector('.social-name')?.textContent || 'Unknown';
          eventData.social_platform = platform;
        } else {
          eventName = 'link_click';
        }
      } else if (target.tagName === 'BUTTON' || target.classList.contains('btn')) {
        eventName = 'cta_click';
        const section = target.closest('section')?.id || 'unknown';
        eventData.section = section;
        eventData.button_text = this.getElementText(target);
      }

      this.track(eventName, eventData);

      if (this.debugMode) {
        console.log(`Analytics: ${eventName} tracked`, eventData);
      }
    });
  }

  setupFormTracking() {
    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (!form.tagName || form.tagName !== 'FORM') return;

      const formData = {
        form_id: form.id || 'unknown',
        form_type: this.getFormType(form),
        page_location: window.location.href
      };

      this.track('form_submit', formData);

      if (this.debugMode) {
        console.log('Analytics: Form submission tracked', formData);
      }
    });

    // Track form field interactions
    document.addEventListener('focus', (e) => {
      const field = e.target;
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(field.tagName)) return;

      const fieldData = {
        field_type: field.type || field.tagName.toLowerCase(),
        field_name: field.name || field.id || 'unknown',
        form_id: field.closest('form')?.id || 'unknown'
      };

      this.track('form_field_focus', fieldData);
    }, true);
  }

  setupStrengthsTracking() {
    // Track service card interactions
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => {
        const serviceTitle = card.querySelector('.service-card__title')?.textContent || 'Unknown Service';
        const price = card.querySelector('.service-card__price, .price__amount')?.textContent || '';
        
        this.track('service_interest', {
          service_name: serviceTitle,
          service_price: price,
          page_location: window.location.href
        });
      });
    });

    // Track constellation star interactions
    document.querySelectorAll('.constellation__star').forEach(star => {
      star.addEventListener('click', () => {
        const strength = star.dataset.strength || star.querySelector('.star__label')?.textContent || 'Unknown';
        
        this.track('strength_interaction', {
          strength_name: strength,
          page_location: window.location.href
        });
      });
    });

    // Track testimonial interactions
    document.querySelectorAll('.testimonial').forEach(testimonial => {
      testimonial.addEventListener('click', () => {
        const author = testimonial.querySelector('.author__info strong, .testimonial__author')?.textContent || 'Unknown';
        const strengths = Array.from(testimonial.querySelectorAll('.strength-badge')).map(badge => badge.textContent);
        
        this.track('testimonial_click', {
          testimonial_author: author,
          client_strengths: strengths.join(', '),
          page_location: window.location.href
        });
      });
    });

    // Track booking interactions
    document.querySelectorAll('[class*="booking"], [class*="calendly"]').forEach(element => {
      element.addEventListener('click', () => {
        this.track('booking_interaction', {
          element_type: element.className,
          page_location: window.location.href
        });
      });
    });
  }

  getFormType(form) {
    const formId = form.id?.toLowerCase() || '';
    const formClasses = form.className?.toLowerCase() || '';
    
    if (formId.includes('contact') || formClasses.includes('contact')) {
      return 'contact';
    } else if (formId.includes('newsletter') || formClasses.includes('newsletter')) {
      return 'newsletter';
    } else if (formId.includes('booking') || formClasses.includes('booking')) {
      return 'booking';
    }
    
    return 'unknown';
  }

  track(eventName, parameters = {}) {
    // Add common parameters
    const enrichedParams = {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      user_agent_type: this.getDeviceType()
    };

    // Send to Google Analytics if available
    if (window.gtag && this.measurementId) {
      window.gtag('event', eventName, enrichedParams);
    }

    // Always log in debug mode
    if (this.debugMode) {
      console.log(`Analytics Event: ${eventName}`, enrichedParams);
    }

    // Store events locally for basic analytics without GA
    this.storeEventLocally(eventName, enrichedParams);
  }

  storeEventLocally(eventName, parameters) {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      events.push({
        event: eventName,
        ...parameters,
        session_id: this.getSessionId()
      });

      // Keep only last 1000 events
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }

      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (e) {
      // Fail silently if localStorage is not available
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  getElementText(element) {
    return element.textContent || element.innerText || element.alt || element.title || '';
  }

  // Get stored events (useful for debugging or custom reporting)
  getStoredEvents() {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]');
    } catch (e) {
      return [];
    }
  }

  // Clear stored events
  clearStoredEvents() {
    localStorage.removeItem('analytics_events');
  }

  // Enable/disable debug mode
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }
}

// Export a function to create and initialize analytics
export function initAnalytics(measurementId, options = {}) {
  const analytics = new Analytics(measurementId);
  
  if (options.debugMode) {
    analytics.setDebugMode(true);
  }

  // Expose analytics instance globally for debugging
  if (options.exposeGlobal) {
    window.analytics = analytics;
  }

  return analytics;
}