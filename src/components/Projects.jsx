import ScrollReveal from './ScrollReveal.jsx'
import { useLang } from '../i18n/useLang.jsx'

const projects = [
  {
    title: 'Emmy.js',
    descKey: 'emmy',
    tags: ['TypeScript', 'Web Components', 'Open Source'],
    links: [{ labelKey: 'github', url: 'https://github.com/emmyjs/emmy-dom' }],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Kalmate',
    descKey: 'kalmate',
    tags: ['Nuxt 3', 'Vue', 'TypeScript', 'Yahoo Finance'],
    links: [{ labelKey: 'demo', url: 'https://kalmate.app' }],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Peer Evaluation Platform',
    descKey: 'peer',
    tags: ['Next.js', 'React', 'PostgreSQL', 'AWS'],
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'GIS App for Mining',
    descKey: 'gis',
    tags: ['React', 'TypeScript', 'GIS', 'Vite'],
    color: 'from-orange-500 to-red-500',
  },
]

const descEN = {
  emmy: 'A lightweight library for building web components using functional programming patterns. Open source with 1,000+ weekly npm downloads.',
  kalmate: 'Bloomberg-style financial terminal processing real-time market data via Yahoo Finance API, built with Nuxt 3 and TradingView lightweight charts.',
  peer: 'Platform serving 1,500+ concurrent students with real-time dashboards and automated cross-review workflows. Cut grading time by 60% across 3+ university deployments.',
  gis: 'Frontend GIS visualization app built from scratch for a global mining company. Handles 50k+ geospatial data points with interactive maps and data layers.',
}

const descES = {
  emmy: 'Librería liviana para construir web components usando patrones de programación funcional. Open source con 1,000+ descargas semanales en npm.',
  kalmate: 'Terminal financiero estilo Bloomberg con datos de mercado en tiempo real vía Yahoo Finance API, construido con Nuxt 3 y TradingView charts.',
  peer: 'Plataforma para 1,500+ estudiantes concurrentes con dashboards en tiempo real y flujos de revisión automatizados. Redujo tiempo de corrección en 60%.',
  gis: 'App de visualización GIS construida desde cero para una minera global. Maneja 50k+ puntos de datosgeoespaciales con mapas interactivos.',
}

const linkLabels = { en: { github: 'GitHub →', demo: 'Live Demo →' }, es: { github: 'GitHub →', demo: 'Demo →' } }

function ProjectCard({ project, index, t, lang }) {
  return (
    <ScrollReveal delay={index * 100}>
      <div class="group relative bg-zinc-800/40 backdrop-blur-sm border border-zinc-800 hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/5 overflow-hidden">
        <div class={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${project.color} opacity-60 group-hover:opacity-80 transition-opacity`} />
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
        <h3 class="text-xl font-bold mb-2 relative">{project.title}</h3>
        <p class="text-zinc-100 text-sm mb-4 leading-relaxed relative">{(lang === 'es' ? descES : descEN)[project.descKey]}</p>
        <div class="flex flex-wrap gap-2 mb-4 relative">
          {project.tags.map((t) => (
            <span class="text-xs px-3 py-1 rounded-full bg-purple-900/20 text-purple-300 border border-purple-800/30">{t}</span>
          ))}
        </div>
        {project.links?.map((l) => (
          <a href={l.url} target="_blank" rel="noopener noreferrer" class="relative text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">
            {linkLabels[lang][l.labelKey]}
          </a>
        ))}
      </div>
    </ScrollReveal>
  )
}

export default function Projects() {
  const { t, lang } = useLang()

  return (
    <section id="projects" class="py-36 px-4 relative">
      <div class="max-w-5xl mx-auto">
        <ScrollReveal>
          <div class="text-center mb-20">
            <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">{t.projects.subtitle}</p>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {t.projects.title}
            </h2>
            <p class="text-zinc-100 mt-4 max-w-md mx-auto">{t.projects.desc}</p>
          </div>
        </ScrollReveal>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} t={t} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
