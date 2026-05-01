# Personal Portfolio Website

A modern, minimal, high-performance personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

-  **Clean & Premium Design** - Minimal layout with generous white space and sharp typography
-  **Fully Responsive** - Optimized for screens from 360px to 1920px+
-  **Light/Dark Theme** - Theme toggle with localStorage persistence
-  **Smooth Animations** - Micro-interactions, hover states, parallax effects, and reveal-on-scroll
-  **Page Transitions** - Smooth fade/slide transitions between sections
-  **Accessible** - WCAG AA compliant, keyboard navigable, visible focus rings
-  **SEO Ready** - Meta tags, OpenGraph, and optimized for performance (Lighthouse 95+)
-  **Fast Performance** - Gzip compression, lazy loading, and optimized assets

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd "Personal Portfolio Website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── og.png (create your own 1200x630 image)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SectionHead.jsx
│   │   └── AnimatedLink.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── netlify.toml
```

## Customization

### Update Content

1. **Personal Information**: Edit the content in each page component:
   - `src/pages/Home.jsx` - Hero section content
   - `src/pages/About.jsx` - Bio, skills, and timeline
   - `src/pages/Projects.jsx` - Project data array
   - `src/pages/Contact.jsx` - Contact information

2. **Social Links**: Update links in:
   - `src/components/Footer.jsx` - Footer social links
   - `src/pages/Contact.jsx` - Contact methods

3. **Meta Tags**: Update SEO information in `index.html`

4. **Colors**: Modify the accent color in `tailwind.config.js`:
   ```js
   colors: {
     accent: {
       DEFAULT: '#6366F1', 
     }
   }
   ```

5. **CV/Resume**: Add your resume PDF to the `public` folder and update the link in `src/pages/Home.jsx`

### Create og.png

Create a 1200x630px image for social media previews and save it as `public/og.png`.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite configuration
4. Deploy!

The `vercel.json` file is already configured for client-side routing.

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

The `netlify.toml` file is already configured.

### Deploy to GitHub Pages

1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Update `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to StackBlitz

1. Push your code to GitHub
2. Go to [StackBlitz](https://stackblitz.com)
3. Click "New Project" → "Import from GitHub"
4. Enter your repository URL
5. StackBlitz will automatically set up the environment

## Performance Tips

- Images: Use WebP format and lazy loading
- Fonts: Already optimized with preload in `index.html`
- Code splitting: Already configured in `vite.config.js`
- Compression: Gzip compression via `vite-plugin-compression`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, feel free to reach out through the contact page on the website.

