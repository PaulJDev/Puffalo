const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  setConfig: config => ipcRenderer.invoke('set-config', config),
  close: () => ipcRenderer.send('close'),
  minimize: () => ipcRenderer.send('minimize'),
  pause: () => ipcRenderer.send('pause'),
  start: () => ipcRenderer.send('start')
})
