const experiences = [
  {
    company: 'NeuralWorks SpA',
    role: 'Fullstack Software Engineer Intern',
    date: '2024 - 2025',
    description: 'Led frontend migration from React Native Paper to Tamagui. Reduced AI tooling costs from $200 to $0 per user monthly. Built cross-platform mobile experience.',
    tags: ['React Native', 'TypeScript', 'Tamagui', 'AI'],
  },
  {
    company: 'Acofuz',
    role: 'Software Engineer (Front-End)',
    date: '2024',
    description: 'Built GIS visualization app from scratch for a global mining company. Architected frontend with React, TypeScript, and Vite. Integrated geospatial data layers and interactive maps.',
    tags: ['React', 'TypeScript', 'GIS', 'Vite'],
  },
  {
    company: 'IDS UC',
    role: 'Application Architect',
    date: '2023 - 2024',
    description: 'Developed and maintained peer evaluation platform for 1,500+ concurrent students using Next.js and React. Implemented real-time dashboards and automated workflows reducing manual grading time by 60%.',
    tags: ['Next.js', 'React', 'PostgreSQL', 'AWS'],
  },
]

export default function Experience() {
  return (
    <section id="experience" class="py-24 px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        Experience
      </h2>
      <div class="max-w-2xl mx-auto relative">
        <div class="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-blue-500" />
        {experiences.map((exp, i) => (
          <div class="relative pl-12 pb-12 last:pb-0">
            <div class="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-dark-950" />
            <div class="bg-dark-800/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-lg">{exp.company}</h3>
                <span class="text-xs text-gray-500">{exp.date}</span>
              </div>
              <p class="text-purple-400 text-sm mb-3">{exp.role}</p>
              <p class="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
              <div class="flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <span class="text-xs px-2 py-1 rounded-full bg-dark-900 text-gray-400 border border-gray-700">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
