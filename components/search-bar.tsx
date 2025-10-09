"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, onChange])

  // Sync with external changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input
        type="text"
        placeholder="Search prompts..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-12 pr-12 py-6 text-lg border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
