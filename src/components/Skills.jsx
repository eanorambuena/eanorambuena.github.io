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
    <section id="skills" class="py-24 px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        Skills
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {skillCategories.map((cat) => (
          <div class="bg-dark-800/50 backdrop-blur-sm border border-gray-800 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
            <h3 class="font-bold text-purple-400 mb-4 text-sm uppercase tracking-wider">{cat.title}</h3>
            <div class="flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span class="text-sm px-3 py-1.5 rounded-lg bg-dark-900 text-gray-300 border border-gray-700 hover:border-purple-500/50 transition-colors">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
