import { useState, useEffect, useCallback } from 'react'
import { es, en } from './translations.js'

const LANG_EVENT = 'langchange'
const STORAGE_KEY = 'portfolio-lang'

function getInitialLang() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) || 'es'
  }
  return 'es'
}

export function useLang() {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    const handler = () => {
      setLang(localStorage.getItem(STORAGE_KEY) || 'es')
    }
    window.addEventListener(LANG_EVENT, handler)
    return () => window.removeEventListener(LANG_EVENT, handler)
  }, [])

  const setLangAndPersist = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, next)
    setLang(next)
    window.dispatchEvent(new CustomEvent(LANG_EVENT))
  }, [])

  const toggleLang = useCallback(() => {
    setLangAndPersist(lang === 'es' ? 'en' : 'es')
  }, [lang, setLangAndPersist])

  return { lang, toggleLang, setLang: setLangAndPersist, t: lang === 'es' ? es : en }
}
