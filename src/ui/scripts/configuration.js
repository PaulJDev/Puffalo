setConfigurationData()
setOnConfigSaveEvent()

async function setConfigurationData() {
  const config = await window.api.getConfig()

  if (!config) return

  document.getElementById('time').value = +config.time
  document.getElementById(config.timeUnitOption).checked = true
}

function setOnConfigSaveEvent() {
  const form = document.querySelector('#configuration form')

  form.addEventListener('submit', event => {
    event.preventDefault()

    const data = new FormData(form)
    const config = Object.fromEntries(data.entries())

    const configIsValid = Object.values(config).every(value => value)

    configIsValid && window.api.setConfig(config)
  })
}
