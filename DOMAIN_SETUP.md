# Custom Domain Setup Guide

This guide will walk you through deploying your portfolio and connecting a custom domain.

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Build Your Project Locally
```bash
npm run build
```
This creates a `dist` folder with your optimized website.

### Step 2: Push to GitHub
1. Create a new repository on GitHub (if you haven't already)
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login (you can use your GitHub account)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel will auto-detect Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
6. Click **"Deploy"**
7. Wait 1-2 minutes - your site will be live at `your-project.vercel.app`

### Step 4: Add Custom Domain on Vercel
1. In your Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. Enter your domain (e.g., `danielsamarin.com` or `www.danielsamarin.com`)
3. Click **"Add"**
4. Vercel will show you DNS records to add

### Step 5: Configure DNS at Your Domain Provider

#### If you bought domain from:
- **GoDaddy, Namecheap, Google Domains, etc.**

**For Root Domain (danielsamarin.com):**
- Type: `A`
- Name: `@` or leave blank
- Value: `76.76.21.21` (Vercel's IP)

**For WWW (www.danielsamarin.com):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

**Alternative (Easier):**
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com`

#### DNS Propagation:
- Wait 5-60 minutes (sometimes up to 48 hours)
- Check status at: [whatsmydns.net](https://www.whatsmydns.net)

### Step 6: SSL Certificate (Automatic)
- Vercel automatically provides free SSL certificates
- Your site will be `https://yourdomain.com` within minutes

---

## Option 2: Deploy to Netlify

### Step 1-2: Same as Vercel (Build & Push to GitHub)

### Step 3: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login (use GitHub)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

### Step 4: Add Custom Domain on Netlify
1. Go to **"Site settings"** → **"Domain management"**
2. Click **"Add custom domain"**
3. Enter your domain
4. Follow Netlify's DNS instructions

### Step 5: Configure DNS
**For Root Domain:**
- Type: `A`
- Name: `@`
- Value: `75.2.60.5` (Netlify's IP)

**For WWW:**
- Type: `CNAME`
- Name: `www`
- Value: `your-site.netlify.app`

---

## Option 3: GitHub Pages

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Add these scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Step 3: Update vite.config.js
```js
export default defineConfig({
  base: '/your-repo-name/',  // Replace with your GitHub repo name
  // ... rest of config
})
```

### Step 4: Deploy
```bash
npm run deploy
```

### Step 5: Enable GitHub Pages
1. Go to your GitHub repo → **Settings** → **Pages**
2. Select branch: `gh-pages` / `root`
3. Your site will be at: `username.github.io/your-repo-name`

### Step 6: Custom Domain
1. In the same Pages settings, add your custom domain
2. Add a `CNAME` file in your `public` folder:
   ```
   yourdomain.com
   ```
3. Configure DNS at your domain provider:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `username.github.io`

---

## Where to Buy a Domain

### Recommended Providers:
1. **Namecheap** - $8-12/year, easy to use
2. **Google Domains** - $12/year, simple interface
3. **Cloudflare** - $8-10/year, includes free privacy
4. **GoDaddy** - Popular but more expensive

### Steps to Buy:
1. Search for your desired domain (e.g., `danielsamarin.com`)
2. Add to cart and checkout
3. Complete registration
4. Follow DNS setup steps above

---

## Quick Checklist

- [ ] Build your project (`npm run build`)
- [ ] Push code to GitHub
- [ ] Deploy to Vercel/Netlify
- [ ] Buy domain (if needed)
- [ ] Add domain to hosting platform
- [ ] Configure DNS records
- [ ] Wait for DNS propagation (5-60 min)
- [ ] Test your domain: `https://yourdomain.com`
- [ ] Update any hardcoded URLs in your code

---

## Troubleshooting

### Domain not working?
1. Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
2. Clear browser cache
3. Try incognito/private window
4. Wait up to 48 hours for DNS

### HTTPS not working?
- Vercel/Netlify provide SSL automatically
- Wait 10-15 minutes after adding domain

### Need help?
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)

---

**Recommended:** Use Vercel - it's the easiest and fastest option for React/Vite projects!

