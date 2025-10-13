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
          <h1 className="text-xl font-bold leading-none">videoprompts</h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a
            href={process.env.NEXT_PUBLIC_TALLY_FORM_URL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="brutalist-button bg-gradient-to-br from-yellow-300 to-orange-400 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="hidden sm:inline">Contribute Prompt</span>
            <span className="sm:hidden">Contribute</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
