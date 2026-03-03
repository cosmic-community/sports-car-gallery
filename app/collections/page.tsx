import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections | Sports Car Gallery',
  description: 'Browse curated collections of sports car photography.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding">
        <div className="section-max-width">
          <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Curated Sets
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            Collections
          </h1>
          <p className="text-carbon-400 text-lg md:text-xl max-w-2xl">
            Themed galleries showcasing the finest automotive photography, from iconic marques to legendary circuits.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pb-20 lg:pb-28 section-padding">
        <div className="section-max-width">
          {collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((collection, index) => (
                <CollectionCard key={collection.id} collection={collection} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-carbon-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-carbon-500 text-lg">No collections yet.</p>
              <p className="text-carbon-600 text-sm mt-1">Check back soon for curated sets.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}