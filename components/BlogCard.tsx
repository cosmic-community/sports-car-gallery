import Link from 'next/link'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const excerpt = post.metadata?.excerpt
  const publishedDate = post.metadata?.published_date
  const readTime = post.metadata?.read_time

  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl bg-carbon-900/50 border border-carbon-800/50 hover:border-carbon-700/50 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress&q=80`}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-carbon-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-carbon-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-3">
          {category && (
            <Link
              href={`/blog/category/${category.slug}`}
              className="text-racing-400 text-xs font-semibold uppercase tracking-wider hover:text-racing-300 transition-colors"
            >
              {category.title}
            </Link>
          )}
          {readTime && (
            <>
              <span className="text-carbon-700">•</span>
              <span className="text-carbon-500 text-xs">{readTime}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-racing-400 transition-colors duration-300">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-carbon-400 text-sm line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
        )}

        {/* Author & Date */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-carbon-800/50">
          {author && (
            <Link href={`/blog/author/${author.slug}`} className="flex items-center gap-2 group/author">
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-carbon-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-carbon-300">
                    {author.title.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-carbon-300 text-xs font-medium group-hover/author:text-white transition-colors">
                {author.title}
              </span>
            </Link>
          )}
          {formattedDate && (
            <span className="text-carbon-600 text-xs ml-auto">{formattedDate}</span>
          )}
        </div>
      </div>
    </article>
  )
}