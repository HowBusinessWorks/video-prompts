// Server actions and queries for prompts
'use server'

import { supabase } from './supabase'
import type {
  PromptWithTags,
  PromptFilters,
  PromptsResponse,
  Tag,
} from '@/types/database'

const PROMPTS_PER_PAGE = 12

/**
 * Fetch prompts with filters and pagination
 */
export async function getPrompts(
  filters: PromptFilters = {},
  page: number = 1
): Promise<PromptsResponse> {
  try {
    console.log('[Server] Starting getPrompts with filters:', filters)

    let query = supabase
      .from('prompts')
      .select(
        `
        *,
        prompt_tags (
          tag_id,
          tags (
            id,
            name,
            slug,
            type,
            color
          )
        )
      `
      )

    // Filter by media type
    if (filters.mediaType) {
      console.log('[Server] Adding media type filter:', filters.mediaType)
      query = query.eq('media_type', filters.mediaType)
    }

    // Note: Filtering by tags through joins is complex in Supabase
    // For now, we'll fetch all prompts and filter on the client side
    // TODO: Implement proper tag filtering with RPC function

    // Search in title and prompt text
    if (filters.search) {
      console.log('[Server] Adding search filter:', filters.search)
      query = query.or(`title.ilike.%${filters.search}%,prompt_text.ilike.%${filters.search}%`)
    }

    // Sorting
    if (filters.sort === 'most_viewed') {
      console.log('[Server] Sorting by views')
      query = query.order('view_count', { ascending: false })
    } else {
      console.log('[Server] Sorting by recent')
      // Default to recent
      query = query.order('created_at', { ascending: false })
    }

    // Pagination
    const from = (page - 1) * PROMPTS_PER_PAGE
    const to = from + PROMPTS_PER_PAGE - 1
    query = query.range(from, to)

    console.log('[Server] Executing query...')
    const { data, error } = await query

    if (error) {
      console.error('[Server] Error fetching prompts:', error)
      return { prompts: [], total: 0, hasMore: false }
    }

    console.log('[Server] Query successful, got', data?.length, 'prompts')

    // Transform data to include tags properly
    let prompts: PromptWithTags[] = (data || []).map((prompt: any) => ({
      ...prompt,
      tags: prompt.prompt_tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
    }))

    // Clean up the nested structure
    prompts.forEach((prompt: any) => {
      delete prompt.prompt_tags
    })

    // Client-side filtering for tags (temporary solution)
    if (filters.modelSlugs && filters.modelSlugs.length > 0) {
      console.log('[Server] Filtering by models:', filters.modelSlugs)
      prompts = prompts.filter(prompt =>
        prompt.tags.some(tag => filters.modelSlugs!.includes(tag.slug))
      )
    }

    if (filters.categorySlugs && filters.categorySlugs.length > 0) {
      console.log('[Server] Filtering by categories:', filters.categorySlugs)
      prompts = prompts.filter(prompt =>
        prompt.tags.some(tag => filters.categorySlugs!.includes(tag.slug))
      )
    }

    console.log('[Server] After filtering, returning', prompts.length, 'prompts')

    const hasMore = prompts.length === PROMPTS_PER_PAGE

    return {
      prompts,
      total: prompts.length,
      hasMore,
    }
  } catch (error) {
    console.error('[Server] Unexpected error fetching prompts:', error)
    return { prompts: [], total: 0, hasMore: false }
  }
}

/**
 * Fetch a single prompt by ID
 */
export async function getPromptById(id: string): Promise<PromptWithTags | null> {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select(
        `
        *,
        prompt_tags (
          tag_id,
          tags (
            id,
            name,
            slug,
            type,
            color
          )
        )
      `
      )
      .eq('id', id)
      .single()

    if (error || !data) {
      console.error('Error fetching prompt:', error)
      return null
    }

    // Transform data
    const prompt: PromptWithTags = {
      ...data,
      tags: data.prompt_tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
    }

    // Clean up
    delete (prompt as any).prompt_tags

    return prompt
  } catch (error) {
    console.error('Unexpected error fetching prompt:', error)
    return null
  }
}

/**
 * Fetch all tags
 */
export async function getTags(): Promise<{ models: Tag[]; categories: Tag[] }> {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })

    if (error || !data) {
      console.error('Error fetching tags:', error)
      return { models: [], categories: [] }
    }

    const models = data.filter((tag) => tag.type === 'model')
    const categories = data.filter((tag) => tag.type === 'category')

    return { models, categories }
  } catch (error) {
    console.error('Unexpected error fetching tags:', error)
    return { models: [], categories: [] }
  }
}

/**
 * Increment view count for a prompt (client-side callable)
 */
export async function incrementPromptView(
  promptId: string,
  sessionId: string
): Promise<boolean> {
  try {
    const { error } = await supabase.rpc('increment_prompt_view_count', {
      prompt_uuid: promptId,
      session_uuid: sessionId,
    })

    if (error) {
      console.error('Error incrementing view count:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Unexpected error incrementing view count:', error)
    return false
  }
}
