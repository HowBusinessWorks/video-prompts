"use client"

import { Button } from "@/components/ui/button"
import { Filter, Image, Video } from "lucide-react"
import type { MediaType } from "@/types/database"

interface FilterSystemProps {
  mediaType: MediaType | null
  selectedModels: string[]
  selectedCategories: string[]
  onMediaTypeChange: (type: MediaType | null) => void
  onToggleModel: (model: string) => void
  onToggleCategory: (category: string) => void
}

export default function FilterSystem({
  mediaType,
  selectedModels,
  onMediaTypeChange,
  onToggleModel,
}: FilterSystemProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-2 text-sm font-bold">
        <Filter className="h-4 w-4" />
        <span>Filter:</span>
      </div>

      {/* Media Type Filters */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onMediaTypeChange(mediaType === "image" ? null : "image")}
        className={`rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all ${
          mediaType === "image" ? "bg-blue-500 text-white" : ""
        }`}
      >
        <Image className="h-4 w-4 mr-1" />
        Image
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onMediaTypeChange(mediaType === "video" ? null : "video")}
        className={`rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all ${
          mediaType === "video" ? "bg-purple-500 text-white" : ""
        }`}
      >
        <Video className="h-4 w-4 mr-1" />
        Video
      </Button>

      {/* Model Filters */}
      <div className="h-6 w-px bg-gray-300 mx-2" />

      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleModel("midjourney")}
        className={`rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all ${
          selectedModels.includes("midjourney") ? "bg-black text-white" : ""
        }`}
      >
        Midjourney
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleModel("sora")}
        className={`rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all ${
          selectedModels.includes("sora") ? "bg-black text-white" : ""
        }`}
      >
        Sora
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleModel("dall-e")}
        className={`rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all ${
          selectedModels.includes("dall-e") ? "bg-black text-white" : ""
        }`}
      >
        DALL-E
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleModel("veo")}
        className={`rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all ${
          selectedModels.includes("veo") ? "bg-black text-white" : ""
        }`}
      >
        Veo
      </Button>
    </div>
  )
}
