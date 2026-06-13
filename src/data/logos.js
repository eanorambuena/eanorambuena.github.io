const osucSvgDark = `<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
  <path d="M449.318 284.209C449.318 375.396 375.396 449.318 284.209 449.318L284.209 284.209L449.318 284.209Z" fill="white"/>
  <path d="M449.318 50.6824V215.791C358.131 215.791 284.209 141.869 284.209 50.6824L449.318 50.6824Z" fill="white"/>
  <path d="M215.791 50.6824L215.791 215.791L50.6824 215.791C50.6824 124.604 124.604 50.6824 215.791 50.6824Z" fill="white"/>
  <path d="M50.6824 284.209C141.869 284.209 215.791 358.131 215.791 449.318H50.6824L50.6824 284.209Z" fill="white"/>
  <path d="M274.211 225.831V274.169H225.79V225.831H274.211Z" fill="white"/>
  <path d="M191.657 284.21C205.005 284.21 215.868 295.03 215.868 308.379C215.868 321.727 205.005 332.547 191.657 332.547C178.309 332.547 167.447 321.727 167.447 308.379C167.447 295.03 178.309 284.21 191.657 284.21Z" fill="white"/>
  <path d="M308.419 167.446C321.768 167.446 332.63 178.267 332.63 191.615C332.63 204.963 321.768 215.784 308.419 215.784C295.071 215.784 284.209 204.963 284.209 191.615C284.209 178.267 295.071 167.446 308.419 167.446Z" fill="white"/>
</svg>`

const osucSvgLight = `<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
  <path d="M449.318 284.209C449.318 375.396 375.396 449.318 284.209 449.318L284.209 284.209L449.318 284.209Z" fill="#18181b"/>
  <path d="M449.318 50.6824V215.791C358.131 215.791 284.209 141.869 284.209 50.6824L449.318 50.6824Z" fill="#18181b"/>
  <path d="M215.791 50.6824L215.791 215.791L50.6824 215.791C50.6824 124.604 124.604 50.6824 215.791 50.6824Z" fill="#18181b"/>
  <path d="M50.6824 284.209C141.869 284.209 215.791 358.131 215.791 449.318H50.6824L50.6824 284.209Z" fill="#18181b"/>
  <path d="M274.211 225.831V274.169H225.79V225.831H274.211Z" fill="#18181b"/>
  <path d="M191.657 284.21C205.005 284.21 215.868 295.03 215.868 308.379C215.868 321.727 205.005 332.547 191.657 332.547C178.309 332.547 167.447 321.727 167.447 308.379C167.447 295.03 178.309 284.21 191.657 284.21Z" fill="#18181b"/>
  <path d="M308.419 167.446C321.768 167.446 332.63 178.267 332.63 191.615C332.63 204.963 321.768 215.784 308.419 215.784C295.071 215.784 284.209 204.963 284.209 191.615C284.209 178.267 295.071 167.446 308.419 167.446Z" fill="#18181b"/>
</svg>`

export const logos = {
  'Antofagasta Minerals': {
    dark: 'https://expandemineria.cl/wp-content/uploads/2024/05/AMSA-Logo-300x94.png',
    light: 'https://www.aminerals.cl/images/default-source/logos-amsa/logo-amsa.svg',
  },
  Procel: {
    dark: 'https://www.procelservicios.cl/img/logo.png',
    light: 'https://www.procelservicios.cl/img/logo.png',
  },
  Acofuz: {
    dark: '/acofuz-logo.png',
    light: '/acofuz-light.png',
    imgClass: 'max-h-[110%] max-w-[110%]',
    darkImgClass: 'max-h-[70%] max-w-[70%]',
    lightImgClass: 'max-h-[150%] max-w-[150%]',
  },
  NeuralWorks: {
    dark: '/nw-logo.svg',
    light: '/nw-logo.svg',
    filterDark: 'brightness(0) invert(1)',
    filterLight: 'brightness(0)',
    imgClass: 'max-h-[90%] max-w-[90%]',
  },
  'Universidad Católica': {
    dark: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Marca-uc.svg',
    light: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Marca-uc.svg',
  },
  OSUC: {
    inline: true,
    inlineClass: 'p-12',
    dark: osucSvgDark,
    light: osucSvgLight,
  },
  Esert: {
    dark: '/esert-logo.png',
    light: '/esert-logo.png',
  },
  'EME SG': {
    dark: '/emesg-logo.png',
    light: '/emesg-logo.png',
  },
  'Aguas Andinas': {
    dark: 'https://www.aguasandinas.cl/o/aguas-home-theme/images/logo-aguasandinas.png',
    light: '/aguas-light.png',
    imgClass: 'max-h-[90%] max-w-[90%]',
    lightImgClass: 'max-h-[150%] max-w-[150%]',
  },
}
