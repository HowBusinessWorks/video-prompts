# AI Prompts Database - Project Overview

> A curated gallery for discovering high-quality AI image/video generation prompts

## 🚀 Key Simplifications

This is a **streamlined, public gallery** - much simpler than a full social platform:

- ✅ **No User Authentication**: Completely open access, no login/signup
- ✅ **No User-Generated Content**: Admin curates all prompts via Supabase dashboard
- ✅ **Modal Popups**: Details open in popups, not separate pages
- ✅ **Reused Design Components**: Leverages existing neobrutalist card design
- ✅ **External Contributions**: Uses Tally form (no custom upload system)
- ✅ **Simple Tracking**: Anonymous view counts only

### 📊 Estimated Timeline

**Total Development Time**: ~60-80 hours
- **With Claude Code assistance**: 2-3 weeks at 4 hours/day
- **Manual coding**: 4-6 weeks at 4 hours/day

**Daily Schedule (4 hours/day)**:
- Week 1 (5 days): Setup + Core Gallery
- Week 2 (5 days): Search/Filter + Tracking
- Week 3 (3-5 days): Polish + Deployment

**Note**: Timeline assumes Claude Code handles ~60-70% of code generation, with your focus on:
- Reviewing generated code
- Making design decisions
- Testing features
- Database setup and content curation

---

## 🎯 What We're Building

A **public, open-access web gallery** where visitors can:
- **Browse** curated AI prompts for image/video generation
- **Search & Filter** by AI model, tags, and content type
- **View Details** in a modal popup (no page redirects)
- **Sort** by "New", "Most Viewed", "Trending"
- **Track Views** to understand popular prompts
- **Contribute** prompts via external form (Tally)

**Think of it as**: A curated gallery like Dribbble/Awwwards but for AI prompts - simple browsing, no login required, admin-curated content with proper attribution.

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** (React framework with App Router)
- **TypeScript** (type safety)
- **Tailwind CSS** (styling with neobrutalist design)
- **shadcn/ui** (pre-built UI components)

### Backend
- **Supabase** (PostgreSQL database + Storage)
  - Database for prompts, tags, view counts
  - File storage for images/videos
  - **No authentication needed** (public access)

### Deployment
- **Vercel** (hosting & CI/CD)
- **GitHub** (version control)

---

## 📊 How It Works

### Simple Architecture

```
┌─────────────┐
│   Browser   │ ← Visitor browses (no login)
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Next.js App       │
│   (Vercel hosted)   │
│                     │
│  - Browse Page      │
│  - Modal Popups     │
│  - Search/Filter    │
│  - View Tracking    │
└──────┬──────────────┘
       │
       ├──────────────┐
       ▼              ▼
┌──────────┐   ┌──────────┐
│ Supabase │   │ Supabase │
│ Database │   │ Storage  │
│          │   │          │
│ Prompts, │   │ Images,  │
│ Tags,    │   │ Videos   │
│ Views    │   │          │
└──────────┘   └──────────┘
```

### Data Flow Example

1. **Visitor lands on homepage**
   - Next.js Server Component fetches prompts from Supabase
   - Displays grid of prompt cards (neobrutalist design)
   - Shows search bar and filter options

2. **Visitor clicks a prompt card**
   - Modal popup opens (no page redirect)
   - Shows full prompt, image/video, tags, source attribution
   - View count increments in database

3. **Visitor uses search/filter**
   - Types in search bar or selects tag filter
   - Page updates with filtered results (no reload)
   - URL updates for shareable filtered views

4. **Visitor clicks "Contribute"**
   - Redirects to external Tally form
   - Submissions reviewed manually by admin
   - Admin adds approved prompts via Supabase dashboard

---

## 🗃 Database Structure (Simplified)

### Core Tables

```
prompts (main table)
├── id, title, prompt_text
├── thumbnail_url (image/video preview)
├── media_url (full image/video)
├── media_type (image/video)
├── source_name (original creator)
├── source_url (link to source)
├── view_count (tracked automatically)
├── is_featured
└── created_at

tags (AI models, styles, categories)
├── id, name, slug
├── type (model/category/style)
└── color (for badge display)

prompt_tags (many-to-many)
├── prompt_id → prompts
├── tag_id → tags
└── created_at

prompt_views (for tracking)
├── id
├── prompt_id → prompts
├── viewed_at
└── session_id (anonymous tracking)
```

