import { useState } from 'react'
import IconButton from './IconButton'

export default function MusicWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="w-[300px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-[#1c1c1e] animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/10">
            <span className="text-xs text-white/60 font-mono">Now playing</span>
            <IconButton
              onClick={() => setOpen(false)}
              ariaLabel="Cerrar reproductor"
              className="!w-7 !h-7 !rounded-md !text-white/60 hover:!text-white !bg-white/10 hover:!bg-white/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </div>
          <iframe
            style={{ border: 0, width: '300px', height: '400px', display: 'block' }}
            src="https://bandcamp.com/EmbeddedPlayer/track=1912506246/size=large/bgcol=1c1c1e/linkcol=ab5cf7/tracklist=false/transparent=false/"
            seamless
            title="Second Floor (Kicking Stones) by MIRROR CRY"
          />
        </div>
      )}
      <IconButton
        onClick={() => setOpen(!open)}
        animateKey={open}
        ariaLabel={open ? 'Ocultar reproductor de música' : 'Mostrar reproductor de música'}
        className="shadow-lg"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" strokeWidth="1.5" />
            <circle cx="18" cy="16" r="3" strokeWidth="1.5" />
          </svg>
        )}
      </IconButton>
    </div>
  )
}
