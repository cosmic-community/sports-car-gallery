import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const quote = testimonial.metadata?.quote
  const clientName = testimonial.metadata?.client_name
  const company = testimonial.metadata?.company
  const avatar = testimonial.metadata?.avatar

  return (
    <div
      className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Quote Icon */}
      <div className="mb-5">
        <svg
          className="w-8 h-8 text-racing-600/60"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Quote */}
      {quote && (
        <p className="text-carbon-200 text-base md:text-lg leading-relaxed mb-8 flex-1">
          &ldquo;{quote}&rdquo;
        </p>
      )}

      {/* Client Info */}
      <div className="flex items-center gap-3 pt-6 border-t border-carbon-800/50">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress&q=80`}
            alt={clientName || 'Client'}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-carbon-700"
            width={48}
            height={48}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-racing-600/20 flex items-center justify-center">
            <span className="text-racing-400 text-sm font-bold">
              {clientName ? clientName.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
        )}
        <div>
          {clientName && (
            <p className="text-white text-sm font-semibold">{clientName}</p>
          )}
          {company && (
            <p className="text-carbon-500 text-xs">{company}</p>
          )}
        </div>
      </div>
    </div>
  )
}