### How Tables Connect

- **Prompts** have multiple **Tags** (via `prompt_tags`)
- **Tags** can be: AI models (Midjourney, DALL-E), categories (Portrait, Landscape), or styles (Cinematic, Abstract)
- **View tracking** increments `view_count` on prompts
- **No users, auth, or comments** - just prompts and tags

---

## 🎨 Key Features

### 1. Browse Gallery (Main Page)
- **Grid of prompt cards** (neobrutalist design from existing template)
- Each card shows:
  - Thumbnail image/video preview
  - Prompt title/snippet
  - Tags (AI model, category, style badges)
  - View count
- **Responsive layout**: Mobile-friendly grid
- **Infinite scroll or pagination**

### 2. Prompt Cards (Reused from Template)
- Large, bold cards with 4px black borders
- Box shadows: `8px 8px 0px 0px rgba(0,0,0,1)`
- Rounded corners (`rounded-xl`)
- Gradient backgrounds for thumbnails
- Interactive hover states

### 3. Modal Popup (Click to View Details)
- Opens on card click (no page navigation)
- Displays:
  - **Full prompt text** (copyable)
  - **Full-size image/video**
  - **All tags** (clickable to filter)
  - **Source attribution** (name + link)
  - **View count**
  - **Additional info** (parameters, tips)
- Close button or click outside to dismiss
- Keyboard navigation (ESC to close)

### 4. Search Bar
- **Global search** across prompt titles and text
- Real-time filtering as you type
- Search suggestions (optional)
- Clear button to reset

### 5. Filter System
- **Filter by tags**:
  - AI Model (Midjourney, DALL-E, Stable Diffusion, etc.)
  - Category (Portrait, Landscape, Abstract, etc.)
  - Content Type (Image/Video)
- **Multi-select**: Apply multiple filters
- Active filters shown as removable chips
- Filter panel (sidebar on desktop, dropdown on mobile)

### 6. Sorting Options
- **"New"**: Recently added prompts (default)
- **"Most Viewed"**: Highest view counts
- **"Trending"**: Most views in last 7 days
- Dropdown selector in header

### 7. View Tracking
- **Anonymous tracking** (no login required)
- Increment view count when:
  - Modal opens
  - After 2 seconds viewing
- Uses session ID to prevent spam
- Displays view count on cards

### 8. Contribute Button
- **Fixed button** in header or floating
- Redirects to **Tally form** (external)
- Form includes:
  - Prompt text
  - Image/video upload or URL
  - Source/creator info
  - Tags selection
- Submissions processed manually by admin

---

## 🚀 Development Plan

### Detailed Time Breakdown (with Claude Code)

**Assumption**: 4 hours/day, 5 days/week

### Phase 1: Foundation & Setup
**Duration**: 2-3 days (8-12 hours)

| Task | Time | With Claude Code |
|------|------|------------------|
| Supabase project setup + schema | 2h | Claude generates SQL migrations |
| Next.js project config | 1h | Claude creates config files |
| Design system setup | 2h | Reuse existing template |
| Base layout + header/footer | 2h | Claude generates components |
| Environment + deployment | 1h | Claude provides setup guide |

**Deliverable**: Working app skeleton with database

### Phase 2: Core Gallery
**Duration**: 4-5 days (16-20 hours)

| Task | Time | With Claude Code |
|------|------|------------------|
| Prompt card component | 2h | Adapt from existing template |
| Grid layout + responsive | 2h | Claude generates layout code |
| Data fetching from Supabase | 2h | Claude writes server components |
| Modal popup component | 3h | Claude generates modal logic |
| Copy button functionality | 1h | Simple implementation |
| Image optimization setup | 2h | Claude configures Next.js Image |
| View tracking backend | 3h | Claude writes tracking logic |
| View tracking frontend | 2h | Claude adds increment triggers |

**Deliverable**: Browsable gallery with working modals

