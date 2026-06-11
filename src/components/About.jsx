import ScrollReveal from './ScrollReveal.jsx'

export default function About() {
  return (
    <section id="about" class="py-28 px-4 relative bg-dark-950/60">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div class="max-w-3xl mx-auto">
        <ScrollReveal>
          <div class="text-center mb-12">
            <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">About</p>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Builder based in Chile
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div class="bg-dark-800/30 backdrop-blur-sm border border-gray-800/60 rounded-2xl p-8 md:p-10 space-y-5 text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            <p>
              I'm a product engineer who ships fast and thinks in systems.
              I've built platforms serving <span class="text-white">1,500+ concurrent users</span>,
              reduced AI infrastructure costs from <span class="text-white">$200/user to $0</span>,
              and contributed open source tools with <span class="text-white">1,000+ weekly npm downloads</span>.
            </p>
            <p>
              At <span class="text-white">Pontificia Universidad Católica de Chile</span>,
              I architected a peer evaluation platform that cut grading time by 60%.
              At <span class="text-white">NeuralWorks</span>, I led a frontend migration that
              eliminated $200/month per user in AI tooling costs.
            </p>
            <p>
              I know the Chilean startup ecosystem — from <span class="text-white">Platanus</span>
              to <span class="text-white">Startup Chile</span> — and I'm looking for a founding team
              where I can own products, not just features. I ship fast, think in systems, and I'm building
              toward the next great LatAm tech company.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
