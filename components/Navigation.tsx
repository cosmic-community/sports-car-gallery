'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/collections', label: 'Collections' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Testimonials' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Changed: Only the home page gets the transparent-to-solid scroll behavior
  // All other pages always show a solid nav background for visibility
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Changed: Determine background class based on page and scroll state
  // On home page: transparent initially, solid on scroll
  // On all other pages: always solid background so nav is visible
  const headerBg = isHomePage && !isScrolled
    ? 'bg-[#0a0a0b]/80 backdrop-blur-md'
    : 'bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-carbon-800/50'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <nav className="section-max-width section-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-racing-600 rounded-lg flex items-center justify-center group-hover:bg-racing-500 transition-colors duration-300">
              <span className="text-white text-sm font-bold">SC</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
              Sports Car <span className="text-racing-500">Gallery</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-carbon-800/80'
                      : 'text-carbon-400 hover:text-white hover:bg-carbon-800/40'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-carbon-300 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0a0a0b]/95 backdrop-blur-xl border-t border-carbon-800/50 section-padding pb-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-carbon-800/60'
                    : 'text-carbon-400 hover:text-white hover:bg-carbon-800/40'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}