### Phase 3: Search & Filter
**Duration**: 3-4 days (12-16 hours)

| Task | Time | With Claude Code |
|------|------|------------------|
| Search bar component | 2h | Claude generates search UI |
| Search API/query logic | 2h | Claude writes SQL queries |
| Filter panel UI | 3h | Claude creates filter components |
| Tag filtering logic | 2h | Claude implements filter state |
| Multi-select functionality | 2h | Claude handles complex state |
| URL state management | 2h | Claude syncs URL params |
| Active filter chips | 1h | Simple UI component |

**Deliverable**: Full search and filtering system

### Phase 4: Sorting & Advanced Features
**Duration**: 2-3 days (8-12 hours)

| Task | Time | With Claude Code |
|------|------|------------------|
| Sort dropdown UI | 1h | Simple component |
| Sort query logic | 2h | Claude writes SQL ORDER BY |
| Trending algorithm | 2h | Claude creates SQL function |
| Pagination/infinite scroll | 2h | Claude implements pattern |
| Loading states | 1h | Claude adds skeletons |
| Error boundaries | 1h | Claude creates error handlers |

**Deliverable**: Complete gallery features

### Phase 5: Performance & SEO
**Duration**: 2-3 days (8-12 hours)

| Task | Time | With Claude Code |
|------|------|------------------|
| Image optimization audit | 1h | Manual testing |
| Metadata generation | 2h | Claude writes metadata logic |
| Sitemap.xml generation | 1h | Claude creates sitemap route |
| Structured data (JSON-LD) | 2h | Claude generates schemas |
| Performance testing | 1h | Manual Lighthouse tests |
| Mobile responsive fixes | 2h | Claude helps with CSS |
| Caching setup | 1h | Claude adds cache headers |

**Deliverable**: Optimized, SEO-ready site

### Phase 6: Final Polish & Deploy
**Duration**: 2-3 days (8-12 hours)

| Task | Time | With Claude Code |
|------|------|------------------|
| Contribute button + Tally link | 1h | Simple link/button |
| Cross-browser testing | 2h | Manual testing |
| Bug fixes | 3h | Claude helps debug |
| Content upload (sample prompts) | 2h | Manual via Supabase dashboard |
| Production deployment | 1h | Vercel auto-deploy |
| DNS/domain setup | 1h | Manual configuration |
| Final QA | 2h | Manual testing |

**Deliverable**: Production-ready app

---

### **Total Timeline Summary**

| Scenario | Total Hours | Calendar Time (4h/day) |
|----------|-------------|------------------------|
| **Optimal** | 60 hours | 15 days (3 weeks) |
| **Realistic** | 75 hours | 19 days (3-4 weeks) |
| **With Buffer** | 90 hours | 23 days (4-5 weeks) |

**Recommended Schedule**: Plan for **4 weeks** to have buffer for:
- Learning curve with tools
- Unexpected bugs
- Design iterations
- Testing thoroughness

### Working with Claude Code Efficiently

**What Claude Code handles well** (~70% of coding):
- Component boilerplate
- Database queries and migrations
- Configuration files
- Repetitive patterns (forms, cards, lists)
- TypeScript types
- CSS/Tailwind classes
- SEO metadata templates

**What you focus on** (~30% of time):
- Design decisions
- UX flow refinement
- Database content curation
- Testing and QA
- Performance monitoring
- Deploy configuration
- Bug investigation

---

## 📱 User Experience

### Example Visitor Flow

**First-Time Visitor**:
1. Lands on homepage → Sees grid of curated prompts
2. Scrolls through gallery → Views thumbnails and tags
3. Clicks interesting prompt card → Modal popup opens
4. Reads full prompt → Clicks "Copy" button
5. Sees full image/video → Clicks source link to credit creator
6. Closes modal → Continues browsing
7. Uses search bar → Types "landscape sunset"
8. Filters by "Midjourney" tag → Refined results
9. Sorts by "Trending" → Sees popular prompts
10. Clicks "Contribute" → Redirects to Tally form

