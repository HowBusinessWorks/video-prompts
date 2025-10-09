"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Copy, Eye, ExternalLink, Image as ImageIcon, Video } from "lucide-react"
import Image from "next/image"
import type { PromptWithTags } from "@/types/database"
import { useState, useEffect } from "react"

interface PromptModalProps {
  prompt: PromptWithTags
  isOpen: boolean
  onClose: () => void
}

export default function PromptModal({ prompt, isOpen, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted on client
  if (!mounted) {
    return null
  }

  // Get model and category tags
  const modelTag = prompt.tags.find(tag => tag.type === 'model')
  const categoryTags = prompt.tags.filter(tag => tag.type === 'category')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt_text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white border-2 border-black rounded-lg p-2 hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media Section */}
        <div className="relative w-full h-[400px] bg-gradient-to-br from-purple-500 to-blue-500">
          {prompt.media_url && (
            <Image
              src={prompt.media_url}
              alt={prompt.title}
              fill
              className="object-contain"
              priority
            />
          )}
          {/* Media type badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border-2 border-black rounded-lg px-3 py-2 flex items-center gap-2">
            {prompt.media_type === "video" ? (
              <Video className="h-5 w-5" />
            ) : (
              <ImageIcon className="h-5 w-5" />
            )}
            <span className="text-sm font-bold uppercase">{prompt.media_type}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white">
          {/* Title */}
          <DialogTitle className="sr-only">{prompt.title}</DialogTitle>
          <h2 className="text-3xl font-black mb-4">{prompt.title}</h2>

          {/* Prompt Text */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Prompt</h3>
              <Button
                onClick={handleCopy}
                size="sm"
                className="bg-black hover:bg-black/80 text-white rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="p-4 bg-gray-50 border-2 border-black rounded-lg font-mono text-sm whitespace-pre-wrap">
              {prompt.prompt_text}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {/* Model tag */}
              {modelTag && (
                <span
                  className="inline-block px-3 py-2 text-white text-sm font-bold rounded-lg border-2 border-black"
                  style={{ backgroundColor: modelTag.color }}
                >
                  {modelTag.name}
                </span>
              )}
              {/* Category tags */}
              {categoryTags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block px-3 py-2 text-white text-sm font-bold rounded-lg border-2 border-black"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Source and Stats */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
            {/* Source */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Created by</p>
              <a
                href={prompt.source_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold hover:underline flex items-center gap-2"
              >
                {prompt.source_name || 'Anonymous'}
                {prompt.source_url && <ExternalLink className="h-4 w-4" />}
              </a>
            </div>

            {/* View count */}
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Views</p>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span className="text-lg font-bold">{prompt.view_count.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
