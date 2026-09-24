import { useState } from 'react'

export default function MusicWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="w-[300px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-[#1c1c1e] animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/10">
            <span className="text-xs text-white/60 font-mono">Now playing</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors text-sm leading-none w-6 h-6 inline-flex items-center justify-center rounded-md hover:bg-white/10"
              aria-label="Cerrar reproductor"
            >
              ✕
            </button>
          </div>
          <iframe
            style={{ border: 0, width: '300px', height: '340px', display: 'block' }}
            src="https://bandcamp.com/EmbeddedPlayer/track=1912506246/size=large/bgcol=1c1c1e/linkcol=ab5cf7/tracklist=false/transparent=false/"
            seamless
            title="Second Floor (Kicking Stones) by MIRROR CRY"
          />
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full inline-flex items-center justify-center text-white bg-accent hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-black/20"
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
