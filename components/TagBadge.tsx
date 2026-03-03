import Link from 'next/link'
import type { BlogTag } from '@/types'

interface TagBadgeProps {
  tag: BlogTag
  size?: 'sm' | 'md'
}

export default function TagBadge({ tag, size = 'sm' }: TagBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-1 text-xs'
    : 'px-3.5 py-1.5 text-sm'

  return (
    <Link
      href={`/blog/tag/${tag.slug}`}
      className={`inline-flex items-center gap-1 ${sizeClasses} rounded-full bg-carbon-800/60 text-carbon-300 hover:bg-racing-600/20 hover:text-racing-400 border border-carbon-700/40 hover:border-racing-600/40 transition-all duration-200 font-medium`}
    >
      <span className="text-carbon-500">#</span>
      {tag.title}
    </Link>
  )
}