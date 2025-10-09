"use client"

import { Button } from "@/components/ui/button"
import { Filter, Image, Video } from "lucide-react"

export default function FilterSystem() {
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
        className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
      >
        <Image className="h-4 w-4 mr-1" />
        Image
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
      >
        <Video className="h-4 w-4 mr-1" />
        Video
      </Button>

      {/* Model Filters */}
      <div className="h-6 w-px bg-gray-300 mx-2" />

      <Button
        variant="outline"
        size="sm"
        className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
      >
        Midjourney
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
      >
        Sora
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
      >
        DALL-E
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
      >
        Veo
      </Button>
    </div>
  )
}
