# John Doe - Portfolio Website

A single-page, responsive portfolio website for a data scientist/researcher built with Gatsby and Tailwind CSS.

## Features

- **Ultra-minimalist design**: Clean, professional academic aesthetic
- **Monochrome color palette**: Off-white background with charcoal text
- **Custom typography**: Bricolage Grotesque for headings, Rethink Sans for body text
- **Responsive layout**: Mobile-first design that works on all screen sizes
- **Smooth scrolling**: Navigation links smoothly scroll to sections

## Sections

1. **Header**: Sticky navigation with name and section links
2. **Hero**: Large name display with title and social links
3. **About**: Bio and research interests
4. **Projects**: Card-based project showcase with images and tags
5. **Publications**: Academic papers with PDF/Cite buttons
6. **CV**: Experience, education, and skills in grid layout
7. **Footer**: Contact information and social links

## Tech Stack

- [Gatsby](https://www.gatsbyjs.com/) - Static site generator
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Google Fonts](https://fonts.google.com/) - Web fonts (Bricolage Grotesque, Rethink Sans)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run develop
```

The site will be available at `http://localhost:8000`

### Build

```bash
# Build for production
npm run build

# Serve the production build
npm run serve
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.js       # Navigation header
│   │   ├── Hero.js         # Hero section
│   │   ├── About.js        # About section
│   │   ├── Projects.js     # Projects grid
│   │   ├── Publications.js # Publications list
│   │   ├── CV.js           # Curriculum vitae
│   │   └── Footer.js       # Page footer
│   ├── pages/
│   │   └── index.js        # Main page
│   └── styles/
│       └── global.css      # Global styles and Tailwind imports
├── gatsby-browser.js       # Browser-specific configs
├── gatsby-config.js        # Gatsby configuration
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  'off-white': '#f8f8f8',
  'charcoal': '#1a1a1a',
  'medium-gray': '#6b6b6b',
  'light-gray': '#e5e5e5',
}
```

### Fonts

The site uses Google Fonts. To change fonts, update:
1. `gatsby-config.js` - font imports
2. `tailwind.config.js` - font family definitions
3. `src/styles/global.css` - font import URL

### Content

All content is defined in the component files:
- **Projects**: Edit `src/components/Projects.js`
- **Publications**: Edit `src/components/Publications.js`
- **Experience/Education**: Edit `src/components/CV.js`
- **About text**: Edit `src/components/About.js`
- **Hero text**: Edit `src/components/Hero.js`

## License

MIT
