import { load, html } from 'emmy-dom/dist/server.js'

export function app({ el }) {
  el.className = 'flex flex-col justify-center items-center text-center w-full h-full text-white gap-6 px-6 py-10'

  return html`
    <header class='flex flex-col justify-center items-center selection:text-center w-full h-full text-white gap-6 p-6'>
      <h1 class='text-8xl font-bold'>Emmanuel Norambuena</h1>
      <p class='text-2xl'>Fullstack Developer</p>
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
