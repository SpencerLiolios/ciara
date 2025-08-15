# Google Analytics Setup Guide

This website includes Google Analytics tracking similar to the PersonalSite implementation. Follow these steps to activate analytics tracking.

## Step 1: Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or create a new property
3. Set up your account:
   - Account name: "Strengths Consulting" (or your preferred name)
   - Property name: "Strengths Consulting Website"
   - Industry: "Professional Services"
   - Business size: Select appropriate size

## Step 2: Get Your Measurement ID

1. After creating the property, you'll get a **Measurement ID** that looks like: `G-XXXXXXXXXX`
2. Copy this ID

## Step 3: Update the Website Code

Replace `G-XXXXXXXXXX` in `index.html` with your actual measurement ID:

```html
<!-- Find these lines in index.html (around line 811-818) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    // Replace G-XXXXXXXXXX with your actual measurement ID
    gtag('config', 'G-XXXXXXXXXX', {
```

**Example:**
If your measurement ID is `G-ABC123DEF4`, update both lines:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
```
and
```html
gtag('config', 'G-ABC123DEF4', {
```

## Step 4: Deploy Changes

1. Save the `index.html` file
2. Commit and push to GitHub:
   ```bash
   git add index.html
   git commit -m "Add Google Analytics tracking"
   git push origin main
   ```
3. GitHub Pages will automatically update the live site

## Step 5: Verify Tracking

1. Visit your live website: https://spencerliolios.github.io/ciara/
2. In Google Analytics, go to Reports > Realtime
3. You should see your visit appear within a few minutes

## What Gets Tracked

This implementation tracks the following events:

### Automatic Tracking
- **Page views** - Every time someone visits the site
- **CTA button clicks** - All buttons (Start Your Journey, View Services, etc.)
- **Service card clicks** - When someone clicks on Individual/Couple/Team coaching cards
- **Constellation interactions** - Clicks on strength stars (Strategic, Empathy, etc.)
- **Form submissions** - Contact form and newsletter signups
- **Social media clicks** - LinkedIn, Twitter, Instagram, etc.
- **Phone/Email clicks** - When someone clicks to call or email
- **Testimonial interactions** - Clicks on client testimonials

### Event Details
Each event includes relevant context like:
- Which service was clicked
- Which strength was selected
- Button text and section
- Form type (contact vs newsletter)
- Social platform name
- Author name for testimonials

## Privacy Features

The implementation includes privacy-friendly settings:
- **IP Anonymization**: `anonymize_ip: true`
- **Secure Cookies**: `cookie_flags: 'SameSite=None;Secure'`
- **No Personal Data**: Email addresses are tracked as events, not stored as user properties

## Viewing Your Data

In Google Analytics, you can:

1. **Realtime Reports**: See current visitors and their actions
2. **Events Report**: View all tracked interactions
3. **Conversion Tracking**: Set up goals for form submissions
4. **Audience Insights**: Learn about your visitors' demographics and interests

## Custom Goals (Optional)

Consider setting up these conversion goals in Google Analytics:
- Contact form submissions
- Newsletter signups
- Phone number clicks
- Email clicks
- Service page engagement

## Testing

To test that analytics is working:
1. Open your website in an incognito/private browser window
2. Click around the site (buttons, services, etc.)
3. Check Google Analytics Realtime reports
4. Look for your events appearing

## Support

If you need help with Google Analytics setup:
- [Google Analytics Help Center](https://support.google.com/analytics/)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)

## Similar to PersonalSite

This implementation follows the same pattern as your PersonalSite:
- Privacy-friendly configuration
- Comprehensive event tracking
- No external dependencies
- Clean, minimal setup