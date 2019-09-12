const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Menu = require('electron').Menu

// global
let win

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow () {
  win = new BrowserWindow({
    title: 'Icon Generator',
    width: 600, 
    height: 500,
    resizable: false,
    icon: __dirname + '/Icon/Icon.icns',
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })

  createMenu()

  win.openDevTools()
}

app.on('ready', createWindow)

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

function createMenu() {
  const application = {
    label: "Icon Generator",
    submenu: [
      {
        label: "New",
        accelerator: "Command+N",
        click: () => {
          if (win === null) {
            createWindow()
          }
        }
      }
    ]
  }

  const template = [
    application
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}