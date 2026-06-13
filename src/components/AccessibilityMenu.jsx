import { useState, useEffect, useRef } from 'react'
import IconButton from './IconButton'

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)
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
    if (open && panelRef.current) {
      const focusable = panelRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')
      if (focusable.length) focusable[0].focus()
    }
  }, [open])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
      if (e.key === 'Tab' && open && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div className="relative">
      <IconButton
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        ariaLabel="Menú de accesibilidad"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h8M12 10v6l-2 2M12 16l2 2" />
        </svg>
      </IconButton>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); triggerRef.current?.focus() }} aria-hidden="true" />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Opciones de accesibilidad"
            className="absolute right-0 top-full mt-2 z-50 w-64 bg-surface-elevated border border-surface/20 rounded-xl shadow-2xl shadow-black/30 p-4 space-y-4"
          >
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider">Accesibilidad</h2>

            <div className="flex items-center justify-between">
              <span id="a11y-reduce-motion" className="text-sm text-primary">Reducir movimiento</span>
              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                className="w-9 h-5 rounded-full relative transition-colors duration-200 border-0 cursor-pointer flex-shrink-0"
                style={{ backgroundColor: reduceMotion ? 'var(--accent)' : 'var(--border)' }}
                role="switch"
                aria-checked={reduceMotion}
                aria-labelledby="a11y-reduce-motion"
              >
                <span className="block w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200" style={{ transform: reduceMotion ? 'translateX(16px)' : 'translateX(1px)' }} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span id="a11y-high-contrast" className="text-sm text-primary">Alto contraste</span>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className="w-9 h-5 rounded-full relative transition-colors duration-200 border-0 cursor-pointer flex-shrink-0"
                style={{ backgroundColor: highContrast ? 'var(--accent)' : 'var(--border)' }}
                role="switch"
                aria-checked={highContrast}
                aria-labelledby="a11y-high-contrast"
              >
                <span className="block w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200" style={{ transform: highContrast ? 'translateX(16px)' : 'translateX(1px)' }} />
              </button>
            </div>

            <div>
              <p className="text-sm text-primary mb-2" id="a11y-font-label">Tamaño de fuente</p>
              <div className="flex items-center gap-3" role="group" aria-labelledby="a11y-font-label">
                <button
                  onClick={() => setFontSize(Math.max(70, fontSize - 10))}
                  className="p-1.5 rounded-lg text-secondary hover:text-primary transition-colors bg-surface-white/5 hover:bg-surface-white/10 text-sm font-bold"
                  aria-label="Reducir tamaño de fuente"
                >
                  A−
                </button>
                <span className="text-xs text-muted font-mono w-8 text-center" aria-live="polite" aria-atomic="true" aria-label={`Tamaño actual: ${fontSize} por ciento`}>{fontSize}%</span>
                <button
                  onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                  className="p-1.5 rounded-lg text-secondary hover:text-primary transition-colors bg-surface-white/5 hover:bg-surface-white/10 text-sm font-bold"
                  aria-label="Aumentar tamaño de fuente"
                >
                  A+
                </button>
              </div>
            </div>

            <button
              onClick={() => { setReduceMotion(false); setHighContrast(false); setFontSize(100) }}
              className="w-full text-xs text-muted hover:text-primary transition-colors py-1"
              aria-label="Restablecer todos los ajustes de accesibilidad"
            >
              Restablecer
            </button>
          </div>
        </>
      )}
    </div>
  )
}
