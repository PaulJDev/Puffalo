function progressControl() {
  const progress = document.querySelector('progress')
  let interval

  return {
    start: async () => {
      const { seconds } = await window.api.getConfig()

      let elapsed = 0
      window.api.start()

      interval = setInterval(() => {
        elapsed++

        const percentage = (elapsed / seconds) * 100

        progress.value = percentage

        if (elapsed >= seconds) {
          progress.value = 100
          elapsed = 0
        }
      }, 1000)
    },
    pause: () => {
      clearInterval(interval)
      progress.value = 0
      window.api.pause()
    }
  }
}

const actions = document.querySelectorAll('#controls [name="action"]')
const progress = progressControl()

const { action } = await window.api.getConfig()

action && progress[action]()

actions.forEach(action => {
  action.addEventListener('change', async () => progress[action.id]())
})

progress.start()
