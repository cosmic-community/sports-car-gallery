import Link from 'next/link'
import type { Photo, About } from '@/types'

interface HeroSectionProps {
  photo: Photo | null
  about: About | null
}

export default function HeroSection({ photo, about }: HeroSectionProps) {
  const imageUrl = photo?.metadata?.image?.imgix_url

  return (
    // Changed: Added negative top margin to pull hero behind the nav, compensating for the
    // pt-16 md:pt-20 added to <main> in layout.tsx. This lets the hero remain full-bleed
    // while all other pages get proper spacing below the fixed nav.
    <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-end overflow-hidden -mt-16 md:-mt-20">
      {/* Background Image */}
      {imageUrl ? (
        <img
          src={`${imageUrl}?w=1920&h=1080&fit=crop&auto=format,compress&q=80`}
          alt={photo?.title || 'Sports Car'}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-950 via-carbon-900 to-racing-900/20" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 gradient-overlay" />
      <div className="absolute inset-0 gradient-overlay-horizontal opacity-60" />

      {/* Content */}
      <div className="relative z-10 section-padding pb-16 md:pb-24 w-full">
        <div className="section-max-width">
          <div className="max-w-3xl">
            <p className="text-racing-400 font-semibold text-sm md:text-base tracking-widest uppercase mb-4 animate-fade-in">
              Automotive Photography
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Sports Car
              <br />
              <span className="text-gradient">Gallery</span>
            </h1>

            {about?.metadata?.tagline && (
              <p
                className="text-carbon-300 text-lg md:text-xl max-w-xl mb-10 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                {about.metadata.tagline}
              </p>
            )}

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 bg-racing-600 hover:bg-racing-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-racing-600/25 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Explore Gallery
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-white/5"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse-slow" />
        </div>
      </div>
    </section>
  )
}