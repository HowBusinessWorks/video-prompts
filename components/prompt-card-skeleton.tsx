export default function PromptCardSkeleton() {
  return (
    <div className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="relative h-48 bg-gradient-to-br from-gray-300 to-gray-400" />

      {/* Content section */}
      <div className="p-4 bg-white flex-1 flex flex-col">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />

        {/* Prompt text skeleton */}
        <div className="space-y-2 mb-3 flex-1">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-20 bg-gray-300 rounded-md" />
          <div className="h-6 w-16 bg-gray-300 rounded-md" />
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
