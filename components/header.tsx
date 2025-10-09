import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="brutalist-card-sm bg-gradient-to-br from-purple-400 to-pink-400 p-2">
            <Sparkles className="h-6 w-6 text-black" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-none">AI PROMPTS</h1>
            <span className="text-xs text-gray-600">Gallery</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-bold hover:opacity-70 transition-opacity"
          >
            Browse
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_TALLY_FORM_URL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="brutalist-button bg-gradient-to-br from-yellow-300 to-orange-400 px-4 py-2 text-sm"
          >
            Contribute Prompt
          </a>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden brutalist-button bg-gray-100 px-3 py-2">
          Menu
        </button>
      </div>
    </header>
  )
}
