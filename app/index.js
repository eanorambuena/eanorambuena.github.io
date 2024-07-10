import { load, html } from "emmy-dom"
import "./components/counter.js"

export function app({ el }) {
  el.className = 'flex flex-col justify-center items-center space-y-3 text-center w-full h-full text-white'

  return html`
    <h1 class="text-3xl font-bold">Emmanuel Norambuena</h1>
    <p class="text-xl">
      Software Engineer with a passion for web development, sustainability, and open-source.
      </code> and save to reload.
    </p>
    <h2 class="text-2xl font-bold">Projects</h2>
    <section class="grid grid-cols-1 gap-3">
      <a href="https://emmyjs.pages.dev/" class="card flex flex-col items-center justify-center rounded-md bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
        Emmy.js
      </a>
      <a href="https://idsapp.pages.dev/" class="card flex flex-col items-center justify-center rounded-md bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
        IdsApp
      </a>
    </section>
  `
}

export const App = load(app, 'App')
