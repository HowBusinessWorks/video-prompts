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
      query = query.eq('media_type', filters.mediaType)
    }

    // Filter by model tags
    if (filters.modelSlugs && filters.modelSlugs.length > 0) {
      query = query.in('prompt_tags.tags.slug', filters.modelSlugs)
    }

    // Filter by category tags
    if (filters.categorySlugs && filters.categorySlugs.length > 0) {
      query = query.in('prompt_tags.tags.slug', filters.categorySlugs)
    }

    // Search in title and prompt text
    if (filters.search) {
      query = query.textSearch('prompt_text', filters.search)
    }

    // Sorting
    if (filters.sort === 'most_viewed') {
      query = query.order('view_count', { ascending: false })
    } else {
      // Default to recent
      query = query.order('created_at', { ascending: false })
    }

    // Pagination
    const from = (page - 1) * PROMPTS_PER_PAGE
    const to = from + PROMPTS_PER_PAGE - 1
    query = query.range(from, to)

    const { data, error } = await query

    if (error) {
      console.error('Error fetching prompts:', error)
      return { prompts: [], total: 0, hasMore: false }
    }

    // Transform data to include tags properly
    const prompts: PromptWithTags[] = (data || []).map((prompt: any) => ({
      ...prompt,
      tags: prompt.prompt_tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
    }))

    // Clean up the nested structure
    prompts.forEach((prompt: any) => {
      delete prompt.prompt_tags
    })

    const hasMore = prompts.length === PROMPTS_PER_PAGE

    return {
      prompts,
      total: prompts.length,
      hasMore,
    }
  } catch (error) {
    console.error('Unexpected error fetching prompts:', error)
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
