"use client"

import { useEffect, useState, useCallback } from 'react'
import { useFilters } from '@/hooks/use-filters'
import { getPrompts, getTags } from '@/lib/prompts'
import type { PromptWithTags, Tag } from '@/types/database'
import PromptCard from './prompt-card'
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
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
          <p className="mt-4 text-lg font-bold">Loading prompts...</p>
        </div>
      ) : prompts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No prompts found. Try adjusting your filters!</p>
          <button
            onClick={filters.clearFilters}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  )
}
