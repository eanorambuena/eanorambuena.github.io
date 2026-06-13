import { useEffect, useState } from 'react'

export default function YouTubePlayer({ videoId, start = 0 }) {
  const [playerId] = useState(`yt-player-${Math.random().toString(36).slice(2, 8)}`)

  useEffect(() => {
    if (!document.querySelector('#yt-iframe-api')) {
      const tag = document.createElement('script')
      tag.id = 'yt-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    let player = null

    function initPlayer() {
      if (!window.YT?.Player) {
        setTimeout(initPlayer, 200)
        return
      }
      player = new window.YT.Player(playerId, {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          start,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            const stored = localStorage.getItem('portfolio-muted')
            if (stored === 'false' && player?.unMute) {
              player.unMute()
            }
          },
        },
      })
    }

    function onMuteChange(e) {
      if (player?.unMute) {
        e.detail.muted ? player.mute() : player.unMute()
      }
    }

    window.addEventListener('mutechange', onMuteChange)
    initPlayer()

    return () => {
      window.removeEventListener('mutechange', onMuteChange)
      if (player?.destroy) player.destroy()
    }
  }, [videoId, start, playerId])

  return <div id={playerId} className="w-full h-full" />
}
