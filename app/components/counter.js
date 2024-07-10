import { load, html } from "emmy-dom";

export function counter ({ el }) {
  el.className = 'flex flex-col justify-center items-center space-y-3';
  const [counter, setCounter] = el.useState(0);

  el.useEffect(() => {
    console.log('Counter value changed to', counter());
  }, [counter]);

  el.useEffect(() => {
    el.querySelector('#plusButton').addEventListener('click', () => setCounter(counter() + 1));
    el.querySelector('#minusButton').addEventListener('click', () => setCounter(counter() - 1));
  }, ['didMount']);

  return () => html`
    <h2 class='text-2xl font-bold'>Counter</h2>
    <p id="counter">${ counter() }</p>
    <div class='flex flex-row justify-center items-center space-x-2'>
      <button id='plusButton' class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
        +
      </button>
      <button id='minusButton' class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
        -
      </button>
    </div>
  `;
}

load(counter, 'Counter');
