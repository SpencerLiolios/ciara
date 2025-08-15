/**
 * Email Copy Module for Strengths Consulting
 * Handles email copying functionality for contact interactions
 */

export function initEmailCopy() {
  // Find all email links and add copy functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get email address from href
      const email = this.href.replace('mailto:', '');
      
      // Copy to clipboard if supported
      if (navigator.clipboard && navigator.clipboard.writeText) {
        e.preventDefault();
        
        navigator.clipboard.writeText(email).then(() => {
          showEmailCopiedNotification(email);
          
          // Dispatch custom event for analytics
          document.dispatchEvent(new CustomEvent('email-copied', {
            detail: { email: email }
          }));
        }).catch(err => {
          console.log('Could not copy email:', err);
          // Fall back to normal mailto behavior
          window.location.href = this.href;
        });
      }
      // If clipboard API not supported, let normal mailto behavior work
    });
  });

  // Add click-to-copy functionality for any element with data-email attribute
  const emailElements = document.querySelectorAll('[data-email]');
  
  emailElements.forEach(element => {
    element.style.cursor = 'pointer';
    element.title = 'Click to copy email address';
    
    element.addEventListener('click', function() {
      const email = this.dataset.email;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showEmailCopiedNotification(email);
          
          // Dispatch custom event for analytics
          document.dispatchEvent(new CustomEvent('email-copied', {
            detail: { email: email }
          }));
        }).catch(err => {
          console.log('Could not copy email:', err);
        });
      }
    });
  });
}

function showEmailCopiedNotification(email) {
  // Create or get existing notification element
  let notification = document.getElementById('email-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'email-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease-in-out;
    `;
    document.body.appendChild(notification);
  }
  
  // Update notification text
  const maskedEmail = email.replace(/(.{3}).*(@.*)/, '$1***$2');
  notification.textContent = `Email ${maskedEmail} copied to clipboard!`;
  
  // Show notification
  notification.style.opacity = '1';
  notification.style.transform = 'translateX(0)';
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
  }, 3000);
}