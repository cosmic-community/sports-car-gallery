// app/blog/category/[slug]/page.tsx
import {
  getBlogCategoryBySlug,
  getBlogCategories,
  getBlogPostsByCategory,
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
  const category = await getBlogCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.title} | Blog | Sports Car Gallery`,
    description: category.metadata?.description || `Browse articles in the ${category.title} category.`,
  }
}

export async function generateStaticParams() {
  const categories = await getBlogCategories()
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getBlogCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getBlogPostsByCategory(category.id)

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
            Category
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            {category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-carbon-400 text-lg md:text-xl max-w-2xl">
              {category.metadata.description}
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
              <p className="text-carbon-500 text-lg">No articles in this category yet.</p>
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