import { load, html } from 'emmy-dom/dist/server.js'

export function app({ el }) {
  el.className = 'flex flex-col justify-center items-center text-center w-full h-full text-white gap-6 px-6 py-10'

  return html`
    <header class='flex flex-row justify-center items-center selection:text-center w-full h-full text-white gap-6 p-6'>
      <div class='flex flex-col justify-left items-center text-center gap-2'>
        <h1 class='text-6xl font-bold'>Emmanuel Norambuena</h1>
        <p class='text-4xl'>Fullstack Developer</p>
      </div>
      <img class='w-40 h-40 rounded-full' src='https://emmyjs.pages.dev/eanorambuena.webp' alt='Emmanuel Norambuena' />
    </header>
    <main class='flex flex-col justify-center items-center text-center w-full h-full text-white gap-6 p-6'>
      <h2 class='text-3xl font-bold text-purple-500'>Projects</h2>
      <section class='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
        <Card title='Emmy.js' description='A lightweight library for building web components' image='https://i.imgur.com/1zO7Z8b.png' />
        <Card title='IdsApp' description='A mobile app for managing your tasks' image='https://i.imgur.com/1zO7Z8b.png' />
      </section>
    </main>
  `
}

export const App = load(app, 'App')
