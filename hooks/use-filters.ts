"use client"

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import type { MediaType, SortOption } from '@/types/database'

export function useFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current values from URL
  const search = searchParams.get('search') || ''
  const mediaType = searchParams.get('mediaType') as MediaType | null
  const models = searchParams.get('models')?.split(',').filter(Boolean) || []
  const categories = searchParams.get('categories')?.split(',').filter(Boolean) || []
  const sort = (searchParams.get('sort') as SortOption) || 'recent'

  // Update URL params
  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [searchParams, router, pathname])

  // Individual setters
  const setSearch = useCallback((value: string) => {
    updateParams({ search: value || null })
  }, [updateParams])

  const setMediaType = useCallback((value: MediaType | null) => {
    updateParams({ mediaType: value })
  }, [updateParams])

  const toggleModel = useCallback((model: string) => {
    const newModels = models.includes(model)
      ? models.filter(m => m !== model)
      : [...models, model]
    updateParams({ models: newModels.length ? newModels.join(',') : null })
  }, [models, updateParams])

  const toggleCategory = useCallback((category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category]
    updateParams({ categories: newCategories.length ? newCategories.join(',') : null })
  }, [categories, updateParams])

  const setSort = useCallback((value: SortOption) => {
    updateParams({ sort: value })
  }, [updateParams])

  const clearFilters = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  return {
    // Current values
    search,
    mediaType,
    models,
    categories,
    sort,
    // Setters
    setSearch,
    setMediaType,
    toggleModel,
    toggleCategory,
    setSort,
    clearFilters,
  }
}
