export function card({ el, props }) {
  el.className = 'flex flex-col justify-center items-center text-center w-full h-full text-white border-2 border-white rounded-lg p-5 gap-6 p-6'
  const { title, description, image } = props()
  
  return html`
    <h3 class='text-2xl font-bold'>${title()}</h3>
    <p>${description()}</p>
    <img src='${image()}' alt='${title()}' class='w-64 h-64 object-cover rounded-lg' />
  `
}
