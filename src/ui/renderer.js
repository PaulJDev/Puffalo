const closeElements = document.querySelectorAll('[data-action="close"]')
const minimizeElements = document.querySelectorAll('[data-action="minimize"]')

closeElements.forEach(element => element.addEventListener('click', () => window.api.close()))
minimizeElements.forEach(element => element.addEventListener('click', () => window.api.minimize()))
