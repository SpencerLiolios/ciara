// Main JavaScript entry point
import { initEmailCopy } from './modules/email-copy.js';
import { initAnalytics } from './modules/analytics.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize analytics with Google Analytics measurement ID
    // Set debugMode to true to see tracking events in console
    initAnalytics('G-0S0K62MGEE', { 
        debugMode: true,  // Set to false in production
        exposeGlobal: true // Allows access to window.analytics for debugging
    });
    
    initEmailCopy();
});