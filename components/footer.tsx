import Link from 'next/link'
import { Heart, Github } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t-4 border-black bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">AI Prompts Gallery</h3>
            <p className="text-sm text-gray-600">
              Discover and explore curated AI prompts for image and video generation.
              Find inspiration for your next creative project.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                  Browse Prompts
                </Link>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_TALLY_FORM_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-lg mb-3">Info</h3>
            <p className="text-sm text-gray-600 mb-3">
              All prompts are curated and properly attributed to their original creators.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Github className="h-4 w-4" />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t-2 border-black flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} AI Prompts Gallery. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for the AI community</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
