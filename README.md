# Ovulation Date Calculator

A mobile-first, responsive web application built with Next.js and Tailwind CSS to help women calculate their ovulation dates and fertility windows.

## Features

### 🎯 Core Calculator
- **Date Input**: First day of last period
- **Cycle Length**: Customizable average cycle length (21-35 days, default: 28)
- **Real-time Calculation**: Instant results with smooth animations
- **Multiple Results**:
  - Estimated ovulation window (2-3 day range)
  - Most likely conception date
  - Fertile week range

### 📱 Mobile-First Design
- Responsive design optimized for iPhone and mobile devices
- Large, touch-friendly buttons and inputs
- Fast-loading with optimized performance
- PWA-ready with app-like experience

### 🔒 Privacy & Security
- Client-side calculations (no data transmitted to servers)

- Privacy-focused design
- No user registration required

### 📊 SEO & Analytics Ready
- Comprehensive meta tags and structured data
- Google AdSense integration
- JSON-LD structured data for health tools
- Optimized for search engines

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds
- Smooth fade-in animations
- Professional color scheme (purple/pink theme)
- Accessible design with proper contrast

## Pages

1. **Main Calculator** (`/`) - Primary ovulation calculator
2. **About** (`/about`) - Information about the tool and contact details
3. **Privacy Policy** (`/privacy`) - AdSense-compliant privacy statement
4. **Terms of Use** (`/terms`) - Terms with medical disclaimer

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Custom SVG favicon and Apple touch icon
- **PWA**: Web app manifest for mobile installation

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ovulationdatecalculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Configuration



### Customization

- **Colors**: Modify the purple/pink theme in Tailwind classes
- **Domain**: Update URLs in meta tags and structured data
- **Contact**: Change email addresses in About, Privacy, and Terms pages

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain configuration available

### Other Platforms
- **Netlify**: Compatible with static export
- **AWS S3**: Static hosting with CloudFront
- **GitHub Pages**: Static site hosting

## SEO Features

- ✅ Meta tags for all pages
- ✅ Open Graph and Twitter cards
- ✅ JSON-LD structured data
- ✅ Sitemap generation (Next.js built-in)
- ✅ Robots.txt configuration
- ✅ Favicon and Apple touch icons

## PWA Features

- ✅ Web app manifest
- ✅ Service worker ready
- ✅ Mobile app-like experience
- ✅ Offline capability (with service worker)

## Medical Disclaimer

⚠️ **Important**: This calculator provides estimates based on typical menstrual cycles. Results may vary and should not replace medical advice. Always consult with a healthcare provider for personalized guidance.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, contact: contact@ovulationdatecalculator.com

---

**Built with ❤️ using Next.js and Tailwind CSS**
