import { useLang } from '../i18n/useLang.jsx'

export default function Contact() {
  const { t } = useLang()

  return (
    <section id="contact" class="py-36 px-4 relative">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">{t.contact.subtitle}</p>
        <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          {t.contact.title}
        </h2>
        <p class="text-gray-200 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          {t.contact.desc}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:eanorambuena@uc.cl"
            class="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
          >
            {t.contact.btnEmail}
          </a>
          <a
            href="https://linkedin.com/in/eanorambuena"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-3.5 border border-gray-600 hover:border-purple-500/50 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {t.contact.btnLinkedin}
          </a>
        </div>
        <div class="flex gap-6 justify-center mt-10 text-gray-200">
          <a href="https://github.com/eanorambuena" target="_blank" rel="noopener noreferrer" class="hover:text-purple-400 transition-colors text-sm font-medium">GitHub</a>
          <a href="https://x.com/eanorambuena" target="_blank" rel="noopener noreferrer" class="hover:text-purple-400 transition-colors text-sm font-medium">X</a>
          <a href="https://linkedin.com/in/eanorambuena" target="_blank" rel="noopener noreferrer" class="hover:text-purple-400 transition-colors text-sm font-medium">LinkedIn</a>
        </div>
        <p class="text-gray-300 text-sm mt-8">
          Based in Chile · Open to remote · Connected to the Chilean startup ecosystem
        </p>
      </div>
    </section>
  )
}
