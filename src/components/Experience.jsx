import ScrollReveal from './ScrollReveal.jsx'
import { useLang } from '../i18n/useLang.jsx'

const experiences = [
  {
    company: 'NeuralWorks SpA',
    date: '2024 - 2025',
    tags: ['React Native', 'TypeScript', 'Tamagui', 'AI'],
  },
  {
    company: 'Acofuz',
    date: '2024',
    tags: ['React', 'TypeScript', 'GIS', 'Vite'],
  },
  {
    company: 'IDS UC',
    date: '2023 - 2024',
    tags: ['Next.js', 'React', 'PostgreSQL', 'AWS'],
  },
]

function TimelineItem({ exp, index, t }) {
  const item = t.experience.items[index]

  return (
    <ScrollReveal delay={index * 120}>
      <div class="relative pl-12 pb-16 last:pb-0">
        <div class="absolute left-[11px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-dark-950 z-10" />
        <div class="bg-dark-800/30 backdrop-blur-sm border border-gray-800/60 hover:border-purple-500/20 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-lg">{exp.company}</h3>
            <span class="text-xs text-gray-200 font-mono">{exp.date}</span>
          </div>
          <p class="text-purple-400 text-sm mb-3 font-medium">{item.role}</p>
          <p class="text-gray-200 text-sm leading-relaxed mb-3">{item.desc}</p>
          <div class="flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span class="text-xs px-3 py-1 rounded-full bg-dark-900/50 text-gray-200 border border-gray-700/50">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Experience() {
  const { t } = useLang()

  return (
    <section id="experience" class="py-32 px-4 relative">
      <div class="max-w-2xl mx-auto">
        <ScrollReveal>
          <div class="text-center mb-20">
            <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">{t.experience.subtitle}</p>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {t.experience.title}
            </h2>
            <p class="text-gray-200 mt-4 max-w-md mx-auto">{t.experience.desc}</p>
          </div>
        </ScrollReveal>
        <div class="relative">
          <div class="absolute left-[23px] top-2 bottom-4 w-px bg-gradient-to-b from-purple-500 via-purple-500/50 to-transparent" />
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
