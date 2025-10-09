// Database types for AI Prompts Gallery
// Generated from Supabase schema

export type MediaType = 'image' | 'video'
export type TagType = 'model' | 'category'

export interface Tag {
  id: string
  name: string
  slug: string
  type: TagType
  color: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Prompt {
  id: string
  title: string
  prompt_text: string
  thumbnail_url?: string
  media_url?: string
  media_type: MediaType
  source_name?: string
  source_url?: string
  view_count: number
  is_featured: boolean
  additional_info?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface PromptTag {
  id: string
  prompt_id: string
  tag_id: string
  created_at: string
}

export interface PromptView {
  id: string
  prompt_id: string
  session_id?: string
  viewed_at: string
}

// Extended types with relations
export interface PromptWithTags extends Prompt {
  tags: Tag[]
}

export interface PromptWithTagsAndViews extends PromptWithTags {
  recent_views?: number
}

// Filter and sort types
export type SortOption = 'recent' | 'most_viewed'

export interface PromptFilters {
  mediaType?: MediaType
  modelSlugs?: string[]
  categorySlugs?: string[]
  search?: string
  sort?: SortOption
}

// API response types
export interface PromptsResponse {
  prompts: PromptWithTags[]
  total: number
  hasMore: boolean
}
