import Script from 'next/script'

interface StructuredDataProps {
  data: Record<string, any>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization schema for the site
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Prompts Gallery',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
    description: 'Browse and discover curated AI prompts for image and video generation.',
    sameAs: [
      // Add your social media URLs here when available
      // 'https://twitter.com/videoprompts',
      // 'https://github.com/yourusername',
    ],
  }

  return <StructuredData data={schema} />
}

// WebSite schema with search action
export function WebSiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Prompts Gallery',
    url: baseUrl,
    description: 'Browse and discover curated AI prompts for image and video generation.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <StructuredData data={schema} />
}

// CollectionPage schema for the gallery
export function CollectionPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Prompts Gallery',
    description: 'Curated collection of AI prompts for image and video generation',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  }

  return <StructuredData data={schema} />
}

// BreadcrumbList schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <StructuredData data={schema} />
}
