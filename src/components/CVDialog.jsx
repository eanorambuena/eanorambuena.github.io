import { useState, useRef, useEffect } from 'react'

const SERVICE_TYPES = [
  { value: 'fullstack', labelEs: 'Fullstack', labelEn: 'Fullstack' },
  { value: 'mobile', labelEs: 'Mobile (React Native)', labelEn: 'Mobile (React Native)' },
  { value: 'cloud', labelEs: 'Cloud / DevOps', labelEn: 'Cloud / DevOps' },
  { value: 'frontend', labelEs: 'Frontend', labelEn: 'Frontend' },
  { value: 'consulting', labelEs: 'Consultoría técnica', labelEn: 'Technical consulting' },
  { value: 'other', labelEs: 'Otro', labelEn: 'Other' },
]

export default function CVDialog({ labelEs, labelEn }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const dialogRef = useRef(null)
  const lang = typeof document !== 'undefined'
    ? (document.documentElement.lang || 'es')
    : 'es'
  const t = (es, en) => lang === 'es' ? es : en

  useEffect(() => {
    if (open && dialogRef.current) {
      const input = dialogRef.current.querySelector('input')
      if (input) input.focus()
    }
  }, [open])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  function downloadCV() {
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'CV_Emmanuel_Norambuena.pdf'
    link.click()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (email || service) {
      try {
        const entries = JSON.parse(localStorage.getItem('cv-leads') || '[]')
        entries.push({ email, service, date: new Date().toISOString() })
        localStorage.setItem('cv-leads', JSON.stringify(entries))
      } catch {}
    }
    setSubmitted(true)
    downloadCV()
    setTimeout(() => { setOpen(false); setSubmitted(false) }, 1500)
  }

  function handleSkip() {
    downloadCV()
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/15 text-accent text-sm font-medium hover:bg-accent/25 transition-all border border-accent/10 group cursor-pointer"
      >
        <svg class="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {t(labelEs, labelEn)}
      </button>

      {open && (
        <>
          <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('Descargar CV', 'Download CV')}
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-surface-elevated border border-border/30 rounded-2xl shadow-2xl shadow-black/40 p-8"
          >
            {submitted ? (
              <div class="text-center py-8">
                <svg class="w-12 h-12 text-[#00c853] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-primary font-semibold">{t('¡Gracias!', 'Thanks!')}</p>
                <p class="text-muted text-sm mt-1">{t('Descargando CV...', 'Downloading CV...')}</p>
              </div>
            ) : (
              <>
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-lg font-bold text-primary">{t('Antes de descargar', 'Before you download')}</h2>
                  <button
                    onClick={() => setOpen(false)}
                    class="text-muted hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-1"
                    aria-label={t('Cerrar', 'Close')}
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p class="text-sm text-muted mb-6">
                  {t('Opcional: déjame saber qué buscas para enviarte el CV más relevante.', 'Optional: let me know what you\'re looking for so I can send the most relevant CV.')}
                </p>
                <form onSubmit={handleSubmit} class="space-y-4">
                  <div>
                    <label for="cv-email" class="text-xs text-muted font-semibold uppercase tracking-wider block mb-1.5">
                      {t('Correo electrónico', 'Email')}
                    </label>
                    <input
                      id="cv-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      class="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border/40 text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label for="cv-service" class="text-xs text-muted font-semibold uppercase tracking-wider block mb-1.5">
                      {t('Tipo de servicio', 'Service type')}
                    </label>
                    <select
                      id="cv-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      class="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border/40 text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors"
                    >
                      <option value="">{t('— Selecciona —', '— Select —')}</option>
                      {SERVICE_TYPES.map((s) => (
                        <option key={s.value} value={s.value}>{t(s.labelEs, s.labelEn)}</option>
                      ))}
                    </select>
                  </div>
                  <div class="flex gap-3 pt-2">
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all cursor-pointer border-0"
                    >
                      {t('Descargar', 'Download')}
                    </button>
                    <button
                      type="button"
                      onClick={handleSkip}
                      class="px-4 py-2.5 rounded-xl text-muted hover:text-primary text-sm transition-colors bg-transparent border border-border/30 hover:border-border/60 cursor-pointer"
                    >
                      {t('Saltar', 'Skip')}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
