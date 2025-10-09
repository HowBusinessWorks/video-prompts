"use client"

import { Card } from "@/components/ui/card"
import { Eye, Image as ImageIcon, Video } from "lucide-react"
import Image from "next/image"
import type { PromptWithTags } from "@/types/database"
import { useState } from "react"
import PromptModal from "./prompt-modal"

interface PromptCardProps {
  prompt: PromptWithTags
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Determine gradient color based on media type
  const gradientColor =
    prompt.media_type === "video"
      ? "bg-gradient-to-br from-blue-500 to-purple-500"
      : "bg-gradient-to-br from-green-500 to-teal-500"

  // Get model and category tags
  const modelTag = prompt.tags.find(tag => tag.type === 'model')
  const categoryTags = prompt.tags.filter(tag => tag.type === 'category')

  return (
    <>
      <Card
        onClick={() => setIsModalOpen(true)}
        className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-4px] transition-transform h-full flex flex-col"
      >
        {/* Thumbnail with gradient overlay */}
        <div className={`relative h-48 ${gradientColor}`}>
          {prompt.thumbnail_url && (
            <Image
              src={prompt.thumbnail_url}
              alt={prompt.title}
              fill
              className="object-cover mix-blend-overlay opacity-80"
            />
          )}
          {/* Media type badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border-2 border-black rounded-lg px-2 py-1 flex items-center gap-1">
            {prompt.media_type === "video" ? (
              <Video className="h-4 w-4" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
            <span className="text-xs font-bold uppercase">{prompt.media_type}</span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-4 bg-white flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{prompt.title}</h3>

          {/* Prompt text preview */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{prompt.prompt_text}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {/* Model tag */}
            {modelTag && (
              <span
                className="inline-block px-2 py-1 text-white text-xs font-bold rounded-md"
                style={{ backgroundColor: modelTag.color }}
              >
                {modelTag.name}
              </span>
            )}
            {/* Category tags */}
            {categoryTags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="inline-block px-2 py-1 text-white text-xs font-bold rounded-md"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Footer with source and views */}
          <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t-2 border-gray-200">
            <span className="font-semibold">by {prompt.source_name || 'Anonymous'}</span>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span className="font-bold">{prompt.view_count.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      <PromptModal
        prompt={prompt}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
