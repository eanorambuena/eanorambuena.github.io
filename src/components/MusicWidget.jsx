import { useState } from 'react'

export default function MusicWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {open && (
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-surface/20 bg-surface-elevated animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <span className="text-xs text-muted font-mono">Now playing</span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted hover:text-primary transition-colors text-sm leading-none px-1"
              aria-label="Cerrar reproductor"
            >
              ✕
            </button>
          </div>
          <iframe
            style={{ border: 0, width: '300px', height: '340px' }}
            src="https://bandcamp.com/EmbeddedPlayer/track=1912506246/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
            seamless
            title="Second Floor (Kicking Stones) by MIRROR CRY"
          />
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-xl inline-flex items-center justify-center text-primary bg-surface-elevated hover:bg-surface-elevated/80 transition-colors shadow-lg border border-surface/20"
        aria-label={open ? 'Ocultar reproductor de música' : 'Mostrar reproductor de música'}
        aria-expanded={open}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" strokeWidth="1.5" />
          <circle cx="18" cy="16" r="3" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  )
}
