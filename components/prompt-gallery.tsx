"use client"

import { useEffect, useState, useCallback } from 'react'
import { useFilters } from '@/hooks/use-filters'
import { getPrompts, getTags } from '@/lib/prompts'
import type { PromptWithTags, Tag } from '@/types/database'
import PromptCard from './prompt-card'
import PromptCardSkeleton from './prompt-card-skeleton'
import SearchBar from './search-bar'
import FilterSystem from './filter-system'
import SortDropdown from './sort-dropdown'

export default function PromptGallery() {
  const filters = useFilters()
  const [prompts, setPrompts] = useState<PromptWithTags[]>([])
  const [availableModels, setAvailableModels] = useState<Tag[]>([])
  const [availableCategories, setAvailableCategories] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPrompts = useCallback(async () => {
    setLoading(true)
    try {
      console.log('Fetching prompts with filters:', {
        search: filters.search || undefined,
        mediaType: filters.mediaType || undefined,
        modelSlugs: filters.models.length ? filters.models : undefined,
        categorySlugs: filters.categories.length ? filters.categories : undefined,
        sort: filters.sort,
      })
      const result = await getPrompts({
        search: filters.search || undefined,
        mediaType: filters.mediaType || undefined,
        modelSlugs: filters.models.length ? filters.models : undefined,
        categorySlugs: filters.categories.length ? filters.categories : undefined,
        sort: filters.sort,
      })
      console.log('Fetched prompts:', result)
      setPrompts(result.prompts)
    } catch (error) {
      console.error('Error fetching prompts:', error)
    } finally {
      setLoading(false)
    }
  }, [filters.search, filters.mediaType, filters.models.join(','), filters.categories.join(','), filters.sort])

  // Fetch tags on mount
  useEffect(() => {
    const fetchTags = async () => {
      const { models, categories } = await getTags()
      setAvailableModels(models)
      setAvailableCategories(categories)
    }
    fetchTags()
  }, [])

  useEffect(() => {
    fetchPrompts()
  }, [fetchPrompts])

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
          Discover Amazing AI Prompts
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          Browse thousands of curated prompts for image and video generation
        </p>
      </div>

      {/* Search, Filter, and Sort Section */}
      <div className="mb-8 space-y-4">
        <SearchBar value={filters.search} onChange={filters.setSearch} />

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <FilterSystem
            mediaType={filters.mediaType}
            selectedModels={filters.models}
            selectedCategories={filters.categories}
            availableModels={availableModels}
            availableCategories={availableCategories}
            onMediaTypeChange={filters.setMediaType}
            onToggleModel={filters.toggleModel}
            onToggleCategory={filters.toggleCategory}
            onClearAll={filters.clearFilters}
          />
          <SortDropdown value={filters.sort} onChange={filters.setSort} />
        </div>
      </div>

      {/* Prompt Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <PromptCardSkeleton key={i} />
          ))}
        </div>
      ) : prompts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-6xl">🔍</div>
            <h3 className="text-2xl font-black mb-3">No Prompts Found</h3>
            <p className="text-gray-600 mb-6">
              {filters.search
                ? `No results for "${filters.search}". Try different keywords or clear filters.`
                : "Try adjusting your filters or search terms to find what you're looking for."
              }
            </p>
            <button
              onClick={filters.clearFilters}
              className="px-8 py-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </>
  )
}
