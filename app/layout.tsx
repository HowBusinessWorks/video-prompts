import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'AI Prompts Gallery - Discover Quality AI Generation Prompts',
    template: '%s | AI Prompts Gallery'
  },
  description: 'Browse and discover curated AI prompts for image and video generation. Find prompts for Midjourney, DALL-E, Stable Diffusion, Sora, Veo, and more.',
  keywords: ['AI prompts', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Sora', 'Veo', 'AI art', 'prompt engineering', 'AI image generation', 'AI video generation'],
  authors: [{ name: 'AI Prompts Gallery' }],
  creator: 'AI Prompts Gallery',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'AI Prompts Gallery - Discover Quality AI Generation Prompts',
    description: 'Browse and discover curated AI prompts for image and video generation. Find prompts for Midjourney, DALL-E, Stable Diffusion, Sora, Veo, and more.',
    siteName: 'AI Prompts Gallery',
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: 'AI Prompts Gallery - Curated AI Generation Prompts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompts Gallery - Discover Quality AI Generation Prompts',
    description: 'Browse and discover curated AI prompts for image and video generation.',
    images: ['/og-image'],
    creator: '@videoprompts',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
