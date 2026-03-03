import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/cosmic'
import BlogCard from '@/components/BlogCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { BlogCategory, BlogPost, BlogTag } from '@/types' // Changed: Added explicit type imports

export const metadata: Metadata = {
  title: 'Blog | Sports Car Gallery',
  description: 'Automotive stories, car reviews, and behind-the-scenes insights from the world of sports car photography.',
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams
  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1', 10))
  const postsPerPage = 6

  const [{ objects: posts, total }, categories, tags] = await Promise.all([
    getBlogPosts(currentPage, postsPerPage),
    getBlogCategories(),
    getBlogTags(),
  ])

  const totalPages = Math.ceil(total / postsPerPage)

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding">
        <div className="section-max-width">
          <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Stories & Insights
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            Blog
          </h1>
          <p className="text-carbon-400 text-lg md:text-xl max-w-2xl">
            Automotive stories, car reviews, and behind-the-scenes insights from the world of sports car photography.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="pb-8 section-padding">
          <div className="section-max-width">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full text-sm font-medium bg-racing-600 text-white transition-all duration-200"
              >
                All Posts
              </Link>
              {categories.map((cat: BlogCategory) => ( // Changed: Added explicit type for cat
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="px-4 py-2 rounded-full text-sm font-medium text-carbon-400 bg-carbon-900/60 border border-carbon-800/50 hover:text-white hover:border-carbon-700 transition-all duration-200"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="pb-20 lg:pb-28 section-padding">
        <div className="section-max-width">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: BlogPost, index: number) => ( // Changed: Added explicit types for post and index
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/blog"
              />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-carbon-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-carbon-500 text-lg">No articles yet.</p>
              <p className="text-carbon-600 text-sm mt-1">Check back soon for new content.</p>
            </div>
          )}

          {/* Tags Sidebar */}
          {tags.length > 0 && (
            <div className="mt-16 pt-12 border-t border-carbon-800/50">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: BlogTag) => ( // Changed: Added explicit type for tag
                  <Link
                    key={tag.id}
                    href={`/blog/tag/${tag.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-carbon-800/60 text-carbon-300 hover:bg-racing-600/20 hover:text-racing-400 border border-carbon-700/40 hover:border-racing-600/40 transition-all duration-200 text-sm font-medium"
                  >
                    <span className="text-carbon-500">#</span>
                    {tag.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}