import { useEffect } from 'react'

const message = `
%c  🥚  You found the easter egg!
%c  ─────────────────────────────
%c  Hi there, fellow dev 👋
%c  Built with Astro + React + Three.js
%c  https://github.com/eanorambuena/eanorambuena.github.io
%c  ─────────────────────────────
%c  "Building products people love"
`

const styles = [
  'font-size: 24px',
  'font-size: 12px; color: #6b7280',
  'font-size: 14px; color: #e5e7eb',
  'font-size: 12px; color: #a855f7',
  'font-size: 12px; color: #3b82f6; text-decoration: underline',
  'font-size: 12px; color: #6b7280',
  'font-size: 14px; color: #e5e7eb; font-style: italic',
]

export default function EasterEgg() {
  useEffect(() => {
    console.log(message, ...styles)
  }, [])

  return null
}