**Returning Visitor**:
1. Returns to site → Remembers bookmarked in browser
2. Clicks sort: "New" → Sees latest additions
3. Filters by multiple tags → "Portrait" + "Cinematic"
4. Opens prompt → Views count increments
5. Copies prompt → Uses in their AI tool
6. Shares URL → Sends link to friend with filters applied

---

## 🎨 Design System

### Neobrutalist Style
Our app uses a bold, modern "neobrutalist" design:

- **Bold borders**: 4px black borders on all cards/buttons
- **Box shadows**: `8px 8px 0px 0px rgba(0,0,0,1)`
- **Rounded corners**: `rounded-xl`
- **Vibrant colors**: Category-specific gradients
- **High contrast**: Black text, white backgrounds, colorful accents

### Example Prompt Card

```
┌─────────────────────────────────────────┐
│  ┌─────────────────────────────────┐   │
│  │                                 │   │ ← Thumbnail preview
│  │    [Generated Image/Video]      │   │   (gradient bg)
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Cinematic Portrait Photography         │ ← Title
│                                         │
│  "Professional headshot with..."        │ ← Prompt snippet
│                                         │
│  [Midjourney] [Portrait] [Cinematic]    │ ← Tags (badges)
│                                         │
│  👁️ 1,234 views                        │ ← View count
│                                         │
└─────────────────────────────────────────┘
       ↓ 8px black shadow
       (Reused from content-creator cards)
```

### Modal Popup Design

```
┌───────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐ [X]│
│  │                                      │    │
│  │     [Full Image/Video Preview]       │    │
│  │                                      │    │
│  └──────────────────────────────────────┘    │
│                                               │
│  Cinematic Portrait Photography               │
│                                               │
│  "Professional headshot with natural light,   │
│   50mm lens, shallow depth of field..."       │
│  [Copy Button]                                │
│                                               │
│  Tags: [Midjourney V6] [Portrait] [Cinematic]│
│                                               │
│  Source: @photographer_name [→ Link]          │
│                                               │
│  👁️ 1,234 views                              │
│                                               │
│  Additional Info:                             │
│  • Aspect Ratio: 2:3                          │
│  • Quality: High                              │
│  • Style: Raw                                 │
└───────────────────────────────────────────────┘
```

---

## 🔒 Security & Performance

### Security
- **Public read-only**: No authentication required
- **Admin-only writes**: Prompts added via Supabase dashboard
- **Rate limiting**: Prevent view count spam
- **CORS protection**: API endpoints secured
- **Content validation**: Manual review of contributions

### ⚡ Performance Optimization

**Critical for Fast Loading**:

1. **Image Optimization**
   - Next.js Image component with automatic WebP conversion
   - Lazy loading for below-fold images
   - Blur placeholders while loading
   - Responsive images (multiple sizes)
   - CDN delivery via Vercel Edge

2. **Database Efficiency**
   - Indexed columns: `created_at`, `view_count`, `media_type`
   - Full-text search index on prompts
   - Efficient queries with proper JOINs
   - Connection pooling (Supabase handles this)
   - Denormalized `view_count` (no aggregate queries)

3. **Rendering Strategy**
   - Server Components for static content
   - Client Components only for interactivity (modal, filters)
   - Streaming with Suspense boundaries
   - Incremental Static Regeneration (ISR) for prompts

4. **Caching Layers**
   - Next.js cache: 1 hour for prompt list
   - CDN cache: Static assets at edge
   - Browser cache: Images, fonts, JS bundles
   - Stale-while-revalidate for instant loading

5. **Code Optimization**
   - Code splitting by route
   - Dynamic imports for modal/heavy components
   - Tree-shaking unused code
   - Minified production builds

**Performance Targets**:
- ⚡ First Contentful Paint: < 1.2s
- ⚡ Time to Interactive: < 2s
- ⚡ Lighthouse Score: 95+ (Performance)
- ⚡ Total Bundle Size: < 150KB (initial)
- ⚡ Database Query Time: < 100ms
- 📱 Mobile-friendly: Full responsive design
- ♿ Accessible: WCAG 2.1 AA compliant

### 🔍 SEO Optimization

**Essential for Discoverability**:

