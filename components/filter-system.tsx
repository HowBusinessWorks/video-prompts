"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, Image, Video, ChevronDown } from "lucide-react"
import type { MediaType, Tag } from "@/types/database"

interface FilterSystemProps {
  mediaType: MediaType | null
  selectedModels: string[]
  selectedCategories: string[]
  availableModels: Tag[]
  availableCategories: Tag[]
  onMediaTypeChange: (type: MediaType | null) => void
  onToggleModel: (model: string) => void
  onToggleCategory: (category: string) => void
  onClearAll?: () => void
}

export default function FilterSystem({
  mediaType,
  selectedModels,
  selectedCategories,
  availableModels,
  availableCategories,
  onMediaTypeChange,
  onToggleModel,
  onToggleCategory,
  onClearAll,
}: FilterSystemProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
      <div className="hidden sm:flex items-center gap-2 text-sm font-bold">
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

      {/* Divider */}
      <div className="hidden sm:block h-6 w-px bg-gray-300" />

      {/* AI Model Dropdown */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">AI Model</span>
            <span className="sm:hidden">Model</span>
            {selectedModels.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-black text-white rounded-full text-xs">
                {selectedModels.length}
              </span>
            )}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 max-h-[300px] overflow-y-auto border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white mx-2"
          align="start"
          side="bottom"
          sideOffset={8}
          avoidCollisions={false}
          collisionPadding={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <DropdownMenuLabel className="font-bold">Select AI Models</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-black h-[2px]" />
          {availableModels.map((model) => (
            <DropdownMenuCheckboxItem
              key={model.slug}
              checked={selectedModels.includes(model.slug)}
              onCheckedChange={() => onToggleModel(model.slug)}
              className="font-bold cursor-pointer"
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: model.color }}
              />
              {model.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Category Dropdown */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
          >
            Category
            {selectedCategories.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-black text-white rounded-full text-xs">
                {selectedCategories.length}
              </span>
            )}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 max-h-[300px] overflow-y-auto border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white mx-2"
          align="start"
          side="bottom"
          sideOffset={8}
          avoidCollisions={false}
          collisionPadding={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <DropdownMenuLabel className="font-bold">Select Categories</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-black h-[2px]" />
          {availableCategories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.slug}
              checked={selectedCategories.includes(category.slug)}
              onCheckedChange={() => onToggleCategory(category.slug)}
              className="font-bold cursor-pointer"
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters Button */}
      {(selectedModels.length > 0 || selectedCategories.length > 0 || mediaType) && onClearAll && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="rounded-lg border-2 border-red-500 text-red-500 font-bold hover:bg-red-50 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Clear All</span>
          <span className="sm:hidden">Clear</span>
        </Button>
      )}
    </div>
  )
}
