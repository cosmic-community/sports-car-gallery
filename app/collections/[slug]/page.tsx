// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getCollections } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PhotoCard from '@/components/PhotoCard'
import Lightbox from '@/components/Lightbox'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: `${collection.title} | Sports Car Gallery`,
    description: collection.metadata?.description || `Browse the ${collection.title} collection.`,
  }
}

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const photos = collection.metadata?.photos || []
  const coverImage = collection.metadata?.cover_image

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        {coverImage && (
          <img
            src={`${coverImage.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress&q=80`}
            alt={collection.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <div className="section-max-width">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-carbon-400 hover:text-white transition-colors duration-300 text-sm font-medium mb-6 group"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Collections
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {collection.title}
            </h1>
            {collection.metadata?.description && (
              <p className="text-carbon-300 text-lg md:text-xl max-w-2xl">
                {collection.metadata.description}
              </p>
            )}
            {photos.length > 0 && (
              <p className="text-carbon-500 text-sm mt-4">
                {photos.length} photo{photos.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="py-16 lg:py-20 section-padding">
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
              <p className="text-carbon-500 text-lg">No photos in this collection yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}