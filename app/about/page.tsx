import { getAbout } from '@/lib/cosmic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Sports Car Gallery',
  description: 'Learn about the photographer behind the Sports Car Gallery.',
}

export default async function AboutPage() {
  const about = await getAbout()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-8 section-padding">
        <div className="section-max-width">
          <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
            The Photographer
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            About
          </h1>
        </div>
      </section>

      {about ? (
        <section className="pb-20 lg:pb-28 section-padding">
          <div className="section-max-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Portrait */}
              <div className="relative group">
                {about.metadata?.portrait ? (
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={`${about.metadata.portrait.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress&q=85`}
                      alt={about.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      width={800}
                      height={1000}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[4/5] bg-carbon-900 rounded-2xl flex items-center justify-center">
                    <svg className="w-24 h-24 text-carbon-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}

                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-racing-600/30 rounded-2xl -z-10" />
              </div>

              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {about.title}
                </h2>

                {about.metadata?.tagline && (
                  <p className="text-racing-500 text-lg font-medium mb-8">
                    {about.metadata.tagline}
                  </p>
                )}

                {about.metadata?.bio && (
                  <div className="text-carbon-300 text-lg leading-relaxed space-y-4">
                    {about.metadata.bio.split('\n').filter(Boolean).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-6 pt-10 border-t border-carbon-800">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">∞</p>
                    <p className="text-carbon-500 text-sm mt-1">Photos Taken</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">🏎️</p>
                    <p className="text-carbon-500 text-sm mt-1">Cars Captured</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">🌍</p>
                    <p className="text-carbon-500 text-sm mt-1">Locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pb-20 section-padding">
          <div className="section-max-width text-center py-20">
            <p className="text-carbon-500 text-lg">About information coming soon.</p>
          </div>
        </section>
      )}
    </>
  )
}