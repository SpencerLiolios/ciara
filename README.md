# Clifton Strengths Consulting Website

A professional, responsive website for a CliftonStrengths coaching business featuring modern design, interactive elements, and comprehensive service information.

## Features

- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Interactive Constellation**: Visual representation of strength themes with hover effects
- **Professional Services**: Detailed service offerings with pricing and features
- **Contact Integration**: Contact forms and Calendly booking integration
- **SEO Optimized**: Complete meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG 2.1 AA compliant with proper focus states and navigation

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Interactive functionality without framework dependencies
- **Font Integration**: Google Fonts (Inter) and Fontshare (Clash Display)

## File Structure

```
├── index.html          # Main website file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── todo.md            # Development checklist
```

## Local Development

1. Clone or download the project files
2. Start a local web server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser

## Deployment Options

### Static Hosting (Recommended)
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration with automatic deployments
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3 + CloudFront**: Scalable solution with CDN

### Traditional Web Hosting
- Upload all files to your web hosting provider
- Ensure the main file is named `index.html`
- Configure custom domain if needed

## SEO & Performance

### Included SEO Features
- Meta descriptions and keywords
- Open Graph and Twitter Card tags
- Schema.org structured data
- Canonical URLs
- Semantic HTML structure

### Performance Optimizations
- Optimized font loading with preconnect
- CSS custom properties for efficient styling
- Minimal JavaScript for fast loading
- Mobile-optimized layouts

## Customization

### Colors
Update the CSS custom properties in `styles.css`:
```css
:root {
    --color-navy: #1a2332;
    --color-coral: #ff6b6b;
    --color-purple: #8b5cf6;
    --color-teal: #06b6d4;
}
```

### Content
- Update company information in `index.html`
- Modify service offerings and pricing
- Replace placeholder contact information
- Update Calendly integration URL

### Functionality
- Connect contact forms to your backend service
- Replace Calendly placeholder with actual integration
- Add Google Analytics tracking code
- Configure email newsletter integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Skip to main content link
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- High contrast color ratios
- Screen reader compatibility

## Future Enhancements

Consider adding:
- Blog functionality
- Client portal
- Online assessment tools
- Webinar registration
- Content management system
- Multi-language support

## Support

For questions about implementation or customization, refer to the comments in the code files or consult web development documentation for HTML, CSS, and JavaScript.

## License

This is a custom website template. Modify as needed for your business requirements.