"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"

export default function SortDropdown() {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4" />
      <Select defaultValue="recent">
        <SelectTrigger className="w-[180px] border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="border-2 border-black rounded-lg">
          <SelectItem value="recent" className="font-bold">
            Most Recent
          </SelectItem>
          <SelectItem value="views" className="font-bold">
            Most Viewed
          </SelectItem>
          <SelectItem value="trending" className="font-bold">
            Trending
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
