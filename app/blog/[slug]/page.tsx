// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getAllBlogPosts, getRelatedPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RelatedPosts from '@/components/RelatedPosts'
import TagBadge from '@/components/TagBadge'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Article Not Found' }
  }

  return {
    title: `${post.title} | Sports Car Gallery Blog`,
    description: post.metadata?.excerpt || `Read ${post.title} on the Sports Car Gallery blog.`,
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const category = post.metadata?.category
  const tags = post.metadata?.tags || []
  const content = post.metadata?.content || ''
  const featuredImage = post.metadata?.featured_image
  const publishedDate = post.metadata?.published_date
  const readTime = post.metadata?.read_time

  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const relatedPosts = await getRelatedPosts(slug, category?.id)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 section-padding">
        <div className="section-max-width max-w-4xl">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-carbon-400 hover:text-white transition-colors duration-300 text-sm font-medium mb-8 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>

          {/* Category & Meta */}
          <div className="flex items-center gap-3 mb-4">
            {category && (
              <Link
                href={`/blog/category/${category.slug}`}
                className="text-racing-400 text-sm font-semibold uppercase tracking-wider hover:text-racing-300 transition-colors"
              >
                {category.title}
              </Link>
            )}
            {readTime && (
              <>
                <span className="text-carbon-700">•</span>
                <span className="text-carbon-500 text-sm">{readTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4">
            {author && (
              <Link href={`/blog/author/${author.slug}`} className="flex items-center gap-3 group/author">
                {author.metadata?.avatar ? (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-carbon-700 flex items-center justify-center">
                    <span className="text-sm font-bold text-carbon-300">
                      {author.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white text-sm font-medium group-hover/author:text-racing-400 transition-colors">
                    {author.title}
                  </p>
                  {author.metadata?.role && (
                    <p className="text-carbon-500 text-xs">{author.metadata.role}</p>
                  )}
                </div>
              </Link>
            )}
            {formattedDate && (
              <time className="text-carbon-500 text-sm ml-auto">{formattedDate}</time>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage && (
        <section className="pb-12 section-padding">
          <div className="section-max-width max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress&q=85`}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-12 section-padding">
        <div className="section-max-width max-w-4xl">
          <div className="prose-content text-carbon-300 text-lg leading-relaxed space-y-6">
            {content.split('\n').filter(Boolean).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section className="pb-12 section-padding">
          <div className="section-max-width max-w-4xl">
            <div className="flex flex-wrap gap-2 pt-8 border-t border-carbon-800/50">
              {tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} size="md" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Author Bio */}
      {author && (
        <section className="pb-12 section-padding">
          <div className="section-max-width max-w-4xl">
            <div className="p-6 md:p-8 rounded-2xl bg-carbon-900/50 border border-carbon-800/50">
              <Link href={`/blog/author/${author.slug}`} className="flex items-start gap-5 group">
                {author.metadata?.avatar ? (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-carbon-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-carbon-400">
                      {author.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-xs text-carbon-500 uppercase tracking-wider font-semibold mb-1">
                    Written by
                  </p>
                  <p className="text-white font-bold text-lg group-hover:text-racing-400 transition-colors">
                    {author.title}
                  </p>
                  {author.metadata?.role && (
                    <p className="text-racing-500 text-sm mt-0.5">{author.metadata.role}</p>
                  )}
                  {author.metadata?.bio && (
                    <p className="text-carbon-400 text-sm mt-2 leading-relaxed">
                      {author.metadata.bio}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </>
  )
}