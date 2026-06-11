import { useLang } from '../i18n/useLang.jsx'

const repos = [
  {
    name: 'emmy-dom',
    descKey: 'emmy',
    url: 'https://github.com/emmyjs/emmy-dom',
    npm: 'https://www.npmjs.com/package/emmy-dom',
    statsEN: '1,000+ weekly npm downloads',
    statsES: '1,000+ descargas semanales en npm',
    lang: 'TypeScript',
    langColor: 'bg-blue-500',
  },
]

export default function OpenSource() {
  const { t, lang } = useLang()

  return (
    <section id="opensource" class="py-28 px-4 relative">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">{t.opensource.subtitle}</p>
          <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            {t.opensource.title}
          </h2>
          <p class="text-zinc-100 mt-4 max-w-md mx-auto">{t.opensource.desc}</p>
        </div>
        <div class="max-w-lg mx-auto">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              class="group block bg-zinc-800/40 backdrop-blur-sm border-2 border-purple-500/10 hover:border-purple-500/30 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div class="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-purple-500/20 transition-colors">
                <svg class="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </div>
              <h3 class="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{repo.name}</h3>
              <p class="text-zinc-100 text-sm mb-4 max-w-sm mx-auto leading-relaxed">{repo.descKey}</p>
              <div class="flex items-center justify-center gap-4 text-sm text-zinc-100">
                <span class="flex items-center gap-1.5">
                  <span class={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                  {repo.lang}
                </span>
                <span class="text-purple-400/60">|</span>
                <span>{lang === 'es' ? repo.statsES : repo.statsEN}</span>
              </div>
              <div class="mt-4 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {t.opensourceGH}
              </div>
            </a>
          ))}
        </div>
        <div class="text-center mt-10">
          <a
            href="https://github.com/eanorambuena"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-zinc-100 hover:text-purple-400 transition-colors font-medium"
          >
            {t.opensource.viewAll}
          </a>
        </div>
      </div>
    </section>
  )
}
