import ScrollReveal from './ScrollReveal.jsx'

const projects = [
  {
    title: 'Emmy.js',
    description: 'A lightweight library for building web components using functional programming patterns. Open source with 1,000+ weekly npm downloads.',
    tags: ['TypeScript', 'Web Components', 'Open Source'],
    links: [{ label: 'GitHub →', url: 'https://github.com/emmyjs/emmy-dom' }],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Kalmate',
    description: 'Bloomberg-style financial terminal processing real-time market data via Yahoo Finance API, built with Nuxt 3 and TradingView lightweight charts.',
    tags: ['Nuxt 3', 'Vue', 'TypeScript', 'Yahoo Finance'],
    links: [{ label: 'Live Demo →', url: 'https://kalmate.app' }],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Peer Evaluation Platform',
    description: 'Platform serving 1,500+ concurrent students with real-time dashboards and automated cross-review workflows. Cut grading time by 60% across 3+ university deployments.',
    tags: ['Next.js', 'React', 'PostgreSQL', 'AWS'],
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'GIS App for Mining',
    description: 'Frontend GIS visualization app built from scratch for a global mining company. Handles 50k+ geospatial data points with interactive maps and data layers.',
    tags: ['React', 'TypeScript', 'GIS', 'Vite'],
    color: 'from-orange-500 to-red-500',
  },
]

function ProjectCard({ project, index }) {
  return (
    <ScrollReveal delay={index * 100}>
      <div class="group relative bg-dark-800/40 backdrop-blur-sm border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/5 overflow-hidden">
        <div class={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${project.color} opacity-60 group-hover:opacity-80 transition-opacity`} />
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
        <h3 class="text-xl font-bold mb-2 relative">{project.title}</h3>
        <p class="text-gray-300 text-sm mb-4 leading-relaxed relative">{project.description}</p>
        <div class="flex flex-wrap gap-2 mb-4 relative">
          {project.tags.map((t) => (
            <span class="text-xs px-3 py-1 rounded-full bg-purple-900/20 text-purple-300 border border-purple-800/30">{t}</span>
          ))}
        </div>
        {project.links?.map((l) => (
          <a href={l.url} target="_blank" rel="noopener noreferrer" class="relative text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">
            {l.label}
          </a>
        ))}
      </div>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" class="py-36 px-4 relative">
      <div class="max-w-5xl mx-auto">
        <ScrollReveal>
          <div class="text-center mb-20">
            <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">Portfolio</p>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <p class="text-gray-400 mt-4 max-w-md mx-auto">Real products shipped for real users — from open source to fintech to mining.</p>
          </div>
        </ScrollReveal>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
