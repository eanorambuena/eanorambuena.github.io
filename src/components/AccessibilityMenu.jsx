import { useState, useEffect } from 'react'
import IconButton from './IconButton'

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window !== 'undefined') return document.documentElement.classList.contains('reduce-motion')
    return false
  })
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') return document.documentElement.classList.contains('high-contrast')
    return false
  })
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') return parseInt(localStorage.getItem('portfolio-font-size') || '100')
    return 100
  })

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion)
    localStorage.setItem('portfolio-reduce-motion', String(reduceMotion))
  }, [reduceMotion])

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
    localStorage.setItem('portfolio-high-contrast', String(highContrast))
  }, [highContrast])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    localStorage.setItem('portfolio-font-size', String(fontSize))
  }, [fontSize])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div className="relative">
      <IconButton
        onClick={() => setOpen(!open)}
        ariaLabel="Accessibility menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 9v5h3l2.5 5h-2l-2-4H11l-1 2H8l2-4-1-4z" />
        </svg>
      </IconButton>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-surface-elevated border border-surface/20 rounded-xl shadow-2xl shadow-black/30 p-4 space-y-4">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Accesibilidad</p>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-primary">Reducir movimiento</span>
              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                className="w-9 h-5 rounded-full relative transition-colors duration-200 border-0 cursor-pointer flex-shrink-0"
                style={{ backgroundColor: reduceMotion ? 'var(--accent)' : 'var(--border)' }}
                aria-label="Toggle reduce motion"
              >
                <span className="block w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200" style={{ transform: reduceMotion ? 'translateX(16px)' : 'translateX(1px)' }} />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-primary">Alto contraste</span>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className="w-9 h-5 rounded-full relative transition-colors duration-200 border-0 cursor-pointer flex-shrink-0"
                style={{ backgroundColor: highContrast ? 'var(--accent)' : 'var(--border)' }}
                aria-label="Toggle high contrast"
              >
                <span className="block w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200" style={{ transform: highContrast ? 'translateX(16px)' : 'translateX(1px)' }} />
              </button>
            </label>

            <div>
              <p className="text-sm text-primary mb-2">Tamaño de fuente</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFontSize(Math.max(70, fontSize - 10))}
                  className="p-1.5 rounded-lg text-secondary hover:text-primary transition-colors bg-surface-white/5 hover:bg-surface-white/10 text-sm font-bold"
                  aria-label="Decrease font size"
                >
                  A−
                </button>
                <span className="text-xs text-muted font-mono w-8 text-center">{fontSize}%</span>
                <button
                  onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                  className="p-1.5 rounded-lg text-secondary hover:text-primary transition-colors bg-surface-white/5 hover:bg-surface-white/10 text-sm font-bold"
                  aria-label="Increase font size"
                >
                  A+
                </button>
              </div>
            </div>

            <button
              onClick={() => { setReduceMotion(false); setHighContrast(false); setFontSize(100) }}
              className="w-full text-xs text-muted hover:text-primary transition-colors py-1"
            >
              Restablecer
            </button>
          </div>
        </>
      )}
    </div>
  )
}
