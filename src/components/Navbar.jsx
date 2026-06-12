import { useState, useEffect } from 'react'
import { useLang } from '../i18n/useLang.jsx'

const links = [
  { labelKey: 'about', href: '#about' },
  { labelKey: 'experience', href: '#experience' },
  { labelKey: 'projects', href: '#projects' },
  { labelKey: 'skills', href: '#skills' },
  { labelKey: 'opensource', href: '#opensource' },
  { labelKey: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLang()
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
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50'
          : 'bg-black/40'
      }`}
    >
      <div class="fixed top-16 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 z-50 transition-all duration-150" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            class="flex-shrink-0 bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0"
            aria-label="Scroll to top"
          >
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/38821970?v=4"
                alt="Emmanuel Norambuena"
                class="w-full h-full object-cover"
              />
            </div>
          </button>
          <div class="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
            <button
              onClick={() => setLang('es')}
              class={`text-xs font-mono font-semibold px-3 py-1.5 rounded-md transition-all duration-200 ${
                lang === 'es' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              aria-pressed={lang === 'es'}
            >
              ES
            </button>
            <button
              onClick={() => setLang('en')}
              class={`text-xs font-mono font-semibold px-3 py-1.5 rounded-md transition-all duration-200 ${
                lang === 'en' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-1">
          {links.map(({ labelKey, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); scrollTo(href.slice(1)) }}
              aria-current={active === href ? 'page' : undefined}
              class={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === href
                  ? 'text-white bg-white/10'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.nav[labelKey]}
            </a>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          class="md:hidden p-3 text-zinc-300 hover:text-white transition-colors"
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
        <div id="mobile-menu" role="navigation" aria-label="Mobile navigation" class="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div class="px-6 py-4 flex flex-col gap-2">
            {links.map(({ labelKey, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); scrollTo(href.slice(1)) }}
                aria-current={active === href ? 'page' : undefined}
                class={`px-4 py-3 text-sm rounded-lg text-left transition-all ${
                  active === href
                    ? 'text-white bg-white/10'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.nav[labelKey]}
              </a>
            ))}
            <div class="flex bg-white/5 rounded-lg p-0.5 border border-white/10 mt-2 self-start">
              <button
                onClick={() => setLang('es')}
                class={`text-xs font-mono font-semibold px-3 py-1.5 rounded-md transition-all duration-200 ${
                  lang === 'es' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                aria-pressed={lang === 'es'}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                class={`text-xs font-mono font-semibold px-3 py-1.5 rounded-md transition-all duration-200 ${
                  lang === 'en' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
