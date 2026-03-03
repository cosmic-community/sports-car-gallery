import { getPhotos } from '@/lib/cosmic'
import PhotoCard from '@/components/PhotoCard'
import Lightbox from '@/components/Lightbox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | Sports Car Gallery',
  description: 'Browse the full collection of stunning sports car photography.',
}

export default async function GalleryPage() {
  const photos = await getPhotos()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding">
        <div className="section-max-width">
          <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Full Collection
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            Gallery
          </h1>
          <p className="text-carbon-400 text-lg md:text-xl max-w-2xl">
            Explore every shot — from track days to studio shoots. Each image captures the raw beauty and engineering excellence of the world&apos;s finest sports cars.
          </p>
          {photos.length > 0 && (
            <p className="text-carbon-600 text-sm mt-4">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 lg:pb-28 section-padding">
        <div className="section-max-width">
          {photos.length > 0 ? (
            <>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {photos.map((photo, index) => (
                  <PhotoCard key={photo.id} photo={photo} index={index} />
                ))}
              </div>
              <Lightbox photos={photos} />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-carbon-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-carbon-500 text-lg">No photos yet.</p>
              <p className="text-carbon-600 text-sm mt-1">Check back soon for new additions.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}