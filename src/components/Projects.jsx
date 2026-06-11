const projects = [
  {
    title: 'Emmy.js',
    description: 'A lightweight library for building web components using functional programming patterns.',
    tags: ['TypeScript', 'Web Components', 'Open Source'],
    links: [{ label: 'GitHub', url: 'https://github.com/emmyjs/emmy-dom' }],
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Kalmate',
    description: 'Bloomberg-style financial terminal using Yahoo Finance API, Nuxt 3, and TradingView lightweight charts.',
    tags: ['Nuxt 3', 'Vue', 'TypeScript', 'Yahoo Finance'],
    links: [{ label: 'Live Demo', url: 'https://kalmate.app' }],
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

export default function Projects() {
  return (
    <section id="projects" class="py-24 px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        Projects
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {projects.map((p) => (
          <div class="group relative bg-dark-800/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
            <div class={`h-32 rounded-lg mb-4 bg-gradient-to-br ${p.gradient} opacity-80`} />
            <h3 class="text-xl font-bold mb-2">{p.title}</h3>
            <p class="text-gray-400 text-sm mb-4 leading-relaxed">{p.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              {p.tags.map((t) => (
                <span class="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-800/50">{t}</span>
              ))}
            </div>
            {p.links?.map((l) => (
              <a href={l.url} target="_blank" class="text-sm text-purple-400 hover:text-purple-300 transition-colors">{l.label} →</a>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
