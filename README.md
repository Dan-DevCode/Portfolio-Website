# Daniel Samarin — Portfolio

Personal portfolio site for [Daniel Samarin](https://github.com/dsamarin-ai). Single-page React application with section-based navigation, deployed on Vercel.

## Stack

- React 18, TypeScript, Vite 5
- Tailwind CSS, Framer Motion, Lenis
- Vercel (hosting + serverless API for GitHub activity)

## Local development

**Requirements:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Production build:**

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

## Project layout

```
public/                 Static assets (images, favicon, resume PDF)
src/
  data/content.ts       Site copy, projects, skills, contact info
  sections/             Page sections (Hero, Projects, About, etc.)
  components/           UI, layout, and effects
  hooks/                Scroll, mouse, and interaction hooks
api/                    Vercel serverless routes
lib/                    Shared server utilities for API routes
```

Most editable content lives in `src/data/content.ts`. Section components in `src/sections/` control layout and presentation.

## Updating your resume (PDF)

The **Download CV** button in the hero section links to a PDF in the `public/` folder.

### Steps

1. Export or save your resume as a PDF.

2. Place the file in the project `public/` folder:
   ```
   public/Daniel_Samarin_Resume.pdf
   ```

3. Confirm the filename matches `src/data/content.ts`:
   ```ts
   resume: '/Daniel_Samarin_Resume.pdf',
   ```

4. If you use a different filename, update that line to match. The path must start with `/` and match the file in `public/`.

5. Test locally:
   ```bash
   npm run dev
   ```
   Click **Download CV** in the hero section. The file should download or open in a new tab.

6. Commit the new PDF and push to deploy on Vercel:
   ```bash
   git add public/Daniel_Samarin_Resume.pdf
   git commit -m "Update resume"
   git push
   ```

**Note:** Files in `public/` are served from the site root. A file at `public/Daniel_Samarin_Resume.pdf` is available at `yoursite.com/Daniel_Samarin_Resume.pdf`.

### Profile photo

Same process for the headshot:

```
public/Profile Picture.jpg
```

Referenced in `src/data/content.ts` as `profileImage: '/Profile Picture.jpg'`.

## Updating site content

| What to change | File |
|----------------|------|
| Name, email, links, resume path, roles | `src/data/content.ts` → `personal` |
| Projects | `src/data/content.ts` → `projects` |
| Skills | `src/data/content.ts` → `skills` |
| Career timeline | `src/data/content.ts` → `milestones` |
| Page title and meta tags | `index.html` |

## Environment variables (Vercel)

Set these in the Vercel project dashboard under **Settings → Environment Variables**:

| Variable | Purpose |
|----------|---------|
| `GITHUB_USERNAME` | GitHub username for the activity heatmap (`dsamarin-ai`) |

Optional:

| Variable | Default |
|----------|---------|
| `RATE_LIMIT_MAX_REQUESTS` | `30` |
| `RATE_LIMIT_WINDOW_MS` | `60000` |

## Deployment

The site is configured for Vercel. On push to the connected branch, Vercel runs `npm install` and `npm run build`, then serves the `dist` output.

`vercel.json` contains a single SPA rewrite so client-side routes resolve to `index.html`. API routes in `api/` are handled separately by Vercel.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run audit:check` | Check dependencies for known vulnerabilities |

## License

MIT
