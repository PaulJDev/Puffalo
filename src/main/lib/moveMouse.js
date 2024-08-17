import robotjs from '@jitsi/robotjs'

function moveMouse(pixels) {
  const mouse = robotjs.getMousePos()

  const lastXPosition = mouse.x

  const x = mouse.x + pixels
  const y = mouse.y
  robotjs.moveMouse(x, y)
  robotjs.moveMouse(lastXPosition, y)
}

export class MoveMouse {
  #id = null
  #pixels = 0.1
  #millis = 0
  static #instance = null

  constructor({ seconds, pixels }) {
    this.#millis = seconds * 1000
    this.#pixels = pixels
  }

  start() {
    this.#id = setInterval(() => moveMouse(this.#pixels), this.#millis)
  }

  stop() {
    clearInterval(this.#id)
  }

  setPixels(pixels) {
    this.#pixels = pixels
  }

  setSeconds(seconds) {
    this.#millis = seconds * 1000
  }
}
