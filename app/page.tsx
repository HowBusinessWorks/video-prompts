import PromptGallery from "@/components/prompt-gallery"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
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
