import { useEffect, useState } from 'react'

export default function YouTubePlayer({ videoId, start = 0 }) {
  const [playerId] = useState(`yt-player-${Math.random().toString(36).slice(2, 8)}`)

  useEffect(() => {
    let player = null
    let poll = null

    function initPlayer() {
      if (!window.YT?.Player) return false
      player = new window.YT.Player(playerId, {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: { start, enablejsapi: 1 },
      })
      return true
    }

    if (!initPlayer()) {
      if (!document.querySelector('#yt-iframe-api')) {
        window.onYouTubeIframeAPIReady = initPlayer
        const tag = document.createElement('script')
        tag.id = 'yt-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      poll = setInterval(() => {
        if (initPlayer() && poll) clearInterval(poll)
      }, 300)
    }

    return () => {
      if (poll) clearInterval(poll)
      if (player?.destroy) player.destroy()
    }
  }, [videoId, start, playerId])

  return <div id={playerId} className="w-full h-full" />
}
