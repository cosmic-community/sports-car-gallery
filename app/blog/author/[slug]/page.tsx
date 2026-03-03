// app/blog/author/[slug]/page.tsx
import {
  getBlogAuthorBySlug,
  getBlogAuthors,
  getBlogPostsByAuthor,
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
  const author = await getBlogAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: `${author.title} | Blog | Sports Car Gallery`,
    description: author.metadata?.bio || `Articles by ${author.title}.`,
  }
}

export async function generateStaticParams() {
  const authors = await getBlogAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getBlogAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getBlogPostsByAuthor(author.id)
  const avatar = author.metadata?.avatar
  const bio = author.metadata?.bio
  const role = author.metadata?.role
  const website = author.metadata?.website
  const twitter = author.metadata?.twitter

  return (
    <>
      {/* Author Header */}
      <section className="pt-32 pb-16 section-padding">
        <div className="section-max-width">
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
            All Articles
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            {avatar ? (
              <img
                src={`${avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-28 h-28 rounded-2xl object-cover ring-2 ring-carbon-800"
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-carbon-800 flex items-center justify-center ring-2 ring-carbon-800">
                <span className="text-4xl font-bold text-carbon-400">
                  {author.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-2">
                Author
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                {author.title}
              </h1>
              {role && (
                <p className="text-racing-400 text-lg font-medium mb-4">{role}</p>
              )}
              {bio && (
                <p className="text-carbon-400 text-lg leading-relaxed max-w-2xl mb-4">
                  {bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-carbon-500 hover:text-racing-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                )}
                {twitter && (
                  <a
                    href={`https://twitter.com/${twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-carbon-500 hover:text-racing-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                <span className="text-carbon-600 text-sm">
                  {posts.length} article{posts.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author's Posts */}
      <section className="pb-20 lg:pb-28 section-padding">
        <div className="section-max-width">
          <h2 className="text-2xl font-bold text-white mb-8">
            Articles by {author.title}
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-carbon-500 text-lg">No articles by this author yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}