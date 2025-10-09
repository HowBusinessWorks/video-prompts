import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import PromptGallery from "@/components/prompt-gallery"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="border-b-4 border-black bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">videoprompts</h1>
            </div>

            {/* Contribute Button */}
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black rounded-xl border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
              Contribute Prompt
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
          </div>
        }>
          <PromptGallery />
        </Suspense>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white/90 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2025 videoprompts. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
