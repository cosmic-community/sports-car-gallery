export default function GalleryLoading() {
  return (
    <div className="pt-32 pb-20 section-padding">
      <div className="section-max-width">
        <div className="mb-12">
          <div className="h-4 w-24 bg-carbon-900 rounded mb-3 animate-pulse" />
          <div className="h-12 w-64 bg-carbon-900 rounded mb-4 animate-pulse" />
          <div className="h-5 w-96 bg-carbon-900 rounded animate-pulse" />
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="break-inside-avoid">
              <div
                className="bg-carbon-900 rounded-xl animate-pulse"
                style={{ height: `${250 + (i % 3) * 80}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}