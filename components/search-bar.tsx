"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input
        type="text"
        placeholder="Search prompts..."
        className="w-full pl-12 pr-4 py-6 text-lg border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
      />
    </div>
  )
}
