export default function About() {
  return (
    <section id="about" class="py-32 px-4 relative">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">About</p>
          <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Builder based in Chile
          </h2>
        </div>
        <div class="space-y-5 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          <p>
            I'm a product engineer who ships fast and thinks in systems.
            I've built platforms serving <span class="text-gray-200">1,500+ concurrent users</span>,
            reduced AI infrastructure costs from <span class="text-gray-200">$200/user to $0</span>,
            and contributed open source tools with <span class="text-gray-200">1,000+ weekly npm downloads</span>.
          </p>
          <p>
            At <span class="text-gray-200">Pontificia Universidad Católica de Chile</span>,
            I architected a peer evaluation platform that cut grading time by 60%.
            At <span class="text-gray-200">NeuralWorks</span>, I led a frontend migration that
            eliminated $200/month per user in AI tooling costs.
          </p>
          <p>
            I know the Chilean startup ecosystem — from <span class="text-gray-200">Platanus</span>
            to <span class="text-gray-200">Startup Chile</span> — and I'm looking for product engineering
            roles where I can own features end-to-end and build things that matter.
          </p>
        </div>
      </div>
    </section>
  )
}
