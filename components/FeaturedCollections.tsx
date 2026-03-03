import CollectionCard from '@/components/CollectionCard'
import type { Collection } from '@/types'

interface FeaturedCollectionsProps {
  collections: Collection[]
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  if (collections.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection, index) => (
        <CollectionCard key={collection.id} collection={collection} index={index} />
      ))}
    </div>
  )
}