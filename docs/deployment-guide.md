# Deployment Guide

## Prerequisites

- [x] Node.js 18+ installed
- [x] pnpm package manager
- [x] Supabase account
- [x] Vercel account (for deployment)
- [x] Git repository

## Step 1: Environment Setup

### Local Development

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_TALLY_FORM_URL=https://tally.so/r/your-form-id
   ```

3. Get Supabase credentials:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Navigate to **Settings** → **API**
   - Copy **Project URL** and **anon/public** key

### Verify Installation

Run the development server:
```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see your app.

## Step 2: Database Setup

Follow the [Supabase Setup Guide](./supabase-setup.md) to:
1. Create tables and indexes
2. Set up storage bucket
3. Insert sample data

## Step 3: Deploy to Vercel

### Option A: GitHub Integration (Recommended)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Prompts Gallery"
   git remote add origin https://github.com/yourusername/ai-prompts-gallery.git
   git push -u origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com)

3. Click **"Add New Project"**

4. Import your GitHub repository

5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`

6. Add Environment Variables:
   Click **"Environment Variables"** and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   NEXT_PUBLIC_TALLY_FORM_URL = https://tally.so/r/your-form-id
   ```

7. Click **"Deploy"**

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_TALLY_FORM_URL

# Deploy to production
vercel --prod
```

## Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `prompts.yourdomain.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be issued

## Step 5: Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Check that prompts load correctly
3. Test filters and search
4. Verify modal opens properly
5. Test view count increment

### Add Sample Content

1. Go to Supabase dashboard
2. Navigate to **Table Editor** → **prompts**
3. Click **"Insert row"** and add sample prompts
4. Upload images to Storage bucket
5. Link images in prompt records

## Continuous Deployment

Once set up, every push to `main` branch will:
1. Trigger automatic build on Vercel
2. Run build checks
3. Deploy to production (if successful)

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/add-filters

# Make changes and commit
git add .
git commit -m "Add advanced filters"

# Push to GitHub
git push origin feature/add-filters

# Create Pull Request on GitHub
# Vercel will create preview deployment

# After review, merge to main
# Auto-deploys to production
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase anonymous/public key |
| `NEXT_PUBLIC_TALLY_FORM_URL` | ⚠️ Optional | Tally contribution form URL |

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify no TypeScript errors: `pnpm build`
- Check build logs in Vercel dashboard

### Database Connection Issues
- Verify Supabase URL is correct
- Check anon key is valid
- Ensure RLS policies allow public read

### Images Not Loading
- Check storage bucket is public
- Verify image URLs in database
- Test storage policies in Supabase

### 404 Errors
- Ensure Next.js App Router structure is correct
- Check `app/page.tsx` exists
- Verify no conflicting routes

## Performance Optimization

1. **Enable Edge Functions**: In Vercel settings
2. **Configure Caching**: Add cache headers
3. **Image Optimization**: Use Next.js Image component
4. **Database Indexes**: Ensure all indexes from migration are created

## Monitoring

### Vercel Analytics
Already included via `@vercel/analytics` package.

View metrics:
- Page views
- Load times
- Web Vitals
- Traffic sources

### Supabase Monitoring
- Database usage
- Storage usage
- API requests
- Query performance

## Scaling Considerations

### Free Tier Limits
- **Vercel**: 100GB bandwidth, 100,000 requests
- **Supabase**: 500MB database, 1GB storage

### When to Upgrade
- High traffic (>10k visitors/month)
- Large media files (>1GB storage)
- Complex queries requiring more compute

## Security Checklist

- [x] Environment variables not committed to git
- [x] `.env.local` in `.gitignore`
- [x] RLS policies enabled on all tables
- [x] Storage bucket has public read only
- [x] No admin credentials exposed
- [x] HTTPS enabled (automatic with Vercel)

## Next Steps

✅ Phase 1 Complete!

→ Continue to: [Phase 2 - Core Gallery](./phase-2-core-gallery.md)
