import { useState, useEffect } from 'react'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Open Source', href: '#opensource' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    links.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(`#${id}`)
    setMenuOpen(false)
  }

  return (
    <nav
      class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          class="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-400 transition-all"
        >
          EN
        </button>
        <div class="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href.slice(1))}
              class={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === href
                  ? 'text-purple-300 bg-purple-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          class="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div class="md:hidden bg-dark-950/95 backdrop-blur-xl border-b border-gray-800/50">
          <div class="px-6 py-4 flex flex-col gap-2">
            {links.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href.slice(1))}
                class={`px-4 py-3 text-sm rounded-lg text-left transition-all ${
                  active === href
                    ? 'text-purple-300 bg-purple-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
