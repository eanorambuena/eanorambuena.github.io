const projects = [
  {
    title: 'Emmy.js',
    description: 'A lightweight library for building web components using functional programming patterns.',
    tags: ['TypeScript', 'Web Components', 'Open Source'],
    links: [{ label: 'GitHub →', url: 'https://github.com/emmyjs/emmy-dom' }],
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Kalmate',
    description: 'Bloomberg-style financial terminal using Yahoo Finance API, Nuxt 3, and TradingView lightweight charts.',
    tags: ['Nuxt 3', 'Vue', 'TypeScript', 'Yahoo Finance'],
    links: [{ label: 'Live Demo →', url: 'https://kalmate.app' }],
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Peer Evaluation Platform',
    description: 'Platform serving 1,500+ concurrent students with real-time dashboards, automated workflows and cross-review system.',
    tags: ['Next.js', 'React', 'PostgreSQL', 'AWS'],
    gradient: 'from-green-600 to-teal-600',
  },
  {
    title: 'GIS App for Mining',
    description: 'Frontend GIS visualization application built from scratch for a global mining company, with interactive maps and data layers.',
    tags: ['React', 'TypeScript', 'GIS', 'Vite'],
    gradient: 'from-orange-600 to-red-600',
  },
]

function ProjectCard({ project, index }) {
  return (
    <div
      class="group relative bg-dark-800/40 backdrop-blur-sm border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/5"
      style={{ animation: `fadeInUp 0.6s ${index * 0.15}s both` }}
    >
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
      <div class={`h-36 rounded-xl mb-5 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
      <h3 class="text-xl font-bold mb-2 relative">{project.title}</h3>
      <p class="text-gray-400 text-sm mb-4 leading-relaxed relative">{project.description}</p>
      <div class="flex flex-wrap gap-2 mb-4 relative">
        {project.tags.map((t) => (
          <span class="text-xs px-3 py-1 rounded-full bg-purple-900/20 text-purple-300 border border-purple-800/30">{t}</span>
        ))}
      </div>
      {project.links?.map((l) => (
        <a href={l.url} target="_blank" class="relative text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">
          {l.label}
        </a>
      ))}
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" class="py-32 px-4 relative">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-20" style={{ animation: 'fadeInUp 0.6s both' }}>
          <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">Portfolio</p>
          <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Projects
          </h2>
          <p class="text-gray-500 mt-4 max-w-md mx-auto">Things I've built that I'm proud of.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
