import ScrollReveal from './ScrollReveal.jsx'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Vue', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Mobile',
    skills: ['React Native', 'Tamagui', 'Expo'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Serverless'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['AWS', 'Docker', 'Git', 'CI/CD', 'Linux'],
  },
]

export default function Skills() {
  return (
    <section id="skills" class="py-28 px-4 relative">
      <div class="max-w-4xl mx-auto">
        <ScrollReveal>
          <div class="text-center mb-16">
            <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">Toolbox</p>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Skills
            </h2>
          </div>
        </ScrollReveal>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 80}>
              <div class="bg-dark-800/50 backdrop-blur-sm border border-gray-800 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                <h3 class="font-bold text-purple-400 mb-3 text-sm uppercase tracking-wider">{cat.title}</h3>
                <div class="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span class="text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg bg-dark-900 text-gray-300 border border-gray-700 hover:border-purple-500/50 transition-colors">{s}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
