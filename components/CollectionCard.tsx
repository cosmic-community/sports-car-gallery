import Link from 'next/link'
import type { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
  index: number
}

export default function CollectionCard({ collection, index }: CollectionCardProps) {
  const coverImage = collection.metadata?.cover_image
  const description = collection.metadata?.description
  const photoCount = collection.metadata?.photos?.length || 0

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block relative overflow-hidden rounded-2xl bg-carbon-900 aspect-[16/10]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Cover Image */}
      {coverImage && (
        <img
          src={`${coverImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress&q=80`}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/95" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
          {photoCount > 0 && (
            <span className="inline-flex items-center gap-1.5 text-racing-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {photoCount} photo{photoCount !== 1 ? 's' : ''}
            </span>
          )}
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2 leading-tight">
            {collection.title}
          </h3>
          {description && (
            <p className="text-carbon-400 text-sm line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-all duration-300" />
    </Link>
  )
}