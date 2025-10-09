import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import PromptCard from "@/components/prompt-card"
import SearchBar from "@/components/search-bar"
import FilterSystem from "@/components/filter-system"
import SortDropdown from "@/components/sort-dropdown"
import { getPrompts } from "@/lib/prompts"
import { Suspense } from "react"

export default async function HomePage() {
  // Fetch prompts from Supabase
  const { prompts } = await getPrompts()

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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            Discover Amazing AI Prompts
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Browse thousands of curated prompts for image and video generation
          </p>
        </div>

        {/* Search, Filter, and Sort Section */}
        <Suspense fallback={<div className="mb-8 h-32" />}>
          <div className="mb-8 space-y-4">
            <SearchBar />

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <FilterSystem />
              <SortDropdown />
            </div>
          </div>
        </Suspense>

        {/* Prompt Cards Grid */}
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No prompts found. Add some in Supabase!</p>
          </div>
        )}
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
