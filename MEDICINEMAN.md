# The Medicine Man — Website Project

**Client Project** | Premium Sea Moss & Adaptogen Products | Las Vegas, NV

---

## Project Overview

The Medicine Man is a premium wellness product website featuring handcrafted, wildcrafted sea moss infused with powerful adaptogens and minerals. The website showcases products, educational content, testimonials, and direct ordering capabilities.

**Website:** [medicineman702.com](https://medicineman702.com)

**Repository:** [KaiStats/Medicineman702](https://github.com/KaiStats/Medicineman702)

---

## Key Features

### 🌿 Product Showcase
- **Infused Sea Moss** — 32oz jars with 92+ essential minerals
- **Joint Juice CBD Topical** — Multiple sizes and formulations
- **CBD Tinctures** — 2000mg varieties in multiple flavors

### 📱 Digital Presence
- **Social Media Links**
  - Facebook: facebook.com/themedicineman702
  - Instagram: @themedicineman702
- **Direct Contact Options**
  - Phone: (725) 218-0539
  - Email: medicinemanstouch@gmail.com

### 🎨 Design Highlights
- Premium dark theme with emerald & gold accent colors
- AI-generated hero and product imagery
- Smooth scroll animations and reveal effects
- Fully responsive mobile design
- Tailwind CSS + Vanilla JavaScript

### 📊 Content Sections
1. **Hero** — Brand positioning & CTA
2. **Trust Marquee** — Social proof & features
3. **Stats** — Key numbers (92+ minerals, 6 adaptogens, etc.)
4. **Products** — Detailed product cards with pricing
5. **Benefits** — Health & wellness benefits
6. **Videos** — 4-act commercial narrative
7. **Ingredients** — Deep dive into formula components
8. **Testimonials** — Customer reviews & Instagram embeds
9. **Contact** — Multiple order channels & CTAs

---

## Technical Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Hosting:** Porkbun (Domain & Web Hosting)
- **Payment Processing:** Stripe (configured for multiple products)
- **Deployment:** Static HTML/CSS deployed to Porkbun

---

## Branding

### Color Palette
| Color | Use |
|-------|-----|
| Emerald (#6ee7b7) | Primary highlights, borders |
| Gold (#c9a84c) | Accent text, buttons, CTAs |
| Deep Green (#071e14) | Background overlays |
| Zinc (#09090b) | Primary background |

### Typography
- **Display:** Cormorant Garamond (serif) — Headlines
- **Body:** DM Sans (sans-serif) — Content
- **Mono:** Space Mono — Labels & small text

### Logo
- Medicine Man logo (stethoscope + plant design)
- Repositioned in top-left nav for brand visibility
- Drop shadow for depth: `drop-shadow(0 0 12px rgba(34,197,94,0.5))`

---

## Social Media Integration

### Facebook
- **Link:** facebook.com/themedicineman702
- **CTA Buttons** in: Nav bar, mobile menu, contact section
- **Styling:** Hover effect changes to blue (#1877f2)

### Instagram
- **Handle:** @themedicineman702
- **CTA Buttons** in: Nav bar, mobile menu, videos section
- **Styling:** Hover effect changes to pink (#e1306c)
- **Embedded Posts:** Live Instagram feed embeds via `instagram.com/embed.js`

---

## Responsive Design

### Mobile-First Approach
- Sticky order bar at bottom (70px fixed)
- Collapsible mobile menu with hamburger nav
- Touch-friendly tap targets (48px minimum)
- Safe area padding for notched devices

### Breakpoints
- **Mobile:** < 768px (full-width layouts)
- **Tablet:** 768px - 1024px (grid adjustments)
- **Desktop:** > 1024px (multi-column layouts)

---

## Setup & Deployment

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/KaiStats/Medicineman702.git
   cd medicineman702
   ```

2. Open `index.html` in your browser (no build step required)

3. Edit HTML/CSS directly and refresh to see changes

### Deploy to Porkbun
1. Upload `index.html` and all referenced image files to `/public_html/`
2. Ensure logo images are in the same directory:
   - `medicine_man_logo_recolored.png`
   - `medicine_man_three_jars.png`
3. Test social media links and contact forms

### Stripe Integration
Payment links are configured in the HTML but marked `REPLACE_ME_...`. To enable:

1. Create Stripe account at https://dashboard.stripe.com
2. Create products for each offering
3. Generate Payment Links in Stripe Dashboard
4. Copy link URLs and paste into HTML href attributes

---

## Maintenance & Updates

### Content Updates
- Product descriptions: Edit product card text
- Testimonials: Update in testimonials section
- Contact info: Update phone/email in multiple locations
- Social links: Centralized in nav, mobile menu, and footer

### Image Optimization
All images are hosted on Cloudfront CDN with `.webp` format for performance. Replace URLs if migrating image hosts.

### SEO
- Meta tags configured for social sharing
- Semantic HTML structure
- Open Graph tags ready for social media preview
- Sitemap ready for search engines

---

## Client Contact

**Creator:** Eric Porter (The Medicine Man)

**Direct Contact:**
- Phone: (725) 218-0539
- Email: medicinemanstouch@gmail.com
- Location: Las Vegas, Nevada

**Custom Orders:** Available upon request via phone/email

---

## Project Value

- **Investment:** $500 (Website Development)
- **Deliverables:**
  - Full-featured e-commerce website
  - Premium branding & design
  - Mobile-responsive layout
  - Social media integration
  - Stripe payment processing setup
  - Local pickup + shipping support

---

## Notes for Future Development

1. **CMS Integration:** Consider adding a headless CMS (Contentful, Sanity) for easy content updates
2. **Analytics:** Add Google Analytics & Facebook Pixel for traffic tracking
3. **Email Marketing:** Integrate Mailchimp or Klaviyo for customer newsletter
4. **Inventory Management:** Add stock tracking if scaling production
5. **Testimonials Database:** Move testimonials to a database for easier management
6. **Multi-language:** Consider Spanish translations for Las Vegas market

---

**Last Updated:** July 2026  
**Status:** Live Production  
**Repo:** https://github.com/KaiStats/Medicineman702
