import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Prompts Gallery - Discover Quality AI Generation Prompts',
  description: 'Browse and discover curated AI prompts for image and video generation. Find prompts for Midjourney, DALL-E, Stable Diffusion, Sora, Veo, and more.',
  keywords: ['AI prompts', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Sora', 'Veo', 'AI art', 'prompt engineering'],
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
