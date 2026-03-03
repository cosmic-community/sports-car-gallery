import Link from 'next/link'
import type { BlogAuthor } from '@/types'

interface AuthorCardProps {
  author: BlogAuthor
  postCount?: number
}

export default function AuthorCard({ author, postCount }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const role = author.metadata?.role
  const bio = author.metadata?.bio

  return (
    <Link
      href={`/blog/author/${author.slug}`}
      className="group flex items-start gap-5 p-6 rounded-2xl bg-carbon-900/50 border border-carbon-800/50 hover:border-carbon-700/50 transition-all duration-300"
    >
      {/* Avatar */}
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
          alt={author.title}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-carbon-800 group-hover:ring-racing-600/50 transition-all duration-300"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-carbon-800 flex items-center justify-center flex-shrink-0 ring-2 ring-carbon-800 group-hover:ring-racing-600/50 transition-all duration-300">
          <span className="text-xl font-bold text-carbon-400">
            {author.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-lg group-hover:text-racing-400 transition-colors duration-200">
          {author.title}
        </h3>
        {role && (
          <p className="text-racing-500 text-sm font-medium mt-0.5">{role}</p>
        )}
        {bio && (
          <p className="text-carbon-400 text-sm mt-2 line-clamp-2">{bio}</p>
        )}
        {typeof postCount === 'number' && (
          <p className="text-carbon-600 text-xs mt-3">
            {postCount} article{postCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </Link>
  )
}