'use client'

import type { Photo } from '@/types'

interface PhotoCardProps {
  photo: Photo
  index: number
}

export default function PhotoCard({ photo, index }: PhotoCardProps) {
  const imageUrl = photo.metadata?.image?.imgix_url
  const description = photo.metadata?.description
  const camera = photo.metadata?.camera
  const location = photo.metadata?.location

  const handleClick = () => {
    // Dispatch custom event to open lightbox
    const event = new CustomEvent('open-lightbox', { detail: { index } })
    window.dispatchEvent(event)
  }

  if (!imageUrl) return null

  return (
    <div className="break-inside-avoid group cursor-pointer" onClick={handleClick}>
      <div className="relative overflow-hidden rounded-xl bg-carbon-900">
        <img
          src={`${imageUrl}?w=800&h=0&fit=max&auto=format,compress&q=80`}
          alt={photo.title}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <h3 className="text-white font-semibold text-lg leading-tight mb-1">
            {photo.title}
          </h3>
          {description && (
            <p className="text-carbon-300 text-sm line-clamp-2 mb-2">
              {description}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-carbon-400">
            {camera && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {camera}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            )}
          </div>
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-racing-500/30 transition-all duration-300" />
      </div>
    </div>
  )
}