import { useState, useEffect } from 'react'
import { useLang } from '../i18n/useLang.jsx'

const links = [
  { labelKey: 'projects', href: '#projects' },
  { labelKey: 'experience', href: '#experience' },
  { labelKey: 'skills', href: '#skills' },
  { labelKey: 'opensource', href: '#opensource' },
  { labelKey: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { lang, toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
      window.addEventListener('keydown', handler)
      return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

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
      <div class="fixed top-16 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 z-50 transition-all duration-150" style={{ width: `${progress}%` }} />
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            onClick={toggleLang}
            class="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all border border-purple-500/20"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            class="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            aria-label="Scroll to top"
          >
            EN
          </button>
        </div>
        <div class="hidden md:flex items-center gap-1">
          {links.map(({ labelKey, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href.slice(1))}
              aria-current={active === href ? 'true' : undefined}
              class={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === href
                  ? 'text-purple-300 bg-purple-500/10'
                  : 'text-gray-300 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {t.nav[labelKey]}
            </button>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          class="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
        <div id="mobile-menu" class="md:hidden bg-dark-950/95 backdrop-blur-xl border-b border-gray-800/50">
          <div class="px-6 py-4 flex flex-col gap-2">
            {links.map(({ labelKey, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href.slice(1))}
                aria-current={active === href ? 'true' : undefined}
                class={`px-4 py-3 text-sm rounded-lg text-left transition-all ${
                  active === href
                    ? 'text-purple-300 bg-purple-500/10'
                    : 'text-gray-300 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {t.nav[labelKey]}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
