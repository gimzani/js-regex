'use strict'
//-------------------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');
//-------------------------------------------------------------------------------------------
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
//-------------------------------------------------------------------------------------------
const isDevelopment = process.env.NODE_ENV !== 'production'
let win
//-------------------------------------------------------------------------------------------
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])
//-------------------------------------------------------------------------------------------
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1500, height: 800, webPreferences: {
    nodeIntegration: true
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.removeMenu()

  win.on('closed', () => {
    win = null
  })
}
//-----------------------------------------------------------------
//---------------------------------------------------------  MAC OS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
//-------------------------------------------------------------------------------------------
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
//-------------------------------------------------------------------------------------------
// --------------------------------------------------
ipcMain.on('load-expressions', function(event) {
  let filePath = path.join(__static, "data", "expressions.json");
  fs.readFile(filePath, function(err, data){
    if(err){
      return console.log(err);
    }
    let json = JSON.parse(data);
    event.sender.send('expressions-loaded', json);
  })
});
// --------------------------------------------------
ipcMain.on('save-expressions', function(event, expressions) {
  let filePath = path.join(__static, "data", "expressions.json");
  let content = JSON.stringify(expressions);
  fs.writeFile(filePath, content, function(err){
    if(err){
      return console.log(err);
    }
    event.sender.send('expressions-saved');
  })
});
//-------------------------------------------------------------------------------------------