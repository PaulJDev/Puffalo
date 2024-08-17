const tabs = document.querySelectorAll('menu[role="tablist"] button')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'))
    tab.setAttribute('aria-selected', 'true')

    const panels = document.querySelectorAll('article[role="tabpanel"]')
    panels.forEach(panel => panel.setAttribute('hidden', 'true'))

    const panel = document.getElementById(tab.getAttribute('aria-controls'))
    panel.removeAttribute('hidden')
  })
})
