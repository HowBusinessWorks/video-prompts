# Tools & Services Required

> Complete list of everything needed to build and run the AI Prompts Gallery

## 🛠️ Development Tools (Local Machine)

### Essential

| Tool | Purpose | Cost | Download |
|------|---------|------|----------|
| **Node.js** (v20+) | JavaScript runtime | Free | [nodejs.org](https://nodejs.org/) |
| **pnpm** (v8+) | Package manager (faster than npm) | Free | `npm install -g pnpm` |
| **Git** | Version control | Free | [git-scm.com](https://git-scm.com/) |
| **VS Code** | Code editor | Free | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Claude Code** | AI coding assistant | Free trial, then paid | [claude.ai/code](https://claude.ai/code) |

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript + JavaScript Language Features
- ES7+ React/Redux/React-Native snippets

---

## ☁️ Cloud Services & Hosting

### Required Services

| Service | Purpose | Free Tier | Pricing After Free Tier |
|---------|---------|-----------|------------------------|
| **Supabase** | Database + Storage + APIs | Yes (500MB DB, 1GB storage, 50K users) | ~$25/mo (Pro plan) |
| **Vercel** | Hosting + Deployment + CDN | Yes (100GB bandwidth, unlimited projects) | ~$20/mo (Pro plan) |
| **GitHub** | Code repository + Version control | Yes (unlimited public/private repos) | Free for personal use |
| **Tally** | Contribution form (external) | Yes (unlimited forms, 100 responses/mo) | ~$29/mo (Pro: unlimited responses) |

### Total Monthly Cost

| Scenario | Cost |
|----------|------|
| **Starting (Free Tier)** | $0/month |
| **Growing (1K-10K visitors)** | $0-$25/month |
| **Established (10K+ visitors)** | $45-$70/month |

---

## 📦 Core Dependencies (npm packages)

### Framework & Core

```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.0.0"
}
```

### Supabase Client

```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@supabase/ssr": "^0.1.0"
}
```

### UI & Styling

```json
{
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-select": "^2.0.0",
  "lucide-react": "^0.300.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

### Form Handling & Validation

```json
{
  "zod": "^3.22.4",
  "react-hook-form": "^7.49.3"
}
```

### Utilities

```json
{
  "date-fns": "^3.0.0",
  "sharp": "^0.33.0"
}
```

### Development Tools

```json
{
  "eslint": "^8.56.0",
  "eslint-config-next": "^15.0.0",
  "prettier": "^3.1.1",
  "@types/node": "^20.10.6",
  "@types/react": "^18.2.46",
  "@types/react-dom": "^18.2.18"
}
```

**Total Initial Install Size**: ~500MB (node_modules)

---

## 🔧 Setup Requirements

### 1. Supabase

**What you need:**
- ✅ Supabase account (free)
- ✅ New project created
- ✅ Project URL
- ✅ Anon/Public API key
- ✅ Service Role key (for admin operations)

**Setup Steps:**
1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Create new project
4. Wait ~2 minutes for project setup
5. Go to Settings → API to get keys

**What you'll configure:**
- Database tables (SQL migrations)
- Storage buckets (prompt-media)
- Row Level Security policies
- Database indexes

**Free Tier Limits:**
- 500MB database storage
- 1GB file storage
- 50,000 monthly active users
- 2GB bandwidth
- Unlimited API requests

---

### 2. Vercel

**What you need:**
- ✅ Vercel account (free)
- ✅ GitHub account linked
- ✅ Domain name (optional, Vercel provides free subdomain)

**Setup Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your GitHub repository
4. Configure environment variables
5. Deploy (automatic)

**What you'll get:**
- Automatic deployments on git push
- Preview deployments for PRs
- Free SSL certificate
- Global CDN
- Analytics dashboard
- Free subdomain: `yourapp.vercel.app`

**Free Tier Limits:**
- 100GB bandwidth/month
- Unlimited projects
- Unlimited deployments
- 6,000 build minutes/month
- 100GB-hrs serverless function execution

---

### 3. GitHub

**What you need:**
- ✅ GitHub account (free)
- ✅ Repository for your code

**Setup Steps:**
1. Create account at [github.com](https://github.com)
2. Create new repository (public or private)
3. Push your code

**What you'll use:**
- Version control
- Collaboration
- CI/CD triggers (via Vercel)
- Issue tracking (optional)

**Free Tier:**
- Unlimited public/private repositories
- Unlimited collaborators
- 2,000 GitHub Actions minutes/month
- 500MB package storage

---

### 4. Tally Forms

**What you need:**
- ✅ Tally account (free)
- ✅ Contribution form created
- ✅ Form URL to embed/link

**Setup Steps:**
1. Go to [tally.so](https://tally.so)
2. Sign up
3. Create new form
4. Add fields:
   - Prompt text (long text)
   - Image/Video URL or upload
   - Source name
   - Source URL
   - Tags (multi-select)
5. Copy form link

**What you'll get:**
- Form link: `https://tally.so/r/your-form-id`
- Email notifications for submissions
- Response dashboard
- Export to CSV/Excel

**Free Tier Limits:**
- Unlimited forms
- 100 responses/month
- Basic integrations
- Email notifications

---

## 🔐 Environment Variables Needed

Create `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx... (optional, for admin tasks)

# Tally Form
NEXT_PUBLIC_TALLY_FORM_URL=https://tally.so/r/your-form-id

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxx
```

---

## 📊 Optional Services (Nice to Have)

### Analytics

| Service | Purpose | Free Tier | Cost |
|---------|---------|-----------|------|
| **Vercel Analytics** | Page views, performance | 2,500 events/month | $10/mo for more |
| **Google Analytics** | Detailed traffic analytics | Unlimited | Free |
| **Plausible** | Privacy-friendly analytics | No free tier | $9/mo |

### Error Tracking

| Service | Purpose | Free Tier | Cost |
|---------|---------|-----------|------|
| **Sentry** | Error monitoring | 5K errors/month | $26/mo |
| **LogRocket** | Session replay + errors | 1K sessions/month | $99/mo |

### Image Optimization (Additional)

| Service | Purpose | Free Tier | Cost |
|---------|---------|-----------|------|
| **Cloudinary** | Image CDN + transforms | 25GB storage, 25GB bandwidth | $89/mo |
| **Imgix** | Real-time image processing | No free tier | $10/mo |

**Note**: Next.js + Vercel already handle image optimization well, these are optional.

---

## 💻 Hardware Requirements

### Minimum (for development)

- **CPU**: Dual-core processor
- **RAM**: 8GB
- **Storage**: 10GB free space
- **Internet**: Stable connection (for Supabase, Vercel)

### Recommended

- **CPU**: Quad-core processor (faster builds)
- **RAM**: 16GB (smoother development)
- **Storage**: 20GB free space
- **Internet**: 10+ Mbps (for fast deployments)

---

## 📱 Browser Requirements (for testing)

### Desktop Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile Browsers
- iOS Safari
- Chrome Mobile (Android)
- Samsung Internet

### Testing Tools
- Chrome DevTools
- Lighthouse (performance testing)
- Responsive design mode

---

## 🎨 Design & Assets

### Required
- **Existing Template**: Content creator cards (already have)
- **Fonts**: Geist Sans & Geist Mono (included with Next.js)

### Optional (for content)
- Stock images for placeholder prompts
- Logo/favicon (can use text logo initially)
- Open Graph image for social sharing

---

## 📝 Accounts Checklist

Before starting, create accounts for:

- [ ] **Supabase** - Database & storage
- [ ] **Vercel** - Hosting & deployment
- [ ] **GitHub** - Code repository
- [ ] **Tally** - Contribution forms
- [ ] **Claude Code** (if using AI assistance)
- [ ] **Domain Registrar** (optional, for custom domain)
  - Namecheap, Google Domains, Cloudflare, etc.

---

## 💰 Cost Summary

### Initial Setup (One-time)
- All services: **$0** (free tiers)
- Domain (optional): **$10-15/year**

### Monthly Costs

| Traffic Level | Estimated Monthly Cost | Services Needed |
|---------------|------------------------|-----------------|
| **0-5K visitors** | $0 | All free tiers |
| **5K-20K visitors** | $0-$25 | Free tier + Supabase upgrade |
| **20K-50K visitors** | $45-$70 | Supabase Pro + Vercel Pro |
| **50K-100K visitors** | $100-$150 | Higher tier plans |

### Claude Code (Development Tool)
- **Free trial**: Limited usage
- **Pro plan**: ~$20/month
- **Team plan**: ~$30/month
- Only needed during development, not for running the app

---

## 🚀 Quick Start Cost Calculator

**Absolute Minimum (to start)**:
- Free Supabase account: $0
- Free Vercel account: $0
- Free GitHub account: $0
- Free Tally account: $0
- Free VS Code + Node.js: $0

**Total to start**: **$0** ✨

**When you need to upgrade**:
- Supabase: When you exceed 500MB DB or 2GB bandwidth
- Vercel: When you exceed 100GB bandwidth (unlikely at first)
- Tally: When you get 100+ contributions/month

---

## 🔗 Quick Links

### Sign Up Links
- Supabase: https://supabase.com
- Vercel: https://vercel.com
- GitHub: https://github.com
- Tally: https://tally.so
- Claude Code: https://claude.ai/code

### Documentation
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com

### Support
- Next.js Discord: https://nextjs.org/discord
- Supabase Discord: https://supabase.com/discord
- Vercel Discord: https://vercel.com/discord

---

## ✅ Pre-Development Checklist

Before starting development, make sure you have:

### Accounts Created
- [ ] Supabase account + project created
- [ ] Vercel account + GitHub linked
- [ ] GitHub account + repository created
- [ ] Tally account + form created (can do later)

### Local Environment
- [ ] Node.js installed (v20+)
- [ ] pnpm installed
- [ ] Git installed
- [ ] VS Code installed
- [ ] Claude Code set up (optional but recommended)

### Configuration
- [ ] Supabase project URL copied
- [ ] Supabase API keys copied
- [ ] `.env.local` file created with keys
- [ ] GitHub repository initialized

### Ready to Start?
If all checkboxes are checked, you're ready to begin development! 🚀

---

**Estimated Setup Time**: 1-2 hours (creating accounts, configuring services)

**Note**: You can start with 100% free tier and only upgrade when your traffic grows. The free tiers are quite generous for a new project.
