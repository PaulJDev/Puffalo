import Store from 'electron-store'

import { toSeconds } from './toSeconds.js'

const schema = {
  config: {
    type: 'object',
    properties: {
      pixels: {
        type: 'number',
        default: 1
      },
      time: {
        type: 'number',
        default: 5
      },
      timeUnitOption: {
        type: 'string',
        default: 'minutes'
      },
      seconds: {
        type: 'number',
        default: 300
      }
    }
  }
}

const config = new Store({ schema })
const CONFIG_KEY = 'config'

const toNumber = value => Number(value)
const set = (key, value) => value && config.set(`${CONFIG_KEY}.${key}`, value)

export default {
  get(key) {
    if (key) {
      return config.get(`${CONFIG_KEY}.${key}`)
    }

    const configuration = config.get(CONFIG_KEY)
    if (configuration) {
      return configuration
    }

    return {
      pixels: 1,
      time: 5,
      timeUnitOption: 'minutes',
      seconds: 300
    }
  },
  set: (key, value) => {
    const keysActions = {
      pixels: value => set('pixels', toNumber(value)),
      seconds: value => set('seconds', toNumber(value)),
      timeUnitOption: value => set('timeUnitOption', value),
      time: value => {
        const time = toNumber(value)
        const seconds = toSeconds(time, config.get(`${CONFIG_KEY}.timeUnitOption`))

        return {
          time: set('time', time),
          seconds: set('seconds', seconds)
        }
      }
    }

    return keysActions[key](value)
  }
}
