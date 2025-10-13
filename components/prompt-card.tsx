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

  // Get model and category tags
  const modelTag = prompt.tags.find(tag => tag.type === 'model')
  const categoryTags = prompt.tags.filter(tag => tag.type === 'category')

  return (
    <>
      <Card
        onClick={() => setIsModalOpen(true)}
        className="group border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out h-full flex flex-col animate-in fade-in slide-in-from-bottom-4"
      >
        {/* Thumbnail */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          {prompt.thumbnail_url && (
            <Image
              src={prompt.thumbnail_url}
              alt={prompt.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          )}
          {/* Media type badge */}
          <div className={`absolute top-3 right-3 backdrop-blur-sm border-2 border-black rounded-lg px-2 py-1 flex items-center gap-1 ${
            prompt.media_type === "video"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}>
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
          <h3 className="text-lg font-bold mb-3 line-clamp-2">{prompt.title}</h3>

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
