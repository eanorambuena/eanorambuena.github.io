import { useEffect, useRef, useState } from 'react'
import IconButton from './IconButton'

function useLangKey() {
  const [lang, setLang] = useState('es')
  useEffect(() => {
    const read = () => {
      const visible = document.querySelector('[data-lang="en"]:not([hidden])')
      setLang(visible ? 'en' : 'es')
    }
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['hidden'] })
    return () => obs.disconnect()
  }, [])
  return lang === 'en' ? 'En' : 'Es'
}

let ytApiPromise
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        resolve(window.YT)
      }
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    })
  }
  return ytApiPromise
}

function YouTubeTrack({ videoId, onEnded }) {
  const holder = useRef(null)
  const onEndedRef = useRef(onEnded)
  onEndedRef.current = onEnded

  useEffect(() => {
    let player
    let cancelled = false
    loadYouTubeApi().then((YT) => {
      if (cancelled || !holder.current) return
      const el = document.createElement('div')
      holder.current.appendChild(el)
      player = new YT.Player(el, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: { rel: 0, playsinline: 1 },
        events: { onStateChange: (e) => e.data === YT.PlayerState.ENDED && onEndedRef.current() },
      })
    })
    return () => {
      cancelled = true
      player?.destroy?.()
    }
  }, [videoId])

  return <div ref={holder} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full" />
}

function Embed({ track, onEnded }) {
  if (track.type === 'youtube') {
    return (
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <YouTubeTrack videoId={track.id} onEnded={onEnded} />
      </div>
    )
  }
  if (track.type === 'bandcamp') {
    return (
      <iframe
        className="block w-full border-0"
        style={{ height: '400px' }}
        src={`https://bandcamp.com/EmbeddedPlayer/track=${track.id}/size=large/bgcol=1c1c1e/linkcol=ab5cf7/tracklist=false/transparent=false/`}
        title={track.titleEs}
        seamless
      />
    )
  }
  return (
    <iframe
      className="block w-full border-0 bg-white"
      style={{ height: '560px' }}
      src={`https://www.instagram.com/reel/${track.id}/embed`}
      title={track.titleEs}
      allow="encrypted-media"
      allowFullScreen
      loading="lazy"
    />
  )
}

export default function RadioPlayer({ tracks }) {
  const [index, setIndex] = useState(0)
  const L = useLangKey()
  const track = tracks[index]
  const go = (i) => setIndex((i + tracks.length) % tracks.length)
  const autoNext = track.type === 'youtube'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative bg-surface-elevated/60 backdrop-blur-sm border border-surface/10 rounded-2xl overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent to-accent-secondary z-10" />
        <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-surface/10">
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            {L === 'En' ? 'On air' : 'Al aire'}
          </span>
          <span className="text-xs text-muted font-mono">{index + 1} / {tracks.length}</span>
        </div>
        <div className="bg-black/40">
          <Embed key={track.id} track={track} onEnded={() => go(index + 1)} />
        </div>
        <div className="p-6">
          <p className="text-xs text-accent font-mono tracking-wider uppercase mb-1">{track[`kind${L}`]}</p>
          <h2 className="text-xl md:text-2xl font-bold text-primary leading-snug">{track[`title${L}`]}</h2>
          <p className="text-secondary text-sm mt-1">{track[`subtitle${L}`]}</p>
          <div className="flex items-center gap-3 mt-5">
            <IconButton onClick={() => go(index - 1)} ariaLabel={L === 'En' ? 'Previous track' : 'Pista anterior'}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2v12H6zM9.5 12L18 6v12z" /></svg>
            </IconButton>
            <IconButton onClick={() => go(index + 1)} ariaLabel={L === 'En' ? 'Next track' : 'Siguiente pista'}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6h2v12h-2zM6 18V6l8.5 6z" /></svg>
            </IconButton>
            <span className="text-xs text-muted">
              {autoNext
                ? (L === 'En' ? 'Plays the next track automatically when it ends.' : 'Pasa solo a la siguiente pista al terminar.')
                : (L === 'En' ? 'Use “next” when it ends.' : 'Usa “siguiente” al terminar.')}
            </span>
          </div>
        </div>
      </div>

      <ol className="lg:col-span-2 flex flex-col gap-3 list-none p-0 m-0">
        {tracks.map((t, i) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? 'true' : undefined}
              className={`w-full text-left rounded-xl border px-4 py-3 transition-all cursor-pointer ${
                i === index
                  ? 'bg-accent/15 border-accent/40'
                  : 'bg-surface-elevated/60 border-surface/10 hover:border-accent/40'
              }`}
            >
              <span className="text-[10px] font-mono tracking-wider uppercase text-accent">{t[`kind${L}`]}</span>
              <span className="block text-primary font-semibold leading-snug">{t[`title${L}`]}</span>
              <span className="block text-xs text-muted">{t[`subtitle${L}`]}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
