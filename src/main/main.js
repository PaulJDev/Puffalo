import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import 'dotenv/config'

import path from 'path'
import { fileURLToPath } from 'url'

import { MoveMouse } from './lib/moveMouse.js'
import config from './lib/store.js'
import { APP_TILE, APP_ICO_FOLDER, APP_ICO } from './constants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    resizable: false,
    icon: APP_ICO,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile(path.join(__dirname, '../ui/index.html'))

  mainWindow.on('minimize', event => {
    mainWindow.hide()
  })

  mainWindow.once('ready-to-show', () => {
    const isDev = process.env.NODE_ENV === 'development'
    if (!isDev) {
      mainWindow.hide()
      return
    }

    mainWindow.webContents.openDevTools()
    mainWindow.show()
  })

  const tray = new Tray(APP_ICO)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ])

  tray.setToolTip('Puffalo')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => mainWindow.show())

  ipcMain.on('close', () => mainWindow.close())
  ipcMain.on('minimize', () => mainWindow.hide())
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('get-config', () => config.get())

const { seconds, pixels } = config.get()
const moveMouse = new MoveMouse({ seconds, pixels })

ipcMain.on('start', () => {
  const pixels = config.get('pixels')
  const seconds = config.get('seconds')

  if (!pixels || !seconds) return

  moveMouse.setPixels(pixels)
  moveMouse.setSeconds(seconds)

  moveMouse.start()
})

ipcMain.on('pause', () => moveMouse.stop())

ipcMain.handle('set-config', (_, configuration) => {
  const { time, timeUnitOption, pixels } = configuration

  config.set('timeUnitOption', timeUnitOption)
  config.set('pixels', pixels)
  config.set('time', time)

  return config.get()
})
