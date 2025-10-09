# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 social media management application called "POSTCRAFT" that allows users to create, schedule, and publish content across multiple social media platforms (Instagram, Twitter, LinkedIn, YouTube). The app features a distinctive "neobrutalist" design style with bold borders, shadows, and glassmorphic effects.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: v19
- **TypeScript**: v5
- **Styling**: Tailwind CSS with custom brutalist design system
- **UI Components**: Radix UI primitives via shadcn/ui
- **Font**: Geist Sans & Geist Mono
- **Package Manager**: pnpm
- **Analytics**: Vercel Analytics

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Architecture

### Application Structure

The app follows Next.js 15 App Router conventions:

- **`/app`**: Main application routes
  - `/app/page.tsx`: Dashboard landing page with content creation and platform management
  - `/app/studio/*`: Specialized content studios (audio, video, image, text)
  - Each studio has its own route under `/studio/{type}/page.tsx`

- **`/components`**: React components
  - `/components/ui`: shadcn/ui components (accordion, button, card, etc.)
  - `/components/studios`: Studio-specific components (audio-studio.tsx, video-studio.tsx, etc.)
  - Top-level components: `content-creator.tsx`, `studio-selector.tsx`, `social-media-card.tsx`, `mobile-navigation.tsx`

- **`/lib`**: Utility functions
  - `utils.ts`: Contains `cn()` helper for className merging

- **`/hooks`**: Custom React hooks
  - `use-toast.ts`: Toast notification hook
  - `use-mobile.tsx`: Mobile responsive hook

### Component Patterns

1. **Design System**: All components use a neobrutalist design with:
   - 4px bold black borders (`border-4 border-black`)
   - Box shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
   - Rounded corners (`rounded-xl`)
   - Gradient backgrounds (`bg-gradient-to-br`)

2. **Responsive Design**: Mobile-first approach with:
   - Collapsible mobile navigation
   - Responsive grid layouts
   - Desktop/mobile conditional rendering (hidden lg:block, lg:hidden)

3. **Content Studios**: Modular studio architecture where each content type (audio, video, image, text) has:
   - A route page in `/app/studio/{type}/page.tsx`
   - Dedicated component in `/components/studios/{type}-studio.tsx`
   - AI-powered features with simulated processing

4. **Content Creator**: Tabbed interface supporting three content types:
   - Post (with filters, hashtags, advanced settings)
   - Story (with stickers, text, music, polls)
   - Video (with thumbnails, titles)

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to the root directory
- Use `@/components`, `@/lib`, `@/hooks` for imports

### shadcn/ui Configuration

Located in `components.json`:
- Style: default
- Base color: neutral
- CSS variables: enabled
- Icon library: lucide-react
- Components installed in `@/components/ui`

## Build Configuration

`next.config.mjs` has the following settings:
- ESLint errors ignored during builds
- TypeScript errors ignored during builds
- Images unoptimized (for static export compatibility)

## Styling

Global styles in `app/globals.css` define the brutalist design system with:
- Custom CSS variables for colors
- Black borders and bold shadows as defaults
- Glassmorphic backgrounds (`backdrop-blur-xl bg-white/30`)

## Key Features to Maintain

1. **Platform Selection**: Users can toggle which social platforms to post to (Instagram, Twitter, LinkedIn, YouTube)
2. **Multi-Content Types**: Support for posts, stories, and videos with type-specific settings
3. **Studio Selector**: Gateway to specialized content creation studios
4. **Mobile Responsiveness**: Full mobile support with collapsible navigation and controls
5. **Neobrutalist Design**: Consistent bold, black borders and shadow styling throughout

## Adding New Features

When adding new components:
- Follow the neobrutalist design pattern (4px borders, box shadows, rounded corners)
- Use shadcn/ui components from `@/components/ui` when possible
- Implement mobile-responsive layouts with Tailwind breakpoints
- Add "use client" directive for components with interactivity
- Use lucide-react for icons
