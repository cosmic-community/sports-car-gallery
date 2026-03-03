import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | string)[] = []

  // Build page numbers with ellipsis
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (currentPage > 3) {
      pages.push('...')
    }
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) {
      pages.push('...')
    }
    pages.push(totalPages)
  }

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Blog pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-carbon-400 hover:text-white hover:bg-carbon-800/60 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-carbon-700 cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Prev
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, idx) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${idx}`} className="px-3 py-2 text-carbon-600 text-sm">
              …
            </span>
          )
        }

        const pageNum = page as number
        const isActive = pageNum === currentPage

        return (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-racing-600 text-white'
                : 'text-carbon-400 hover:text-white hover:bg-carbon-800/60'
            }`}
          >
            {pageNum}
          </Link>
        )
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-carbon-400 hover:text-white hover:bg-carbon-800/60 transition-all duration-200"
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-carbon-700 cursor-not-allowed">
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      )}
    </nav>
  )
}