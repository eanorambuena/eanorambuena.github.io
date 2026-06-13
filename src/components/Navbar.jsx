import { useState, useEffect } from 'react'
import { useLang } from '../i18n/useLang.jsx'
import { useTheme } from '../hooks/useTheme.jsx'
import IconButton from './IconButton'
import AccessibilityMenu from './AccessibilityMenu'

const links = [
  { labelKey: 'about', href: '#about' },
  { labelKey: 'experience', href: '#experience' },
  { labelKey: 'projects', href: '#projects' },
  { labelKey: 'opensource', href: '#opensource' },
  { labelKey: 'testimonios', href: '#testimonios' },
  { labelKey: 'skills', href: '#skills' },
  { labelKey: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-muted')
      if (stored !== null) return stored === 'true'
    }
    return true
  })
  const { theme, toggleTheme } = useTheme()

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev
      localStorage.setItem('portfolio-muted', String(next))
      window.dispatchEvent(new CustomEvent('mutechange', { detail: { muted: next } }))
      return next
    })
  }

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
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActive(`#${id}`)
    } else {
      window.location.href = `/#${id}`
    }
    setMenuOpen(false)
  }

  return (
    <nav
      class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-surface/10 shadow-lg shadow-surface/50'
          : 'bg-surface/40'
      }`}
    >
      <div className="fixed top-16 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary z-50 transition-all duration-150" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-shrink-0 bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0"
            aria-label="Scroll to top"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/38821970?v=4"
                alt="Emmanuel Norambuena"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
          <span className="hidden sm:block text-sm font-semibold text-primary">Emmanuel Norambuena</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {links.map(({ labelKey, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); scrollTo(href.slice(1)) }}
              aria-current={active === href ? 'page' : undefined}
              class={`px-4 py-2 text-sm rounded-lg transition-all duration-200 no-underline ${
                active === href
                  ? 'text-primary bg-surface-white/10'
                  : 'text-secondary hover:text-primary hover:bg-surface-white/5'
              }`}
            >
              {t.nav[labelKey]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <IconButton
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            animateKey={lang}
            ariaLabel={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
          >
            <span className={`fi ${lang === 'en' ? 'fi-es' : 'fi-us'} text-xl leading-none`} style={{width: '20px', height: '20px', backgroundSize: 'contain', backgroundPosition: 'center'}} />
          </IconButton>
            <AccessibilityMenu />
            <IconButton
              onClick={toggleTheme}
              animateKey={theme}
              ariaLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </IconButton>
            <IconButton
              onClick={toggleMute}
              animateKey={muted}
              ariaLabel={muted ? 'Unmute sound' : 'Mute sound'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {muted ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                )}
              </svg>
            </IconButton>
          <IconButton
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            ariaLabel={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </IconButton>
        </div>
      </div>
      {menuOpen && (
        <div id="mobile-menu" role="navigation" aria-label="Mobile navigation" className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-surface/10">
          <div className="px-6 py-4 flex flex-col gap-2">
            {links.map(({ labelKey, href }) => (
              <a
                key={href}
                href={href}
              onClick={(e) => { e.preventDefault(); scrollTo(href.slice(1)) }}
                aria-current={active === href ? 'page' : undefined}
                class={`px-4 py-3 text-sm rounded-lg text-left transition-all no-underline ${
                  active === href
                    ? 'text-primary bg-surface-white/10'
                    : 'text-secondary hover:text-primary hover:bg-surface-white/5'
                }`}
              >
                {t.nav[labelKey]}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2 self-start">
              <IconButton
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                animateKey={lang}
                ariaLabel={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
          >
            <span className={`fi ${lang === 'en' ? 'fi-es' : 'fi-us'} text-xl leading-none`} style={{width: '20px', height: '20px', backgroundSize: 'contain', backgroundPosition: 'center'}} />
              </IconButton>
              <IconButton
                onClick={toggleTheme}
                animateKey={theme}
                ariaLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </IconButton>
            </div>
        </div>
        </div>
      )}
    </nav>
  )
}
