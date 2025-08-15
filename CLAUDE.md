# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Clifton Strengths Consulting - MVP Website**

A sophisticated marketing website for a Clifton Strengths consulting business, featuring individual coaching, couple dynamics, and team synergy services. The site emphasizes clean design with strategic color accents, interactive elements, and conversion-focused user experience.

### Design System
- **Color Palette**: Deep navy (#1a2332) foundation with coral (#ff6b6b), purple (#8b5cf6), and teal (#06b6d4) gradient accents
- **Typography**: Clash Display for headlines, Inter for body text
- **Design Language**: Generous whitespace, asymmetric layouts, subtle micro-animations, glass morphism effects
- **Responsive**: Mobile-first approach with thumb-friendly 44x44px minimum touch targets

### Key Features
- Interactive constellation visualization of strength profiles
- Zigzag process layout with scroll-triggered animations
- Embedded booking system (Calendly integration)
- Auto-advancing testimonials carousel with manual controls
- Expandable service cards with gradient border animations
- Performance optimized with lazy loading and critical CSS

## Technical Architecture

### Frontend Technology Stack
- Modern HTML5/CSS3 with CSS Grid and Flexbox
- Vanilla JavaScript or lightweight framework (React/Vue recommended)
- SVG animations for interactive elements
- Intersection Observer API for scroll-triggered animations
- CSS custom properties for theme management

### Performance Requirements
- Lazy loading for images and non-critical content
- Critical CSS inlining for fast initial paint
- Progressive enhancement for interactive features
- Prefers-reduced-motion media query support
- Mobile optimization with responsive images

### Accessibility Standards
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios meeting accessibility guidelines

## Development Commands

### Setup
```bash
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
```

### Quality Assurance
```bash
npm run lint            # ESLint code checking
npm run format          # Prettier code formatting
npm run test            # Run test suite
npm run lighthouse      # Performance audit
```

## Component Architecture

### Core Sections
1. **Navigation**: Fixed header with blur effect, responsive hamburger menu
2. **Hero**: Split-screen layout with interactive strength constellation
3. **Process**: Three-step zigzag card layout with animations
4. **Services**: Expandable grid cards with gradient borders
5. **About**: Profile section with morphing blob animations
6. **Testimonials**: Auto-advancing carousel with strength badges
7. **CTA**: Embedded booking with gradient background
8. **Footer**: Four-column layout with newsletter signup

### Interactive Elements
- Hover states with gradient shifts and scale transforms
- Form validation with real-time feedback
- Loading states using skeleton screens
- Success animations with confetti effects
- Touch/swipe gestures for mobile

## Styling Guidelines

### CSS Organization
- Component-based SCSS/CSS structure
- CSS custom properties for theme variables
- BEM methodology for class naming
- Utility classes for common patterns

### Animation Principles
- Subtle micro-interactions for engagement
- Respect user motion preferences
- 60fps performance for all animations
- Meaningful transitions that enhance UX

## Git Integration

This repository is configured with GitHub CLI integration and has permissions for common git operations:
- Repository creation and management
- Branch operations
- Commit and push workflows
- Remote repository management