1. **Server-Side Rendering**
   - All pages pre-rendered on server
   - Full HTML content for crawlers
   - No client-side only rendering

2. **Metadata Strategy**
   - Dynamic `<title>` and `<meta description>` per prompt
   - Open Graph tags for social sharing
   - Twitter Card metadata
   - Canonical URLs

3. **Structured Data**
   - JSON-LD schema for prompts
   - Article/CreativeWork schema
   - BreadcrumbList navigation
   - Organization schema

4. **Technical SEO**
   - Auto-generated sitemap.xml
   - Robots.txt configuration
   - Semantic HTML (proper heading hierarchy)
   - Clean URL structure (/prompts?filter=midjourney)

5. **Content SEO**
   - Descriptive alt text for all images
   - Proper heading structure (H1, H2, H3)
   - Internal linking (tag filters)
   - Fast page speed (Google ranking factor)

**Example Metadata**:
```html
<title>Cinematic Portrait Photography - AI Prompt Gallery</title>
<meta name="description" content="Professional headshot prompt for Midjourney V6. Creates stunning cinematic portraits with natural lighting." />
<meta property="og:image" content="https://...thumbnail.jpg" />
```

---

## 📈 Success Metrics

### Analytics Metrics
- Total prompts in database
- View counts per prompt
- Popular tags and models
- Search patterns
- Traffic sources
- Contribution submissions

---

## 🚢 Deployment

### How We Deploy

1. **Development**:
   ```bash
   git push origin develop
   ```
   → Vercel creates preview deployment
   → Test in preview environment

2. **Production**:
   ```bash
   git push origin main
   ```
   → Vercel auto-deploys to production
   → Database migrations run automatically
   → Live in minutes

### Environment Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_TALLY_FORM_URL=https://tally.so/r/xxx

# Run development server
pnpm dev
```

---

## 📚 Technical Highlights

### Why Next.js?
- **Server Components**: Better performance, less JavaScript
- **App Router**: Modern routing with layouts
- **Server Actions**: Type-safe API without writing routes
- **Built-in optimization**: Images, fonts, code splitting

### Why Supabase?
- **Simple setup**: Database + Storage in one
- **PostgreSQL**: Powerful queries, full-text search
- **No auth complexity**: Just public read access
- **Easy admin**: Add prompts via dashboard
- **Free tier**: Great for starting, scales as we grow

### Why This Architecture?
- **Simple**: No authentication = less complexity
- **Fast**: Server-first rendering, minimal JavaScript
- **Scalable**: Can handle thousands of concurrent visitors
- **Developer-friendly**: Modern tools, great DX
- **Cost-effective**: Free tiers for development, low cost at scale
- **Reuses existing design**: Leverages template components

---

## 🤝 Team Workflow

### Git Flow
1. Create feature branch: `git checkout -b feature/add-search`
2. Make changes and commit: `git commit -m "Add search functionality"`
3. Push and create PR: `git push origin feature/add-search`
4. Review and merge to `main`
5. Auto-deploy to production ✨

### Development Process
1. **Pick a task** from project board
2. **Create branch** from main
3. **Build feature** with tests
4. **Create PR** with description
5. **Review** by team
6. **Merge** and deploy

---

## 📖 Quick Reference

### Key Folders
```
app/               → Pages and routes
components/        → React components
lib/               → Utilities and Server Actions
types/             → TypeScript types
supabase/          → Database migrations
docs/              → Detailed documentation
```

### Key Commands
```bash
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm lint          # Check code quality
pnpm test          # Run tests
```

### Key URLs (Development)
- App: `http://localhost:3000`
- Supabase Dashboard: `https://app.supabase.com`
- Vercel Dashboard: `https://vercel.com/dashboard`

---

## 🎯 Next Steps

1. **Review this overview** with team
2. **Set up development environment**
3. **Create Supabase project**
4. **Start Phase 1** (Foundation)
5. **Build iteratively** following the development plan

---

## 📞 Questions?

For detailed technical documentation, see:
- [Architecture Details](./docs/01-architecture.md)
- [Database Schema](./docs/02-database-schema.md)
- [Full Documentation](./docs/README.md)

---

**Let's build something amazing! 🚀**
