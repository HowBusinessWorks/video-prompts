"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Copy, Eye, ExternalLink, Image as ImageIcon, Video, Share2, Download } from "lucide-react"
import Image from "next/image"
import type { PromptWithTags } from "@/types/database"
import { useState, useEffect, useRef } from "react"
import { incrementPromptView } from "@/lib/prompts"

interface PromptModalProps {
  prompt: PromptWithTags
  isOpen: boolean
  onClose: () => void
}

// Get or create a session ID for view tracking
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

export default function PromptModal({ prompt, isOpen, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [viewTracked, setViewTracked] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const shareMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close share menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShareMenuOpen(false)
      }
    }

    if (shareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [shareMenuOpen])

  // Track view count after 2 seconds of viewing
  useEffect(() => {
    if (!isOpen || viewTracked) return

    const timer = setTimeout(async () => {
      const sessionId = getSessionId()
      const success = await incrementPromptView(prompt.id, sessionId)
      if (success) {
        setViewTracked(true)
      }
    }, 2000) // Wait 2 seconds before tracking

    return () => clearTimeout(timer)
  }, [isOpen, prompt.id, viewTracked])

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'c' && !e.metaKey && !e.ctrlKey) {
        handleCopy()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

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

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = `${window.location.origin}/?prompt=${prompt.id}`
    const text = `Check out this AI prompt: ${prompt.title}`

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        )
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
    setShareMenuOpen(false)
  }

  const handleDownload = async () => {
    if (!prompt.media_url) return

    try {
      const response = await fetch(prompt.media_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${prompt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${prompt.media_type === 'video' ? 'mp4' : 'jpg'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 animate-in fade-in zoom-in-95 duration-300"
        aria-describedby="prompt-description"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white border-2 border-black rounded-lg p-2 hover:bg-gray-100 transition-colors"
          aria-label="Close modal (ESC)"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media Section */}
        <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[400px] bg-gradient-to-br from-purple-500 to-blue-500">
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
        <div className="p-4 sm:p-6 bg-white">
          {/* Title */}
          <DialogTitle className="sr-only">{prompt.title}</DialogTitle>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4" id="prompt-description">{prompt.title}</h2>

          {/* Prompt Text */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold">Prompt</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="bg-black hover:bg-black/80 text-white rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  aria-label="Copy prompt text (C)"
                >
                  <Copy className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
                <Button
                  onClick={handleDownload}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Download className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>
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
