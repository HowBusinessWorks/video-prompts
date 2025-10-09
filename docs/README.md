# AI Prompts Database - Project Documentation

> Comprehensive documentation for building a next-generation AI content generation prompts discovery platform

## 📚 Documentation Index

This documentation is organized into focused guides covering every aspect of the project. Read them in order for a complete understanding, or jump to specific topics as needed.

### Getting Started

1. **[Quick Start Guide](./quick-start.md)** ⚡
   - 15-minute setup guide
   - Step-by-step instructions
   - Verify your setup

2. **[Supabase Setup](./supabase-setup.md)**
   - Database migration
   - Storage bucket configuration
   - Environment variables

3. **[Deployment Guide](./deployment-guide.md)**
   - Vercel deployment steps
   - Environment configuration
   - Custom domain setup
   - Monitoring

### Core Documentation

1. **[Requirements](./requirements.md)**
   - Manager specifications
   - Filter and card parameters
   - Data mapping

2. **[Database Schema](./02-database-schema.md)**
   - Complete Supabase schema
   - Table relationships and indexes
   - Row Level Security (RLS) policies
   - Storage bucket configuration
   - Sample queries

3. **[Features Specification](./03-features.md)**
   - Prompt discovery and browsing
   - Search and filtering
   - User features and collections
   - Community interactions
   - Detailed user flows

4. **[Component Architecture](./04-components.md)**
   - Component hierarchy
   - Reusable UI components
   - State management strategy
   - Form handling patterns

5. **[API & Data Fetching](./05-api-data.md)**
   - Server Components vs Client Components
   - Server Actions
   - API routes
   - Caching strategies
   - Real-time subscriptions

6. **[Authentication & Security](./06-auth-security.md)**
   - Supabase Auth setup
   - Protected routes
   - Social login configuration
   - Security best practices
   - Rate limiting

7. **[Performance & SEO](./07-performance-seo.md)**
   - Image/video optimization
   - Code splitting and lazy loading
   - SEO metadata and sitemaps
   - Performance monitoring
   - Bundle optimization

8. **[Development Phases](./08-development-phases.md)**
   - Phase-by-phase implementation plan
   - Task breakdowns with time estimates
   - Dependencies and milestones
   - Success criteria

9. **[Deployment & DevOps](./09-deployment.md)**
   - Vercel deployment configuration
   - Environment variables
   - CI/CD pipeline
   - Database migrations
   - Monitoring and logging

10. **[Testing Strategy](./10-testing.md)**
    - Unit testing approach
    - Integration testing
    - E2E testing with Playwright
    - Testing tools and setup
    - Coverage requirements

## 🎯 Project Overview

### Vision

Build a comprehensive platform where AI enthusiasts, designers, and creators can discover, save, and share high-quality prompts for generating stunning AI images and videos. The platform will support multiple AI models (Midjourney, DALL-E, Stable Diffusion, etc.) and provide an intuitive, engaging user experience.

### Key Features

- **Browse & Discover**: Explore thousands of curated prompts organized by category
- **Advanced Search**: Full-text search with sophisticated filtering options
- **Collections**: Save and organize favorite prompts into custom collections
- **Community**: Like, comment, and rate prompts; follow creators
- **Create & Share**: Submit your own prompts with examples and metadata
- **Multi-Model Support**: Prompts tagged with compatible AI models and parameters

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS with neobrutalist design system
- **UI Components**: Radix UI primitives via shadcn/ui
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Version Control**: GitHub

### Design Philosophy

This project extends the existing **neobrutalist design system** characterized by:
- Bold 4px black borders
- Pronounced box shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
- Rounded corners (`rounded-xl`)
- Vibrant gradient backgrounds
- Glassmorphic effects with backdrop blur
- High contrast and accessibility

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- Supabase account
- Vercel account (for deployment)

### Initial Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Initialize Supabase (if not already done)
npx supabase init

# Run database migrations
npx supabase db push

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see your application.

## 📖 How to Use This Documentation

### For Developers Starting the Project

1. Read **[Architecture](./01-architecture.md)** to understand the project structure
2. Review **[Database Schema](./02-database-schema.md)** and set up Supabase
3. Follow **[Development Phases](./08-development-phases.md)** for implementation order
4. Reference other docs as needed during development

### For Feature Development

1. Check **[Features Specification](./03-features.md)** for requirements
2. Review **[Component Architecture](./04-components.md)** for UI patterns
3. Consult **[API & Data Fetching](./05-api-data.md)** for data layer
4. Follow **[Testing Strategy](./10-testing.md)** to write tests

### For Deployment

1. Complete **[Authentication & Security](./06-auth-security.md)** setup
2. Implement **[Performance & SEO](./07-performance-seo.md)** optimizations
3. Follow **[Deployment & DevOps](./09-deployment.md)** guide
4. Run tests per **[Testing Strategy](./10-testing.md)**

## 🎨 Design System Reference

The existing design system (from `CLAUDE.md`) includes:

### Color Palette
- Primary borders: `border-black` (4px)
- Shadows: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
- Backgrounds: Gradient overlays with glassmorphism
- Category-specific accent colors (defined in constants)

### Components
- All UI components extend shadcn/ui with neobrutalist styling
- Consistent rounded corners (`rounded-xl`)
- Interactive states with shadow transitions
- Mobile-responsive with collapsible navigation

### Typography
- Font: Geist Sans & Geist Mono
- Bold headings with high contrast
- Readable body text with proper hierarchy

## 📊 Project Metrics & Goals

### Performance Targets
- Lighthouse Score: 90+ (all categories)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

### Accessibility Goals
- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader compatibility
- High contrast ratios (4.5:1 minimum)

### Development Timeline
- **Total Estimated Time**: 340 hours (~13 weeks)
- **Phase 1 (Foundation)**: 40 hours
- **Phase 2 (Core Features)**: 80 hours
- **Phase 3 (User Features)**: 50 hours
- **Phase 4 (Search & Discovery)**: 60 hours
- **Phase 5 (Community)**: 50 hours
- **Phase 6 (Polish)**: 60 hours

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 📝 Contributing

See each documentation file for specific guidelines on:
- Code organization and patterns
- Component development standards
- Testing requirements
- Documentation updates

## 📄 License

MIT

---

**Last Updated**: 2025-10-06
**Version**: 1.0.0
**Status**: Planning Phase
