import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials | Sports Car Gallery',
  description: 'What clients say about the Sports Car Gallery photography.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding">
        <div className="section-max-width">
          <p className="text-racing-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Client Feedback
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            Testimonials
          </h1>
          <p className="text-carbon-400 text-lg md:text-xl max-w-2xl">
            Hear from the collectors, magazines, and brands that trust us to capture automotive perfection.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-20 lg:pb-28 section-padding">
        <div className="section-max-width">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-carbon-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-carbon-500 text-lg">No testimonials yet.</p>
              <p className="text-carbon-600 text-sm mt-1">Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}