export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section class="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
      <div class="space-y-6 max-w-3xl">
        <h1 class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-blue-500 bg-clip-text text-transparent">
          Emmanuel Norambuena
        </h1>
        <p class="text-2xl md:text-3xl text-gray-300 font-light">
          Fullstack Product Engineer
        </p>
        <p class="text-lg text-gray-500 max-w-xl mx-auto">
          Building products with React, TypeScript & Node.js.
          Passionate about great UX, clean code, and AI-first development.
        </p>
        <div class="flex gap-4 justify-center pt-4">
          <button onClick={() => scrollTo('projects')} class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium transition-all hover:scale-105">
            View Projects
          </button>
          <a href="mailto:eanorambuena@uc.cl" class="px-8 py-3 border border-gray-600 hover:border-purple-500 rounded-full font-medium transition-all hover:scale-105">
            Contact
          </a>
        </div>
        <div class="flex gap-6 justify-center pt-6 text-gray-400">
          <a href="https://linkedin.com/in/eanorambuena" target="_blank" class="hover:text-purple-400 transition-colors text-lg" aria-label="LinkedIn">in</a>
          <a href="https://github.com/eanorambuena" target="_blank" class="hover:text-purple-400 transition-colors text-lg" aria-label="GitHub">GH</a>
          <a href="https://x.com/eanorambuena" target="_blank" class="hover:text-purple-400 transition-colors text-lg" aria-label="X / Twitter">𝕏</a>
        </div>
      </div>
    </section>
  )
}
