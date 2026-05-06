# PROWRAP Git & Vercel Deployment Guide

## 1. Branch Strategy
- **main**: Production branch. Every push to this branch will trigger an automatic build and deployment on Vercel.
- **development** (optional): For testing new features before merging into `main`.

## 2. How to Push Changes
When you want to update the website, follow these steps in your terminal:

```bash
# 1. Add changes
git add .

# 2. Commit changes
git commit -m "Description of your changes"

# 3. Push to main
git push origin main
```

## 3. Vercel Integration
- **Framework**: Astro (Automatically detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Deployment**: Automatic upon pushing to the `main` branch.

## 4. Important Notes
- **Do not push the `dist` folder**: Vercel handles the build process automatically.
- **Branch Name**: We have transitioned from `master` to `main`. Please ensure you use `git push origin main` moving forward.
- **Vercel Adapter**: The `@astrojs/vercel` adapter is installed to optimize image loading and enable Vercel Analytics.
