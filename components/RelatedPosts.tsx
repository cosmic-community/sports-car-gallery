import Link from 'next/link'
import type { BlogPost } from '@/types'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-16 lg:py-20 section-padding border-t border-carbon-800/50">
      <div className="section-max-width">
        <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-10">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const featuredImage = post.metadata?.featured_image
            const category = post.metadata?.category
            const publishedDate = post.metadata?.published_date

            const formattedDate = publishedDate
              ? new Date(publishedDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : null

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-carbon-900/50 border border-carbon-800/50 hover:border-carbon-700/50 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {featuredImage ? (
                    <img
                      src={`${featuredImage.imgix_url}?w=600&h=340&fit=crop&auto=format,compress&q=80`}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-carbon-800" />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {category && (
                      <span className="text-racing-400 text-xs font-semibold uppercase tracking-wider">
                        {category.title}
                      </span>
                    )}
                    {formattedDate && (
                      <>
                        <span className="text-carbon-700">•</span>
                        <span className="text-carbon-500 text-xs">{formattedDate}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-white font-semibold leading-snug group-hover:text-racing-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}