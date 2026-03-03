import Link from 'next/link'

const footerLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Testimonials' },
]

export default function Footer() {
  return (
    <footer className="border-t border-carbon-800/50 section-padding py-12">
      <div className="section-max-width">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-racing-600 rounded-lg flex items-center justify-center group-hover:bg-racing-500 transition-colors duration-300">
              <span className="text-white text-sm font-bold">SC</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Sports Car <span className="text-racing-500">Gallery</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-carbon-500 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-carbon-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-carbon-600 text-sm">
            &copy; {new Date().getFullYear()} Sports Car Gallery. All rights reserved.
          </p>
          <p className="text-carbon-700 text-xs">
            Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-carbon-500 hover:text-racing-500 transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}