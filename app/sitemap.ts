import { MetadataRoute } from 'next'
import { getPrompts } from '@/lib/prompts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Get all prompts for individual URLs
  const { prompts } = await getPrompts({}, 1)

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Dynamic prompt pages (if you add individual prompt pages later)
  // For now, we'll just include the main page since prompts open in modals
  const promptPages: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${baseUrl}/?prompt=${prompt.id}`,
    lastModified: new Date(prompt.updated_at || prompt.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...promptPages]
}
