import { getPhotos, getCollections, getTestimonials, getAbout, getAllBlogPosts } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import FeaturedCollections from '@/components/FeaturedCollections'
import PhotoGrid from '@/components/PhotoGrid'
import TestimonialSlider from '@/components/TestimonialSlider'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'

export default async function HomePage() {
  const [photos, collections, testimonials, about, blogPosts] = await Promise.all([
    getPhotos(),
    getCollections(),
    getTestimonials(),
    getAbout(),
    getAllBlogPosts(),
  ])

  const heroPhoto = photos[0] ?? null
  const featuredPhotos = photos.slice(0, 8)
  const featuredCollections = collections.slice(0, 3)
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <>
      <HeroSection photo={heroPhoto} about={about} />

      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <section className="py-20 lg:py-28 section-padding">
          <div className="section-max-width">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
                  Curated Sets
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
                  Collections
                </h2>
              </div>
              <Link
                href="/collections"
                className="hidden sm:inline-flex items-center gap-2 text-carbon-400 hover:text-white transition-colors duration-300 text-sm font-medium group"
              >
                View All
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <FeaturedCollections collections={featuredCollections} />
          </div>
        </section>
      )}

      {/* Photo Grid */}
      {featuredPhotos.length > 0 && (
        <section className="py-20 lg:py-28 section-padding bg-carbon-950/50">
          <div className="section-max-width">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
                  Latest Shots
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
                  Gallery
                </h2>
              </div>
              <Link
                href="/gallery"
                className="hidden sm:inline-flex items-center gap-2 text-carbon-400 hover:text-white transition-colors duration-300 text-sm font-medium group"
              >
                View All
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <PhotoGrid photos={featuredPhotos} />
          </div>
        </section>
      )}

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-20 lg:py-28 section-padding">
          <div className="section-max-width">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
                  Latest Stories
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
                  From the Blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-carbon-400 hover:text-white transition-colors duration-300 text-sm font-medium group"
              >
                View All
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 lg:py-28 section-padding bg-carbon-950/50">
          <div className="section-max-width">
            <div className="text-center mb-14">
              <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
                Client Feedback
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
                Testimonials
              </h2>
            </div>
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-28 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-racing-900/20 via-transparent to-racing-900/10" />
        <div className="section-max-width relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Ready to Explore?
          </h2>
          <p className="text-carbon-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Browse the full collection of stunning sports car photography.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 bg-racing-600 hover:bg-racing-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-racing-600/25"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Browse Gallery
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border border-carbon-700 hover:border-carbon-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-carbon-900"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}