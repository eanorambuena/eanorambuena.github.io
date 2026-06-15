export default function YouTubePlayer({ videoId, start = 0 }) {
  const src = start
    ? `https://www.youtube.com/embed/${videoId}?start=${start}`
    : `https://www.youtube.com/embed/${videoId}`

  return (
    <iframe
      width="100%"
      height="100%"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
    />
  )
}
