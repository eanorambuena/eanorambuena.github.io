import ScrollReveal from './ScrollReveal.jsx'
import { useLang } from '../i18n/useLang.jsx'

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" class="py-28 px-4 relative bg-dark-950/60">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div class="max-w-3xl mx-auto">
        <ScrollReveal>
          <div class="text-center mb-12">
            <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">{t.about.subtitle}</p>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {t.about.title}
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div class="bg-dark-800/30 backdrop-blur-sm border border-gray-800/60 rounded-2xl p-8 md:p-10 space-y-5 text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p3 }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
