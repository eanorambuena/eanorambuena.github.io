import { useEffect, useRef, useState } from 'react'
import IconButton from './IconButton'

export default function MusicWidget() {
  const [open, setOpen] = useState(false)
  // The player stays mounted once opened so the music keeps playing while minimized.
  const [mounted, setMounted] = useState(false)
  const rootRef = useRef(null)
  const frameRef = useRef(null)
  // Bandcamp doesn't expose play state, so we assume it's playing from the first
  // click inside the embed until the track's length (135s) has elapsed.
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!mounted) return
    let timer
    const onBlur = () => {
      if (timer || document.activeElement !== frameRef.current) return
      setPlaying(true)
      timer = setTimeout(() => {
        timer = undefined
        setPlaying(false)
      }, 136000)
    }
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('blur', onBlur)
      clearTimeout(timer)
    }
  }, [mounted])

  // Minimize on any outside interaction. Listeners run in the capture phase so
  // page elements that stop propagation (canvas, cards, links) can't swallow it.
  useEffect(() => {
    if (!open) return
    const onOutside = (e) => {
      const root = rootRef.current
      if (!root) return
      const path = e.composedPath?.() ?? []
      if (!path.includes(root) && !root.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const events = ['pointerdown', 'mousedown', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, onOutside, true))
    window.addEventListener('keydown', onKey)
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, onOutside, true))
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = () => {
    setMounted(true)
    setOpen(!open)
  }

  return (
    <div ref={rootRef} className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {mounted && (
        <div
          inert={!open}
          aria-hidden={!open}
          className={`w-[300px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-[#1c1c1e] transition-all duration-200 origin-bottom-left ${
            open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute bottom-14 left-0'
          }`}
        >
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/10">
            <span className="text-xs text-white/60 font-mono">Now playing</span>
            <IconButton
              onClick={() => setOpen(false)}
              ariaLabel="Minimizar reproductor"
              className="!w-7 !h-7 !rounded-md !text-white/60 hover:!text-white !bg-white/10 hover:!bg-white/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </div>
          <iframe
            ref={frameRef}
            style={{ border: 0, width: '300px', height: '400px', display: 'block' }}
            src="https://bandcamp.com/EmbeddedPlayer/track=1912506246/size=large/bgcol=1c1c1e/linkcol=ab5cf7/tracklist=false/transparent=false/"
            seamless
            title="Second Floor (Kicking Stones) by MIRROR CRY"
          />
        </div>
      )}
      <div className="flex items-center gap-3">
      <IconButton
        onClick={toggle}
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
      {playing && !open && (
        <span
          role="status"
          aria-label="Música sonando"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1c1c1e]/90 backdrop-blur px-3 py-1.5 shadow-lg animate-[fadeIn_0.2s_ease-out]"
        >
          <span className="flex items-end gap-[3px] h-3.5" aria-hidden="true">
            {[0, 0.2, 0.4].map((delay) => (
              <span
                key={delay}
                className="w-[3px] h-full rounded-sm bg-[#ab5cf7] origin-bottom"
                style={{ animation: `music-eq 0.9s ease-in-out ${delay}s infinite` }}
              />
            ))}
          </span>
          <span className="text-xs text-white/70 font-mono">Sonando</span>
        </span>
      )}
      </div>
      <style>{`@keyframes music-eq { 0%,100% { transform: scaleY(0.25) } 50% { transform: scaleY(1) } }`}</style>
    </div>
  )
}
