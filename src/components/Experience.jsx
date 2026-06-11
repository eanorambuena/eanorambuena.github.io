import ScrollReveal from './ScrollReveal.jsx'

const experiences = [
  {
    company: 'NeuralWorks SpA',
    role: 'Fullstack Software Engineer Intern',
    date: '2024 - 2025',
    description: 'Owned the frontend migration from React Native Paper to Tamagui. Reduced AI tooling costs from $200 to $0 per user monthly.',
    tags: ['React Native', 'TypeScript', 'Tamagui', 'AI'],
  },
  {
    company: 'Acofuz',
    role: 'Software Engineer (Front-End)',
    date: '2024',
    description: 'Built GIS visualization app from scratch for a global mining company. Architected frontend with React, TypeScript, and Vite.',
    tags: ['React', 'TypeScript', 'GIS', 'Vite'],
  },
  {
    company: 'IDS UC',
    role: 'Application Architect',
    date: '2023 - 2024',
    description: 'Architected peer evaluation platform for 1,500+ concurrent students using Next.js and React. Cut manual grading time by 60% across 3+ university deployments.',
    tags: ['Next.js', 'React', 'PostgreSQL', 'AWS'],
  },
]

function TimelineItem({ exp, index }) {
  return (
    <ScrollReveal delay={index * 120}>
      <div class="relative pl-12 pb-16 last:pb-0">
        <div class="absolute left-[11px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-dark-950 z-10" />
        <div class="bg-dark-800/30 backdrop-blur-sm border border-gray-800/60 hover:border-purple-500/20 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-lg">{exp.company}</h3>
            <span class="text-xs text-gray-400 font-mono">{exp.date}</span>
          </div>
          <p class="text-purple-400 text-sm mb-3 font-medium">{exp.role}</p>
          <p class="text-gray-300 text-sm leading-relaxed mb-3">{exp.description}</p>
          <div class="flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span class="text-xs px-3 py-1 rounded-full bg-dark-900/50 text-gray-300 border border-gray-700/50">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Experience() {
  return (
    <section id="experience" class="py-32 px-4 relative">
      <div class="max-w-2xl mx-auto">
        <ScrollReveal>
          <div class="text-center mb-20">
            <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">Career</p>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <p class="text-gray-400 mt-4 max-w-md mx-auto">Startup experience building products that scale.</p>
          </div>
        </ScrollReveal>
        <div class="relative">
          <div class="absolute left-[23px] top-2 bottom-4 w-px bg-gradient-to-b from-purple-500 via-purple-500/50 to-transparent" />
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
