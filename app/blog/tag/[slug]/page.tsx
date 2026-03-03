// app/blog/tag/[slug]/page.tsx
import {
  getBlogTagBySlug,
  getBlogTags,
  getBlogPostsByTag,
} from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getBlogTagBySlug(slug)

  if (!tag) {
    return { title: 'Tag Not Found' }
  }

  return {
    title: `#${tag.title} | Blog | Sports Car Gallery`,
    description: tag.metadata?.description || `Articles tagged with #${tag.title}.`,
  }
}

export async function generateStaticParams() {
  const tags = await getBlogTags()
  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params
  const tag = await getBlogTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const posts = await getBlogPostsByTag(tag.id)

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding">
        <div className="section-max-width">
          <Link
            href="/blog"
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
            All Articles
          </Link>
          <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Tag
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            #{tag.title}
          </h1>
          {tag.metadata?.description && (
            <p className="text-carbon-400 text-lg md:text-xl max-w-2xl">
              {tag.metadata.description}
            </p>
          )}
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20 lg:pb-28 section-padding">
        <div className="section-max-width">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-carbon-500 text-lg">No articles with this tag yet.</p>
              <Link href="/blog" className="text-racing-500 hover:text-racing-400 text-sm mt-3 inline-block">
                ← Browse all articles
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}